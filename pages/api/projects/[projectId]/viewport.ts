import prisma from "@/server/prisma";
import { ErrorDto, MapViewportDto } from "@/common/types";
import { MapViewport } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

function mapResponse(viewport: MapViewport): MapViewportDto {
  return {
    lng: viewport.lng,
    lat: viewport.lat,
    zoom: viewport.zoom,
  }
}

export default async (req: NextApiRequest, res: NextApiResponse<MapViewportDto | ErrorDto>) => {
  if (req.method !== 'GET') {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  const projectId = req.query.projectId as string

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      viewport: true,
    },
  })
  if (!project) {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  return res.json(mapResponse(project.viewport))
}
