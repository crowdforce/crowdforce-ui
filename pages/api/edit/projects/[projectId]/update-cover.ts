import prisma from "@/server/prisma"
import { IdDto, ProjectCoverPayloadDto } from "@/common/types"
import { withUser } from "@/server/middlewares/withUser"
import { Project } from "@prisma/client"

function mapResponse<T extends { id: string } = Project>(project: T): IdDto {
    return {
        id: project.id,
    }
}

const handler = withUser<IdDto>(async (req, res) => {
    if (req.method !== "PUT") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const projectId = req.query.projectId as string

    // const hasPermissionsToUpdate = await checkPermissions(req.user.id, projectId)
    // if (!hasPermissionsToUpdate) {
    //   return res.status(403).json({
    //     error: 'Forbidden',
    //   })
    // }

    const payload = req.body as ProjectCoverPayloadDto
    if (!payload) {
        return res.status(400).json({
            error: "Body is empty",
        })
    }

    const project = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            updatedAt: new Date(),
            coverId: payload.assetId,
        },
    })

    return res.json(mapResponse(project))
})

export default handler
