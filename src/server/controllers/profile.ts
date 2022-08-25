import { ProjectDto } from "@/common/types"
import prisma from "@/server/prisma"

export type ProfileResponseDto = {
    owned: ProjectDto[]
    following: ProjectDto[]
}

export async function getProjects(userId: string): Promise<ProfileResponseDto>  {
    const owned = await prisma.project.findMany({
        where: {
            ownerId: userId,
        },
        orderBy: {
            updatedAt: 'desc',
        }
    })

    const projectFollows = await prisma.userFollows.findMany({
        where: {
            userId,
            active: true
        },
        include: {
            project: true,
        },
    })
    const following = projectFollows.map(x => x.project)

    return {
        owned: owned.map(x => ({
            id: x.id,
            title: x.title,
            description: x.description,
            imageUrl: x.imageUrl,
            isFollowed: null,
        })),
        following: following.map(x => ({
            id: x.id,
            title: x.title,
            description: x.description,
            imageUrl: x.imageUrl,
            isFollowed: true,
        }))
    }
}