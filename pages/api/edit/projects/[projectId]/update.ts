import prisma from "@/server/prisma"
import { NewProjectDto } from "@/common/types"
import { withUser } from "@/server/middlewares/withUser"
import { Project } from "@prisma/client"
import { switchProjectToActiveStatus } from "@/server/app/project"

type Payload = {
  title?: string
  description?: string
  address?: string
  permalink?: string
}

function mapResponse<T extends { id: string } = Project>(project: T): NewProjectDto {
    return {
        id: project.id,
    }
}

export default withUser<NewProjectDto>(async (req, res) => {
    if (req.method !== "PUT") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const projectId = req.query.projectId as string

    const payload = req.body as Payload
    const title = payload.title ?? ""
    const description = payload.description ?? ""
    const address = payload.address ?? ""
    const permalink = payload.permalink ?? ""

    const project = await prisma.project.update({
        where: {
            id: projectId,
        },
        data: {
            title,
            description,
            address,
            permalink,
            updatedAt: new Date(),
        },
    })

    await switchProjectToActiveStatus(projectId)

    return res.json(mapResponse(project))
})
