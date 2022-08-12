import prisma from "@/server/prisma";
import { AdminFeatureDto } from "@/common/types";
import { withUser } from "@/server/middlewares/withUser";
import { Feature } from "@prisma/client";
import { single } from "@/common/lib/array";

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

  const projectId = single(req.query.projectId)
  const features = await prisma.feature.findMany({
    where: {
      projectId,
    }
  })

  return res.json(features.map(mapResponse))
})
