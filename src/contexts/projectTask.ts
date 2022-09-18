import { ProjectTaskDto } from "@/common/types"
import { createContext } from "react"

type ProjectTaskContextProps = {
    task: Partial<ProjectTaskDto> | null
    setTask: React.Dispatch<React.SetStateAction<Partial<ProjectTaskDto> | null>>
}

export const ProjectTaskContext = createContext<ProjectTaskContextProps>({
    task: null,
    setTask: () => null,
})
