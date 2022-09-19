import prisma from "@/server/prisma"
import { ErrorDto, PublicProjectDto } from "@/common/types"
import { Asset, MapViewport, Project, ProjectStatus } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

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

export async function getProjects() {
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
        return null
    }

    return projects.map(mapResponse)
}

const handler = async (req: NextApiRequest, res: NextApiResponse<PublicProjectDto[] | ErrorDto>) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const projects = await prisma.project.findMany({
        where: {
            status: ProjectStatus.Active,
        },
        include: {
            viewport: true,
            cover: true,
        },
    })

    return res.json(projects.map(mapResponse))
}

export default handler
