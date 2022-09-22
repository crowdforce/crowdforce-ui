import { FollowedTask } from "@/common/types"
import { ActionIcon, Center, Divider, Group, Loader, Menu, ScrollArea, Stack, Table, Text } from "@mantine/core"
import { IconDots, IconTools } from "@tabler/icons"
import dayjs from "dayjs"
import Link from "next/link"
import useSWR from "swr"

const roleText = {
    leader: "ответственный",
    participant: "волонтер",
}

export type ProfileTasksProps = {

}

export const ProfileTasks: React.FC<ProfileTasksProps> = ({ }) => {
    const { data } = useSWR<FollowedTask[]>("/api/admin/tasks", () => ([ // placeholder path and data
        {
            "id": "cl86ovzbb0044pb3krupkrdpz",
            "title": "Обоссать",
            "description": "Просим обоссать каждое дерево в парке.",
            "dateStart": "Thu Sep 15 2022",
            "timeStart": "Tue Sep 20 2022",
            "dateEnd": "Thu Sep 15 2022",
            "timeEnd": "Tue Sep 20 2022",
            "role": "participant" as any,
            "projectId": "placeholderProjectId",
            "projectTitle": "placeholderProjectTitle",
            "followers": [
                {
                    "id": "cl787cvnz0012jb3kcg23zg4w",
                    "name": "Roman Timashev",
                    "image": "https://t.me/i/userpic/320/pyFRk5ueqLuVIiYhmRzZrpv8KOD6n1wqAWgudLRb6Sg.jpg",
                    "status": "participant" as any,
                },
            ],
        },
        {
            "id": "cl86psi2a0316pb3kngazt098",
            "title": "Добавить навозия",
            "description": "Навозия очень мало, давайте добавим",
            "dateStart": "Thu Sep 15 2022",
            "timeStart": "Tue Sep 20 2022",
            "dateEnd": "Thu Sep 15 2022",
            "timeEnd": "Tue Sep 20 2022",
            "role": "leader" as any,
            "projectId": "placeholderProjectId",
            "projectTitle": "placeholderProjectTitle",
            "followers": [],
        },
    ]))

    if (!data) {
        return (
            <Center>
                <Loader />
            </Center>
        )
    }

    return (
        <ScrollArea>
            <Divider sx={{ opacity: .5 }} />
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
            <Divider sx={{ opacity: .5 }} />
        </ScrollArea>
    )
}
