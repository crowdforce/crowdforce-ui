import prisma from "@/server/prisma";
import { AdminFeatureDto } from "@/common/types";
import { withUser } from "@/server/middlewares/withUser";
import { Feature, FeatureStatus } from "@prisma/client";

function mapResponse(item: Feature): AdminFeatureDto {
  const geom = item.geometry ?? {} as any
  const geometryType = geom.type ?? 'Point'
  const coordinates = geom.coordinates ?? [0, 0]

  return {
    id: item.id,
    title: item.title ?? "",
    description: item.description ?? "",
    geometryType,
    coordinates,
  }
}

export default withUser<AdminFeatureDto[]>(async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  const projectId = req.query.projectId as string
  const features = await prisma.feature.findMany({
    where: {
      projectId,
      status: FeatureStatus.Active,
    }
  })

  return res.json(features.map(mapResponse))
})
