import { ProjectTaskDto } from "@/common/types"

export type FollowedTask = Partial<ProjectTaskDto> & {
    role: "leader" | "follower"
}
