import prisma from "@/server/prisma"
import { ProjectTaskSummaryDto } from "@/common/types"
import { UserResponseStatus } from "@prisma/client"

export async function getUserTasks(userId: string): Promise<ProjectTaskSummaryDto[]> {
    const items = await prisma.userResponse.findMany({
        where: {
            userId,
        },
        include: {
            task: {
                include: {
                    project: true,
                },
            },
        },
    })

    return items.map(item => ({
        id: item.task.id,
        title: item.task.title,
        projectId: item.task.projectId,
        projectTitle: item.task.project.title,
        status: item.task.status,
        dateStart: item.task.startAt.toString(),
        dateEnd: item.task.endAt.toString(),
        userRole: item.status === UserResponseStatus.Leader
            ? "leader"
            : "participant",
    }))
}
