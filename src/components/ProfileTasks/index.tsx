import { ProjectTaskSummaryDto } from "@/common/types"
import { Alert, Center, Divider, Loader } from "@mantine/core"
import { IconAlertCircle } from "@tabler/icons"
import useSWR from "swr"
import { TasksTable } from "./TasksTable"

export type ProfileTasksProps = {

}

export const ProfileTasks: React.FC<ProfileTasksProps> = ({ }) => {
    const { data } = useSWR<ProjectTaskSummaryDto[]>("/api/tasks")

    if (!data) {
        return (
            <Center>
                <Loader />
            </Center>
        )
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
                sx={{
                    maxWidth: 520,
                }}
            >
                У вас пока нет задач. Вы можете найти для себя новый проект или добавить задачу в свой.
            </Alert>
        )
    }

    return (
        <>
            <Divider sx={{ opacity: .5 }} />
            <TasksTable
                data={data.map(x => ({
                    id: x.id,
                    title: x.title,
                    projectTitle: x.projectTitle,
                    href: `/project/${x.projectId}`,
                    dateStart: new Date(x.dateStart),
                    dateEnd: new Date(x.dateEnd),
                    role: x.userRole,
                }))}
            />
            <Divider sx={{ opacity: .5 }} />
        </>
    )
}
