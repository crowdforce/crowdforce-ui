import prisma from "@/server/prisma"
import { FeatureDto, NewProjectDto } from "@/common/types"
import { withUser } from "@/server/middlewares/withUser"
import { Feature } from "@prisma/client"

type Payload = {
  title?: string
  description?: string
}

function mapResponse(feature: Feature): FeatureDto {
    return {
        id: feature.id,
        title: feature.title,
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
    const title = payload.title ?? ""
    const description = payload.description ?? ""

    const feature = await prisma.feature.update({
        where: {
            id: featureId,
        },
        data: {
            title,
            description,
            updatedAt: new Date(),
        },
        // select: {
        //     id: true,
        // },
    })

    return res.json(mapResponse(feature))
})
