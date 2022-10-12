import { SystemProjectDto } from "@/common/types"
import prisma from "@/server/prisma"
import { Asset, Project } from "@prisma/client"

type Item = Project & { cover: Asset | null }

function mapResponse(item: Item): SystemProjectDto {
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
    }
}

export async function getAllProjects(): Promise<SystemProjectDto[]> {
    const items = await prisma.project.findMany({
        where: {},
        include: {
            cover: true,
        },
        orderBy: {
            updatedAt: "desc",
        },
    })

    return items.map(x => mapResponse(x))
}
