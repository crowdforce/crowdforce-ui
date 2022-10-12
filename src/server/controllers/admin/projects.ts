import { AdminProjectDto } from "@/common/types"
import { isProjectInStatus } from "@/server/app/project"
import prisma from "@/server/prisma"
import { Asset, Project, ProjectStatus, User } from "@prisma/client"

type Item = Project & {
    cover: Asset | null
    owner: User
}

function mapResponse(item: Item, top: Set<string>): AdminProjectDto {
    let imageUrl = item.imageUrl
    if (item.cover) {
        imageUrl = item.cover.src
    }

    // isFollowed: null,
    // followers: 0,

    return {
        id: item.id,
        title: item.title,
        description: item.description,
        imageUrl,
        status: item.status,
        href: `/project/${item.id}`,
        isTop: top.has(item.id),
        ownerId: item.ownerId,
        ownerName: item.owner.name ?? "<unknown>",
        ownerAvatarSrc: item.owner.image!,
    }
}

export async function getAllProjects(): Promise<AdminProjectDto[]> {
    const items = await prisma.project.findMany({
        where: {},
        include: {
            cover: true,
            owner: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    })
    const topItems = await prisma.topProjects.findMany({
        where: {},
        select: {
            projectId: true,
        },
    })
    const top = new Set(topItems.map(x => x.projectId))

    return items.map(x => mapResponse(x, top))
}

export async function addToTop(projectId: string): Promise<boolean> {
    const canAdd = await isProjectInStatus(projectId, new Set([ProjectStatus.Active]))
    if (!canAdd) {
        return false
    }

    await prisma.topProjects.upsert({
        where: {
            projectId,
        },
        create: {
            projectId,
        },
        update: {
            createdAt: new Date(),
        },
    })

    return true
}

export async function deleteFromTop(projectId: string): Promise<boolean> {
    await prisma.topProjects.delete({
        where: {
            projectId,
        },
    })

    return true
}
