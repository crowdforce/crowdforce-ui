import prisma from "@/server/prisma";
import { NewProjectDto } from "@/common/types";
import { withUser } from "@/server/middlewares/withUser";
import { Project, ProjectStatus } from "@prisma/client";
import { single } from "@/common/lib/array";
import { switchProjectToActiveStatus } from "@/server/app/project";

type Payload = {
  title?: string
  description?: string
}

function mapResponse<T extends { id: string } = Project>(project: T): NewProjectDto {
  return {
    id: project.id,
  }
}

export default withUser<NewProjectDto>(async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  const projectId = single(req.query.projectId as string)

  const payload = req.body as Payload
  const title = payload.title ?? ''
  const description = payload.description ?? ''

  const project = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      title,
      description,
      updatedAt: new Date(),
    },
  })

  await switchProjectToActiveStatus(projectId)

  return res.json(mapResponse(project))
})
