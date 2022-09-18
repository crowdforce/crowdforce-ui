import prisma from "@/server/prisma"
import { withUser } from "@/server/middlewares/withUser"
import { Feature, TaskStatus } from "@prisma/client"
import type { NewFeatureDto } from "@/common/types"
import { ErrorDto, ProjectTaskDto } from "@/common/types"
import { NextApiRequest, NextApiResponse } from "next"

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

const dataPlaceholder: ProjectTaskDto[] = [
    {
        id: "one",
        title: "Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки",
        description: "Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.",
        dateStart: "2022-09-08T21:00:00.000Z",
        timeStart: "Thu Sep 15 2022 10:00:00 GMT+0300 (Москва, стандартное время)",
        dateEnd: "2022-09-09T21:00:00.000Z",
        timeEnd: "Thu Sep 15 2022 13:00:00 GMT+0300 (Москва, стандартное время)",
        followers: [
            {
                name: "Арагорн, сын Агронома",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-1",
            },
            {
                name: "Фродо Беггинс",
                image: "/ms-icon-150x150.png",
                status: "leader",
                id: "follower-id-2",
            },
            {
                name: "Шмыга",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-3",
            },
            {
                name: "Пендальф Серый",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-4",
            },
        ],
    },
    {
        id: "two",
        title: "Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки",
        description: "Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.",
        dateStart: "2022-09-08T21:00:00.000Z",
        timeStart: "Thu Sep 15 2022 10:00:00 GMT+0300 (Москва, стандартное время)",
        dateEnd: "2022-09-09T21:00:00.000Z",
        timeEnd: "Thu Sep 15 2022 13:00:00 GMT+0300 (Москва, стандартное время)",
        followers: [
            {
                name: "Арагорн, сын Агронома",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-1",
            },
            {
                name: "Фродо Беггинс",
                image: "/ms-icon-150x150.png",
                status: "leader",
                id: "follower-id-2",
            },
            {
                name: "Шмыга",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-3",
            },
            {
                name: "Пендальф Серый",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-4",
            },
        ],
    },
    {
        id: "tree",
        title: "Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки",
        description: "Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.",
        dateStart: "2022-09-08T21:00:00.000Z",
        timeStart: "Thu Sep 15 2022 10:00:00 GMT+0300 (Москва, стандартное время)",
        dateEnd: "2022-09-08T21:00:00.000Z",
        timeEnd: "Thu Sep 15 2022 13:00:00 GMT+0300 (Москва, стандартное время)",
        followers: [
            {
                name: "Арагорн, сын Агронома",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-1",
            },
            {
                name: "Фродо Беггинс",
                image: "/ms-icon-150x150.png",
                status: "leader",
                id: "follower-id-2",
            },
            {
                name: "Шмыга",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-3",
            },
            {
                name: "Пендальф Серый",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-4",
            },
        ],
    },
    {
        id: "four",
        title: "Вскопать грядки для редиса длииинная надпись для переноса можно это сделать в 2 строки",
        description: "Высокий уровень вовлечения представителей целевой аудитории является четким доказательством простого факта: выбранный нами инновационный путь способствует подготовке и реализации приоретизации разума над эмоциями. А также сторонники тоталитаризма в науке ограничены исключительно образом мышления.",
        dateStart: "2022-09-08T21:00:00.000Z",
        timeStart: "Thu Sep 15 2022 10:00:00 GMT+0300 (Москва, стандартное время)",
        dateEnd: "2022-09-08T21:00:00.000Z",
        timeEnd: "Thu Sep 15 2022 13:00:00 GMT+0300 (Москва, стандартное время)",
        followers: [
            {
                name: "Арагорн, сын Агронома",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-1",
            },
            {
                name: "Фродо Беггинс",
                image: "/ms-icon-150x150.png",
                status: "leader",
                id: "follower-id-2",
            },
            {
                name: "Шмыга",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-3",
            },
            {
                name: "Пендальф Серый",
                image: "/ms-icon-150x150.png",
                status: "follower",
                id: "follower-id-4",
            },
        ],
    },
]

export async function getTasks(projectId: string) {
    const tasks = await prisma.task.findMany({
        where: {
            projectId,
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
            followers: [
                // {
                //     name: "Арагорн, сын Агронома",
                //     image: "/ms-icon-150x150.png",
                //     status: "follower",
                //     id: "follower-id-1",
                // },
                // {
                //     name: "Фродо Беггинс",
                //     image: "/ms-icon-150x150.png",
                //     status: "leader",
                //     id: "follower-id-2",
                // },
                // {
                //     name: "Шмыга",
                //     image: "/ms-icon-150x150.png",
                //     status: "follower",
                //     id: "follower-id-3",
                // },
                // {
                //     name: "Пендальф Серый",
                //     image: "/ms-icon-150x150.png",
                //     status: "follower",
                //     id: "follower-id-4",
                // },
            ],
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
