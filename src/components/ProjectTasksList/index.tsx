import { Accordion, Alert, Loader } from "@mantine/core"
import { useRouter } from "next/router"
import useSWR from "swr"
import { ProjectTask } from "@/components/ProjectTask"
import { ProjectTaskDto } from "@/common/types"
import { IconAlertCircle } from "@tabler/icons"

export type ProjectTasksListProps = {
    projectId: string
    variant?: "default" | "completed"
    header?: React.ReactNode
}

export const ProjectTasksList: React.FC<ProjectTasksListProps> = ({ projectId, variant = "default", header }) => {
    const router = useRouter()
    const { data } = useSWR<ProjectTaskDto[]>(`/api/projects/${router.query.projectId}/tasks`)

    if (!data) {
        return <Loader />
    }

    if (data.length === 0) {
        return (
            <Alert
                icon={(
                    <IconAlertCircle size={16} />
                )}
                variant="filled"
                title="Задач нет"
                color="teal"
                radius="md"
            >
                Куратор пока еще не добавил задачи к этому проекту. Вы можете подписаться на проект, чтобы быть в курсе, когда задачи появятся
            </Alert>
        )
    }

    return (
        <>
            {header}

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
                        projectId={projectId}
                        key={x.id}
                        task={x}
                        color={i % 2 === 0 ? "#F4FAFD" : undefined}
                        variant={variant}
                    />
                ))}
            </Accordion>
        </>
    )
}
