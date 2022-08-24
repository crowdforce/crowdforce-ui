import prisma from "@/server/prisma";
import { NewProjectDto } from "@/common/types";
import { withUser } from "@/server/middlewares/withUser";
import { Project } from "@prisma/client";

type Payload = {
    lng: number
    lat: number
    zoom: number
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

    const projectId = req.query.projectId as string

    // const hasPermissionsToUpdate = await checkPermissions(req.user.id, projectId)
    // if (!hasPermissionsToUpdate) {
    //   return res.status(403).json({
    //     error: 'Forbidden',
    //   })
    // }

    const payload = req.body as Payload
    if (!payload) {
        return res.status(400).json({
            error: 'Body is empty',
        })
    }

    const project = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            updatedAt: new Date(),
            viewport: {
                update: {
                    lng: payload.lng,
                    lat: payload.lat,
                    zoom: payload.zoom,
                    updatedAt: new Date(),
                }
            }
        },
    })

    return res.json(mapResponse(project))
})
