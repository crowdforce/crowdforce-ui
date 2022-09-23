import { ProjectDto } from "@/common/types"
import prisma from "@/server/prisma"
import { Asset, Project } from "@prisma/client"

type Item = Project & { cover: Asset | null }

function mapResponse(item: Item): any {
    let imageUrl = item.imageUrl
    if (item.cover) {
        imageUrl = item.cover.src
    }

    return {
        id: item.id,
        title: item.title,
        description: item.description,
        imageUrl,
    }
}

export async function getOwnProjects(userId: string): Promise<ProjectDto[]> {
    const owned = await prisma.project.findMany({
        where: {
            ownerId: userId,
        },
        include: {
            cover: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    })

    return owned.map(x => ({
        ...mapResponse(x),
        isFollowed: null,
        followers: 0,
    }))
}

export async function getFollowingProjects(userId: string): Promise<ProjectDto[]> {
    const projectFollows = await prisma.userFollows.findMany({
        where: {
            userId,
            active: true,
        },
        include: {
            project: {
                include: {
                    cover: true,
                },
            },
        },
    })
    const following = projectFollows.map(x => x.project)

    return following.map(x => ({
        ...mapResponse(x),
        isFollowed: true,
        followers: 0,
    }))
}
