import { Button } from "@mantine/core"
import type { ButtonProps } from "@mantine/core"
import { useSWRConfig } from "swr"

export type FollowProjectProps = ButtonProps & {
    projectId: string
    status: boolean
}

export const FollowProjectButton: React.FC<FollowProjectProps> = ({ projectId, status, ...props }) => {
    const { mutate } = useSWRConfig()

    return (
        <Button
            {...props}
            component='a'
            variant={status ? "filled" : "default"}
            onClick={async () => {
                const payload = {
                    follow: !status,
                }
                await fetch(`/api/projects/${projectId}/follow`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(payload),
                })
                mutate(`/api/projects/${projectId}`)
            }}
        >
            Следить за проектом
        </Button>
    )
}
