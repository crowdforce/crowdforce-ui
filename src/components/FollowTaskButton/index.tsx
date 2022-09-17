import { Button, Loader } from "@mantine/core"
import { useSWRConfig } from "swr"

export type FollowProjectProps = {
    projectId: string
    taskId: string | number
    status: boolean | null
}

export const FollowTaskButton: React.FC<FollowProjectProps> = ({ projectId, taskId, status }) => {
    const { mutate } = useSWRConfig()

    if (status === null) {
        return (
            <Button
                disabled
            >
                <Loader size='xs' />
            </Button>
        )
    }

    return (
        <Button
            uppercase
            sx={{
                width: "fit-content",
            }}
            color={status ? "red" : "lime"}
            onClick={async () => {
                const payload = {
                    follow: !status,
                }
                await fetch(`/api/projects/${projectId}/task/${taskId}/follow`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(payload),
                })
                mutate(`/api/projects/${projectId}/tasks`)
            }}
        >
            {status ? "отказаться от задачи" : "Взять задачу"}
        </Button>
    )
}
