import { TaskStatus } from "@prisma/client"

export type ErrorDto = {
  error: string
}

export type Geometry = GeoJSON.Point | GeoJSON.Polygon

export type Dto<Payload> = {
  permission: Permission
  payload: Payload
  error?: ErrorDto
}

export enum Permission {
  view,
  edit,
}

export type NewProjectDto = {
  id: string
}

export type NewAssetDto = {
  id: string
  uploadUrl: string,
}

export type IdDto = {
  id: string
}

export type ProjectCoverPayloadDto = {
  assetId: string
}

export type ProjectFollowingStatus = "following" | "not-following" | "unavailable"

export type ProjectDto = {
  id: string
  title: string
  description: string
  imageUrl: string | null
  followingStatus: ProjectFollowingStatus
  followers: number
}

export type PublicProjectDto = {
  id: string
  title: string
  description: string
  imageUrl: string | null
  followers?: number
  lng: number
  lat: number
}

export type EditProjectDto = {
  id: string
  title: string
  description: string
  status: string
  imageUrl: string | null
  viewport: {
    lng: number
    lat: number
    zoom: number
  }
}

export type AdminProjectDto = {
  id: string
  title: string
  description: string
  status: string
  imageUrl: string | null
  href: string
  isTop: boolean
  ownerId: string
  ownerName: string
  ownerAvatarSrc: string
  // viewport: {
  //   lng: number
  //   lat: number
  //   zoom: number
  // }
}

export type FollowerStatus = "leader" | "participant"

export type FollowerDto = {
  id: string
  name: string
  image: string

  status: FollowerStatus
}

export type ParticipateDto = {
  userId: string
  taskId: string
}

export type EditNewProjectTaskDto = {
    title: string
    description: string
    features: string[]
    timeStart: string
    timeEnd: string
    dateStart: string
    dateEnd: string
}

export type ProjectTaskSummaryDto = {
  id: string
  projectId: string
  projectTitle: string
  title: string
  status: TaskStatus,
  userRole: FollowerStatus,
  dateStart: string
  dateEnd: string
}

export type ProjectTaskDto = {
  id: string
  title: string
  description: string
  dateStart: string
  timeStart: string
  dateEnd: string
  timeEnd: string
  followers: FollowerDto[]
  features?: any[]
}

export type FeatureDto = {
  id: string
  title: string | null
  description: string | null
  // imageUrl: string | null
  // status: FeatureStatus
  // type: FeatureType
  // geometry: Prisma.JsonValue
  // projectId: string
  // createdAt: Date
  // updatedAt: Date
  // deletedAt: Date | null
}

export type NewFeatureDto = {
  id: string
}

export type EditFeatureDto = {
  id: string
  title: string
  description: string
  geometryType: string
  coordinates: object
}

export type FollowResponseDto = {
  status: boolean
}

export type MapViewportDto = {
  lng: number
  lat: number
  zoom: number
}
