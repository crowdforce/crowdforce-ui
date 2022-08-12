import prisma from "@/server/prisma";
import { AdminProjectDto } from "@/common/types";
import { withUser } from "@/server/middlewares/withUser";
import { Project } from "@prisma/client";
import { single } from "@/common/lib/array";

function mapResponse(project: Project): AdminProjectDto {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
  }
}

export default withUser<AdminProjectDto>(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  const projectId = single(req.query.projectId)

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    }
  })
  if (!project) {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  return res.json(mapResponse(project))
})
