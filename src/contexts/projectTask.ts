import { ProjectTask } from "pages/api/projects/[projectId]/tasks"
import React from "react"

type ProjectTaskContextProps = {
    task: Partial<ProjectTask> | null
    setTask: React.Dispatch<React.SetStateAction<Partial<ProjectTask> | null>>
}

export const ProjectTaskContext = React.createContext<ProjectTaskContextProps>({
    task: null,
    setTask: () => null,
})
