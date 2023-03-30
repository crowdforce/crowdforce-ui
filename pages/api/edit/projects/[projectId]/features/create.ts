import prisma from "@/server/prisma"
import { withUser } from "@/server/middlewares/withUser"
import { Feature, FeatureStatus, FeatureType } from "@prisma/client"
import { switchProjectToActiveStatus } from "@/server/app/project"
import type { Geometry, NewFeatureDto } from "@/common/types"

function mapResponse<T extends { id: string } = Feature>(project: T): NewFeatureDto {
    return {
        id: project.id,
    }
}

type Payload = {
    type: FeatureType
    geometry: Geometry
}

async function createDefaultTitle(projectId: string, payload: Payload): Promise<string> {
    const name = payload.type
    // const name = payload.geometry.type

    const suffix = await prisma.feature.count({
        where: {
            projectId,
            title: {
                startsWith: name,
            },
        },
    })

    if (suffix > 0) {
        return `${name} ${suffix}`
    }

    return name
}

export default withUser<NewFeatureDto>(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(404).json({
            error: "Not found",
        })
    }
    const payload = req.body as Payload
    if (!payload) {
        return res.status(400).json({
            error: "Body is empty",
        })
    }

    const projectId = req.query.projectId as string
    const title = await createDefaultTitle(projectId, payload)
    const feature = await prisma.feature.create({
        data: {
            title,
            description: "",
            type: payload.type,
            status: FeatureStatus.Active,
            geometry: {
                type: payload.geometry.type,
                coordinates: payload.geometry.coordinates,
            },
            project: {
                connect: {
                    id: projectId,
                },
            },
        },
    })

    // try to turn project to active after feature creation
    await switchProjectToActiveStatus(projectId)

    return res.json(mapResponse(feature))
})
