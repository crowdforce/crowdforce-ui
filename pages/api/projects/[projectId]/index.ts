import prisma from "@/server/prisma"
import { Permission, ProjectDto, Dto, ProjectFollowingStatus } from "@/common/types"
import { Asset, Project, ProjectStatus, UserFollows } from "@prisma/client"
import { withOptionalUser } from "@/server/middlewares/withOptionalUser"

type ProjectAndFollow = {
    userId?: string
    project: Project & { cover: Asset | null }
    follow: UserFollows | null
    followers: number
    permission: Permission
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

function mapResponse(item: ProjectAndFollow): Dto<ProjectDto> {
    let imageUrl = item.project.imageUrl
    if (item.project.cover) {
        imageUrl = item.project.cover.src
    }

    let followingStatus: ProjectFollowingStatus = "unavailable"
    if (item.userId) {
        if (item.follow) {
            followingStatus = item.follow.active
                ? "following"
                : "not-following"
        }

        if (item.project.ownerId === item.userId) {
            followingStatus = "unavailable"
        }
    }

    return {
        payload: {
            id: item.project.id,
            title: item.project.title,
            description: item.project.description,
            imageUrl,
            followingStatus,
            followers: item.followers,
            ...placeholderData,
        },
        permission: item.permission,
    }
}

export async function getProject(projectId: string, userId?: string) {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            status: ProjectStatus.Active,
        },
        include: {
            cover: true,
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
            permission: Permission.view,
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

    const permission = userId === project.ownerId
        ? Permission.edit
        : Permission.view

    return mapResponse({
        userId,
        project,
        follow,
        followers,
        permission,
    })
}

export default withOptionalUser<Dto<ProjectDto>>(async (req, res) => {
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
