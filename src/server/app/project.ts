import prisma from "@/server/prisma"
import { ProjectStatus } from "@prisma/client"

export async function switchProjectToActiveStatus(projectId: string): Promise<void> {
    const item = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            status: true,
            title: true,
            description: true,
        },
    })

    // Do nothing if project is not found
    if (!item) {
        return
    }

    // Do nothing if project already in Active status
    if (item.status === ProjectStatus.Active) {
        return
    }

    // Do not switch state if title or description is not set
    if (!item.title || !item.description) {
        return
    }

    const features = await prisma.feature.count({
        where: {
            projectId,
        },
    })

    // Do not switch state if no features added to project yet
    if (features === 0) {
        return
    }

    await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            status: ProjectStatus.Active,
            updatedAt: new Date(),
        },
    })
}

export async function isProjectInStatus(projectId: string, statuses: Set<ProjectStatus>): Promise<boolean> {
    const x = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        select: {
            status: true,
        },
    })
    if (!x) {
        return false
    }
    return statuses.has(x.status)
}
