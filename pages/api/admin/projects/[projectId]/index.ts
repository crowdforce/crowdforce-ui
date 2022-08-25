import prisma from "@/server/prisma";
import { AdminProjectDto } from "@/common/types";
import { withUser } from "@/server/middlewares/withUser";
import { MapViewport, Project } from "@prisma/client";

type ProjectWithViewport = Project & {
  viewport: MapViewport
}

function mapResponse(project: ProjectWithViewport): AdminProjectDto {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    status: project.status,
    viewport: {
      lng: project.viewport.lng,
      lat: project.viewport.lat,
      zoom: project.viewport.zoom,
    }
  }
}

export async function getAdminProject(projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      viewport: true,
    },
  })
  if (!project) {
    return null
  }

  return mapResponse(project)
}

export default withUser<AdminProjectDto>(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  const projectId = req.query.projectId as string

  const project = await getAdminProject(projectId)
  if (!project) {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  return res.json(project)
})
