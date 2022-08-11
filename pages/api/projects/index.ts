import prisma from "@/server/prisma";
import { ErrorDto, ProjectDto } from "@/common/types";
import { Project, ProjectStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

function mapResponse<T extends Project>(project: T): ProjectDto {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
  }
}

export default async (req: NextApiRequest, res: NextApiResponse<ProjectDto[] | ErrorDto>) => {
  if (req.method !== 'GET') {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  const projects = await prisma.project.findMany({
    where: {
      status: ProjectStatus.Active,
    },
  })

  return res.json(projects.map(mapResponse))
}
