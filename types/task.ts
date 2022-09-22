import { FollowerStatus, ProjectTaskDto } from "@/common/types"

export type FollowedTask = Partial<ProjectTaskDto> & {
    role: FollowerStatus
    projectId: string
    projectTitle: string
}
