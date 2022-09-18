import prisma from "@/server/prisma"
import { ErrorDto, ProjectTaskDto } from "@/common/types"
import { NextApiRequest, NextApiResponse } from "next"
import { UserResponseStatus } from "@prisma/client"

function splitDateAndTime(date: Date): [Date, Date] {
    const d = new Date()
    d.setDate(date.getDate())
    d.setMonth(date.getMonth())
    d.setFullYear(date.getFullYear())

    const t = new Date()
    t.setHours(date.getHours())
    t.setMinutes(date.getMinutes())
    t.setMilliseconds(date.getMilliseconds())

    return [d, t]
}

export async function getTasks(projectId: string): Promise<ProjectTaskDto[]> {
    const tasks = await prisma.task.findMany({
        where: {
            projectId,
        },
        include: {
            users: {
                include: {
                    user: true,
                },
            },
        },
    })

    return tasks.map(task => {
        const [dateStart, timeStart] = splitDateAndTime(task.startAt)
        const [dateEnd, timeEnd] = splitDateAndTime(task.startAt)
        return ({
            id: task.id,
            title: task.title,
            description: task.description,
            dateStart: dateStart.toDateString(),
            timeStart: timeStart.toDateString(),
            dateEnd: dateEnd.toDateString(),
            timeEnd: timeEnd.toDateString(),
            followers: task.users.map(x => ({
                id: x.user.id,
                name: x.user.name!,
                image: x.user.image!,
                status: x.status === UserResponseStatus.Leader
                    ? "leader"
                    : "participant",
            })),
        })
    })
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ProjectTaskDto[] | ErrorDto>) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const projectId = req.query.projectId as string

    const tasks = await getTasks(projectId)
    if (!tasks) {
        return res.status(404).json({
            error: "Not found",
        })
    }

    return res.json(tasks)

}

export default handler
