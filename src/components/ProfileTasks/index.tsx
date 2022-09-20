import { createStyles, Group, ScrollArea, Stack, Table, Text } from "@mantine/core"
import dayjs from "dayjs"
import { FollowedTask } from "types/task"

const useStyles = createStyles((theme) => ({

}))

export type ProfileTasksProps = {
    data: FollowedTask[]
}

const roleText = {
    leader: "ответственный",
    follower: "волонтер",
}

export const ProfileTasks: React.FC<ProfileTasksProps> = ({ data }) => {
    // eslint-disable-next-line
    const { classes: s } = useStyles()

    return (
        <ScrollArea>
            <Table
                verticalSpacing="lg"
            >
                <tbody>
                    {data.map((x) => (
                        <tr key={x.id}>
                            <td>
                                <Stack
                                    spacing={0}
                                >
                                    <Text
                                        size="xl"
                                    >
                                        {x.title}
                                    </Text>
                                    <Text>
                                        {"related project name"}
                                    </Text>
                                </Stack>
                            </td>
                            <td>
                                <Text
                                    weight="bold"
                                >
                                    {roleText[x.role]}
                                </Text>
                            </td>
                            <td>
                                <Group
                                    noWrap
                                    spacing={"xs"}
                                >
                                    <Stack
                                        spacing={0}
                                    >
                                        <Text
                                            weight={700}
                                        >
                                            {dayjs(x.dateStart).format("DD.MM.YYYY")}
                                        </Text>

                                        {x.dateStart !== x.dateEnd && (
                                            <Text
                                                weight={700}
                                            >
                                                {dayjs(x.dateEnd).format("DD.MM.YYYY")}
                                            </Text>
                                        )}
                                    </Stack>
                                    <Stack
                                        spacing={0}
                                    >
                                        <Text>
                                            {dayjs(x.timeStart).format("HH:MM")}
                                        </Text>
                                        <Text>
                                            {dayjs(x.timeEnd).format("HH:MM")}
                                        </Text>
                                    </Stack>
                                </Group>
                            </td>
                            <td>
                                some buttons placeholder
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </ScrollArea>
    )
}
