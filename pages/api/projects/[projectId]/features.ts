import prisma from "@/server/prisma";
import { Feature, FeatureStatus } from "@prisma/client";
import { feature, featureCollection } from '@turf/helpers'
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorDto } from "@/common/types";

function mapResponse(items: Feature[]): GeoJSON.FeatureCollection {
  const features = items.map(x => {
    const properties = {
      title: x.title,
      description: x.description,
    }
    const f = feature(x.geometry, properties) as unknown as GeoJSON.Feature
    f.id = x.id

    return f
  })
  return featureCollection(features)
}

export default async (req: NextApiRequest, res: NextApiResponse<GeoJSON.FeatureCollection | ErrorDto>) => {
  if (req.method !== 'GET') {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  const projectId = req.query.projectId as string
  const type = req.query.type as string

  const features = await prisma.feature.findMany({
    where: {
      projectId,
      status: FeatureStatus.Active,
    }
  })

  const items = features.filter(x => {
    const geom = x.geometry as unknown as GeoJSON.Geometry
    return geom.type === type
  })

  return res.json(mapResponse(items))
}
