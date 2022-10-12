import prisma from "@/server/prisma"
import { NewFeatureDto, NewProjectDto, Geometry } from "@/common/types"
import { withUser } from "@/server/middlewares/withUser"
import { Feature } from "@prisma/client"

type Payload = {
    geometry: Geometry
}

function mapResponse<T extends { id: string } = Feature>(feature: T): NewFeatureDto {
    return {
        id: feature.id,
    }
}

export default withUser<NewProjectDto>(async (req, res) => {
    if (req.method !== "PUT") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const featureId = req.query.featureId as string

    const hasPermissionsToUpdate = true
    if (!hasPermissionsToUpdate) {
        return res.status(403).json({
            error: "Forbidden",
        })
    }

    const payload = req.body as Payload
    const geometry = payload.geometry
    if (!geometry) {
        return res.status(400).json({
            error: "Geometry is not set",
        })
    }

    const feature = await prisma.feature.update({
        where: {
            id: featureId,
        },
        data: {
            updatedAt: new Date(),
            geometry: geometry as object,
        },
        select: {
            id: true,
        },
    })

    return res.json(mapResponse(feature))
})
