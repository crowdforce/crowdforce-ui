import { Group, Text, Stack, Avatar, Center, Loader } from "@mantine/core"
import useSWR from "swr"
import { SetAsLeaderButton } from "@/components/SetAsLeaderButton"
import { FollowerDto } from "@/common/types"

export type ParticipantListProps = {
    taskId: string
}

export const ParticipantList: React.FC<ParticipantListProps> = ({ taskId }) => {
    const { data } = useSWR<FollowerDto[]>(`/api/tasks/${taskId}/participants`)

    if (!data) {
        return (
            <Loader />
        )
    }

    if (data.length === 0) {
        return (
            <span>no participants yet</span>
        )
    }

    return (
        <Stack
            spacing='xs'
        >
            {data
                .sort((a, b) => {
                    if (a.status == "leader") return -1
                    if (b.status == "leader") return 1
                    return 0
                })
                .map((y => (
                    <Group
                        key={y.name}
                        noWrap
                        position='apart'
                    >
                        <Group
                            noWrap
                            sx={{
                                flex: "1 1 auto",
                            }}
                        >
                            <Avatar
                                size='sm'
                                src={y.image}
                            />
                            <Text
                                sx={{
                                    flex: "1 1 auto",
                                }}
                            >
                                {y.name}
                            </Text>
                        </Group>
                        {/* {y.status == "leader" ? (
                            <Center>
                                <Text
                                    weight={700}
                                    transform='uppercase'
                                    sx={{
                                        fontSize: 13,
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    ответственый
                                </Text>
                            </Center>
                        ) : isDefault && isAdmin && (
                            <SetAsLeaderButton
                                projectId={router.query.projectId as string}
                                taskId={task.id}
                                userId={y.id as string}
                                status={y.status}
                            />
                        )} */}
                    </Group>
                )))}
        </Stack>
    )
}
