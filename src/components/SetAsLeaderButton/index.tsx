import { Button, Loader } from "@mantine/core"

export type SetAsLeaderButtonProps = {
    projectId: string
    taskId: string | number
    userId: string
    status: string
}

export const SetAsLeaderButton: React.FC<SetAsLeaderButtonProps> = ({ projectId, taskId, userId, status }) => {
    if (status === null) {
        return (
            <Button
                size='xs'
                compact
                px='xs'
                disabled
            >
                <Loader size='xs' />
            </Button>
        )
    }

    return (
        <Button
            size='xs'
            compact
            px='xs'
            py={4}
            styles={{
                root: {
                    height: " auto",
                    fontSize: 10,
                },
                label: {
                    textAlign: "center",
                },
            }}

            onClick={async () => {
                // code bellow is from follow button

                // const payload = {
                //     follow: !status,
                // }
                // await fetch(`/api/projects/${projectId}/task/${taskId}/follow`, {
                //     method: "POST",
                //     headers: {
                //         "content-type": "application/json",
                //     },
                //     body: JSON.stringify(payload),
                // })
                // mutate(`/api/projects/${projectId}/tasks`)
            }}
        >
            назначить<br />ответственым
        </Button>
    )
}
