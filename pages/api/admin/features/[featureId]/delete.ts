import prisma from "@/server/prisma"
import { NewFeatureDto, NewProjectDto, Geometry } from "@/common/types"
import { withUser } from "@/server/middlewares/withUser"
import { Feature, FeatureStatus } from "@prisma/client"

function mapResponse<T extends { id: string } = Feature>(feature: T): NewFeatureDto {
    return {
        id: feature.id,
    }
}

async function isFeatureInUse(featureId: string): Promise<boolean> {
    return false
}

export default withUser<NewProjectDto>(async (req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(404).json({
            error: 'Not found',
        })
    }

    const featureId = req.query.featureId as string

    const hasPermissionsToUpdate = true
    if (!hasPermissionsToUpdate) {
        return res.status(403).json({
            error: 'Forbidden',
        })
    }

    const inUse = await isFeatureInUse(featureId)
    if (inUse) {
        return res.status(400).json({
            error: 'Feature in use',
        })
    }

    const feature = await prisma.feature.update({
        where: {
            id: featureId,
        },
        data: {
            status: FeatureStatus.Deleted,
            deletedAt: new Date(),
        },
        select: {
            id: true,
        }
    })

    return res.json(mapResponse(feature))
})
