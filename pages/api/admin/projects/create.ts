import prisma from "@/server/prisma"
import { NewProjectDto } from "@/common/types"
import { withUser } from "@/server/middlewares/withUser"
import { Project, ProjectStatus } from "@prisma/client"

function mapResponse<T extends { id: string } = Project>(project: T): NewProjectDto {
    return {
        id: project.id,
    }
}

export default withUser<NewProjectDto>(async (req, res) => {
    if (req.method !== "POST") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    // Not allowed to create new project until user has inited projects
    const initedProjects = await prisma.project.count({
        where: {
            ownerId: req.user.id,
            status: ProjectStatus.Init,
        },
    })
    if (initedProjects > 0) {
        return res.status(405).json({
            error: "User has projects in Init status",
        })
    }

    const project = await prisma.project.create({
        data: {
            title: "",
            description: "",
            status: ProjectStatus.Init,
            owner: {
                connect: {
                    id: req.user.id,
                },
            },
            viewport: {
                create: {
                    lng: 60,
                    lat: 30,
                    zoom: 10,
                },
            },
        },
    })

    return res.json(mapResponse(project))
})
