import { Button } from '@mantine/core'
import { useSWRConfig } from 'swr'

export type FollowProjectProps = {
    projectId: string
    status: boolean | null
}

export const FollowProjectButton: React.FC<FollowProjectProps> = ({ projectId, status }) => {
    const { mutate } = useSWRConfig()

    if (status === null) {
        return (
            <Button
                size='xs'
                disabled
            >
                Следить за проектом
            </Button>
        )
    }

    return (
        <Button
            component='a'
            size='xs'
            variant={status ? 'filled' : 'default'}
            onClick={async () => {
                const payload = {
                    follow: !status,
                }
                await fetch(`/api/projects/${projectId}/follow`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
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
