import prisma from "@/server/prisma"
import { EditFeatureDto } from "@/common/types"
import { withUser } from "@/server/middlewares/withUser"
import { Feature, FeatureStatus } from "@prisma/client"

const placeholderData = {
    type: "Куст",
}

function mapResponse(item: Feature): EditFeatureDto {
    const geom = item.geometry ?? {} as any
    const geometryType = geom.type ?? "Point"
    const coordinates = geom.coordinates ?? [0, 0]

    return {
        id: item.id,
        title: item.title ?? "",
        description: item.description ?? "",
        geometryType,
        coordinates,
        ...placeholderData,
    }
}

export async function getFeatures(projectId: string) {
    const features = await prisma.feature.findMany({
        where: {
            projectId,
            status: FeatureStatus.Active,
        },
    })

    if (!features) {
        return null
    }

    return features.map(mapResponse)
}

export default withUser<EditFeatureDto[]>(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const projectId = req.query.projectId as string
    const features = await prisma.feature.findMany({
        where: {
            projectId,
            status: FeatureStatus.Active,
        },
        orderBy: {
            createdAt: "asc",
        },
    })

    return res.json(features.map(mapResponse))
})
