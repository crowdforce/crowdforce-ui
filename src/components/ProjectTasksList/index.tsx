import { createStyles, Accordion, Loader } from "@mantine/core"
import { useRouter } from "next/router"
import { ProjectTask as ProjectTaskType } from "pages/api/projects/[projectId]/tasks"
import useSWR from "swr"
import { ProjectTask } from "@/components/ProjectTask"

const useStyles = createStyles((theme) => ({

}))

export type ProjectTasksListProps = {
    variant?: "default" | "completed"
}

export const ProjectTasksList: React.FC<ProjectTasksListProps> = ({ variant = "default" }) => {
    const router = useRouter()
    const { data } = useSWR<ProjectTaskType[]>(`/api/projects/${router.query.projectId}/tasks`)

    if (!data) {
        return <Loader />
    }

    return (
        <Accordion
            chevron={null}
            chevronSize={0}
            variant='filled'
            disableChevronRotation
            chevronPosition='left'
            radius='md'
            styles={{
                content: {
                    padding: 8,
                    paddingTop: 5,
                },
            }}
        >
            {data.map((x, i) => (
                <ProjectTask
                    key={x.id}
                    task={x}
                    color={i % 2 === 0 ? "#F4FAFD" : undefined}
                    variant={variant}
                />
            ))}
        </Accordion>
    )
}
