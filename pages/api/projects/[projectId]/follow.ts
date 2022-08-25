import prisma from "@/server/prisma"
import { FollowResponseDto } from "@/common/types"
import { withUser } from "@/server/middlewares/withUser"
import { UserFollows } from "@prisma/client"

type Payload = {
  follow: boolean
}

function mapResponse(item: UserFollows): FollowResponseDto {
  return {
    status: item.active,
  }
}

export default withUser<FollowResponseDto>(async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).json({
      error: 'Not found',
    })
  }

  const userId = req.user.id as string
  const projectId = req.query.projectId as string
  const payload = req.body as Payload

  const projectOwner = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      ownerId: true
    }
  })
  if (!projectOwner) {
    return res.status(404).json({
      error: 'Project not found',
    })
  }
  if (projectOwner.ownerId === userId) {
    return res.status(400).json({
      error: 'User cannot follow your own project',
    })
  }

  const follow = await prisma.userFollows.upsert({
    where: {
      userId_projectId: {
        userId,
        projectId,
      }
    },
    create: {
      userId,
      projectId,
      active: payload.follow,
      followedAt: payload.follow ? new Date() : undefined,
      unfollowedAt: !payload.follow ? new Date() : undefined,
    },
    update: {
      active: payload.follow,
      followedAt: payload.follow ? new Date() : undefined,
      unfollowedAt: !payload.follow ? new Date() : undefined,
    }
  })

  return res.json(mapResponse(follow))
})
