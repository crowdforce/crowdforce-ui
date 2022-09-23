import { ProjectDto } from "@/common/types"
import prisma from "@/server/prisma"
import { Asset, Project } from "@prisma/client"

export type ProfileResponseDto = {
    owned: ProjectDto[]
    following: ProjectDto[]
}

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

export async function getProjects(userId: string): Promise<ProfileResponseDto> {
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

    return {
        owned: owned.map(x => ({
            ...mapResponse(x),
            isFollowed: null,
            followers: 0,
        })),
        following: following.map(x => ({
            ...mapResponse(x),
            isFollowed: true,
            followers: 0,
        })),
    }
}
