import prisma from "@/server/prisma"
import { ProjectDto } from "@/common/types"
import { Project, ProjectStatus, UserFollows } from "@prisma/client"
import { withOptionalUser } from "@/server/middlewares/withOptionalUser"

type ProjectAndFollow = {
    project: Project
    follow: UserFollows | null
    followers: number
}

const placeholderData = {
    address: "Санкт-Петербург, наб. р. Карповки, 26/4",
    link: "www.redisYdorogi.ru",
    admin: {
        name: "Товарищ Админ",
        image: "",
        id: "placeholder-admin-user-id",
    },
}

function mapResponse(item: ProjectAndFollow): ProjectDto {
    return {
        id: item.project.id,
        title: item.project.title,
        description: item.project.description,
        imageUrl: item.project.imageUrl,
        isFollowed: !item.follow ? null : item.follow.active,
        followers: item.followers,
        ...placeholderData,
    }
}

export async function getProject(projectId: string, userId?: string) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            status: ProjectStatus.Active,
        },
    })
    if (!project) {
        return null
    }

    const followers = await prisma.userFollows.count({
        where: {
            projectId,
        },
    })

    if (!userId) {
        return mapResponse({
            project,
            follow: null,
            followers,
        })
    }

    const follow = await prisma.userFollows.findUnique({
        where: {
            userId_projectId: {
                userId,
                projectId,
            },
        },
    })

    return mapResponse({
        project,
        follow,
        followers,
    })
}

export default withOptionalUser<ProjectDto>(async (req, res) => {
    if (req.method !== "GET") {
        return res.status(404).json({
            error: "Not found",
        })
    }

    const projectId = req.query.projectId as string

    const project = await getProject(projectId, req.user?.id)
    if (!project) {
        return res.status(404).json({
            error: "Not found",
        })
    }

    return res.json(project)
})
