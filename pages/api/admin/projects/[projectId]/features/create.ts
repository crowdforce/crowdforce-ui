import prisma from "@/server/prisma";
import { NewProjectDto } from "@/common/types";
import { withUser } from "@/server/middlewares/withUser";
import { FeatureStatus, Project } from "@prisma/client";
import { switchProjectToActiveStatus } from "@/server/app/project";
import { single } from "@/common/lib/array";

function mapResponse<T extends { id: string } = Project>(project: T): NewProjectDto {
  return {
    id: project.id,
  }
}

export default withUser<NewProjectDto>(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  const projectId = single(req.query.projectId)
  const feature = await prisma.feature.create({
    data: {
      title: '',
      description: '',
      status: FeatureStatus.Active,
      geometry: {
        type: 'Point',
        coordinates: [60, 30],
      },
      project: {
        connect: {
          id: projectId,
        }
      }
    },
  })

  // try to turn project to active after feature creation
  await switchProjectToActiveStatus(projectId)

  return res.json(mapResponse(feature))
})
