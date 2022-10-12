import prisma from "@/server/prisma"
import { EditProjectDto } from "@/common/types"
import { withUser } from "@/server/middlewares/withUser"
import { Asset, MapViewport, Project } from "@prisma/client"

type ProjectWithViewport = Project & {
  viewport: MapViewport
  cover: Asset | null,
}

function mapResponse(project: ProjectWithViewport): EditProjectDto {
    return {
        id: project.id,
        title: project.title,
        description: project.description,
        status: project.status,
        imageUrl: project.cover?.src ?? null,
        viewport: {
            lng: project.viewport.lng,
            lat: project.viewport.lat,
            zoom: project.viewport.zoom,
        },
    }
}

export async function getAdminProject(projectId: string) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        include: {
            viewport: true,
            cover: true,
        },
    })
    if (!project) {
        return null
    }

    return mapResponse(project)
}

export default withUser<EditProjectDto>(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const projectId = req.query.projectId as string

    const project = await getAdminProject(projectId)
    if (!project) {
        return res.status(404).json({
            error: "Not found",
        })
    }

    return res.json(project)
})
