import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { ProjectTaskContext } from "@/contexts/projectTask"
import { Button } from "@mantine/core"
import { ProjectTask } from "pages/api/projects/[projectId]/tasks"
import { useContext } from "react"

export type FollowProjectProps = {
    task: ProjectTask
}

export const CopyAsNewTaskButton: React.FC<FollowProjectProps> = ({ task }) => {
    const { setOpenId } = useContext(ProjectSideMenuContext)
    const { setTask } = useContext(ProjectTaskContext)

    return (
        <Button
            uppercase
            variant='outline'
            sx={{
                width: "fit-content",
            }}
            onClick={async () => {
                const { title, description } = task
                setTask({
                    title,
                    description,
                })
                setOpenId("add-task")
            }}
        >
            повторить
        </Button>
    )
}
