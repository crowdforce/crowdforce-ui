import prisma from "@/server/prisma"
import { withUser } from "@/server/middlewares/withUser"
import { Feature, TaskStatus } from "@prisma/client"
import type { AdminNewProjectTaskDto, NewFeatureDto } from "@/common/types"

function joinDateAndTime(date: Date, time: Date): Date {
    const merged = new Date()
    merged.setDate(date.getDate())
    merged.setMonth(date.getMonth())
    merged.setFullYear(date.getFullYear())
    merged.setHours(time.getHours())
    merged.setMinutes(time.getMinutes())
    merged.setMilliseconds(time.getMilliseconds())

    return merged
}

function mapResponse<T extends { id: string } = Feature>(project: T): NewFeatureDto {
    return {
        id: project.id,
    }
}

export default withUser<any>(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(404).json({
            error: "Not found",
        })
    }
    const payload = req.body as AdminNewProjectTaskDto
    if (!payload) {
        return res.status(400).json({
            error: "Body is empty",
        })
    }

    const projectId = req.query.projectId as string
    const startAt = joinDateAndTime(new Date(payload.dateStart), new Date(payload.timeStart))
    const endAt = joinDateAndTime(new Date(payload.dateEnd), new Date(payload.timeEnd))

    const task = await prisma.task.create({
        data: {
            title: payload.title,
            description: payload.description,
            status: TaskStatus.Open,
            startAt,
            endAt,
            projectId,
        },
    })

    await prisma.featuresForTask.createMany({
        data: payload.features.map(featureId => ({
            featureId,
            taskId: task.id,
        })),
    })

    // try to turn project to active after feature creation
    // await switchProjectToActiveStatus(projectId)

    // return res.json(mapResponse(feature))
    return res.json({
        message: `create task for ${projectId}`,
        kek: {
            payload,
        },
        response: task,
    })
})
