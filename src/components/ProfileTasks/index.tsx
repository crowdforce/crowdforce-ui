import { FollowedTask } from "@/common/types"
import { ActionIcon, Group, Menu, ScrollArea, Stack, Table, Text } from "@mantine/core"
import { IconDots, IconTools } from "@tabler/icons"
import dayjs from "dayjs"
import Link from "next/link"

export type ProfileTasksProps = {
    data: FollowedTask[]
}

const roleText = {
    leader: "ответственный",
    participant: "волонтер",
}

export const ProfileTasks: React.FC<ProfileTasksProps> = ({ data }) => {
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
                                        {x.projectTitle}
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
                                <Menu
                                    shadow="lg"
                                >
                                    <Menu.Target>
                                        <ActionIcon size={"xl"}>
                                            <IconDots />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Link href={"/project/projectId?editTask=taskId"} passHref>
                                            <Menu.Item
                                                icon={<IconTools />}
                                                component="a"
                                            >
                                                {"Редактировать"}
                                            </Menu.Item>
                                        </Link>
                                    </Menu.Dropdown>
                                </Menu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </ScrollArea>
    )
}
