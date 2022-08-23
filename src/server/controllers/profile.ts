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

    return {
        owned: owned.map(x => ({
            id: x.id,
            title: x.title,
            description: x.description,
            imageUrl: x.imageUrl,
        })),
        following: [
            {
                id: '1',
                title: 'Грядочки да кочечки',
                description: 'Это такой проект в котором не только кочки но еще и грядки',
                imageUrl: '/wip.png',
            },
            {
                id: '2',
                title: 'Белые розы',
                description: 'Давайте выкрашивать розы вашей парадной в БЕЛЫЙ',
                imageUrl: '/wip.png',
            },
            {
                id: '3',
                title: 'Рыба',
                description: 'Такой рыбный проект, он просто есть для рыбы',
                imageUrl: '/wip.png',
            },
        ]
    }
}