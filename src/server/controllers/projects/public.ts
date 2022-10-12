import prisma from "@/server/prisma"
import { PublicProjectDto } from "@/common/types"
import { Asset, MapViewport, Project, ProjectStatus } from "@prisma/client"

type ProjectWithOthers = Project & {
    viewport: MapViewport
    cover: Asset | null
}

function mapResponse(item: ProjectWithOthers): PublicProjectDto {
    let imageUrl = item.imageUrl
    if (item.cover) {
        imageUrl = item.cover.src
    }

    return {
        id: item.id,
        title: item.title,
        description: item.description,
        imageUrl,
        lng: item.viewport.lng,
        lat: item.viewport.lat,
    }
}

export async function getPublicProjects() {
    const projects = await prisma.project.findMany({
        where: {
            status: ProjectStatus.Active,
        },
        include: {
            viewport: true,
            cover: true,
        },
    })
    if (!projects) {
        return []
    }

    return projects
        .map(mapResponse)
}

export async function getTopProjects() {
    const projects = await prisma.topProjects.findMany({
        where: {
            project: {
                status: ProjectStatus.Active,
            },
        },
        include: {
            project: {
                include: {
                    viewport: true,
                    cover: true,
                },
            },
        },
    })
    if (!projects) {
        return []
    }

    return projects
        .map(x => x.project)
        .map(mapResponse)
}
