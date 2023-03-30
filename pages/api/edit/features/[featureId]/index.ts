import prisma from "@/server/prisma"
import { FeatureDto, NewProjectDto } from "@/common/types"
import { withUser } from "@/server/middlewares/withUser"
import { Feature } from "@prisma/client"
import { single } from "@/common/lib/array"

function mapResponse(feature: Feature): FeatureDto {
    return {
        id: feature.id,
        title: feature.title,
        description: feature.description,
    }
}

export default withUser<NewProjectDto>(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const featureId = single(req.query.featureId)
    if (!featureId) {
        return res.status(404).json({
            error: "Not found",
        })
    }

    // const hasPermissionsToUpdate = true
    // if (!hasPermissionsToUpdate) {
    //     return res.status(403).json({
    //         error: "Forbidden",
    //     })
    // }

    const feature = await prisma.feature.findUnique({
        where: {
            id: featureId,
        },
        // select: {
        //     id: true,
        //     title: true,
        // },
    })
    if (!feature) {
        return res.status(404).json({
            error: "Not found",
        })
    }

    return res.json(mapResponse(feature))
})
