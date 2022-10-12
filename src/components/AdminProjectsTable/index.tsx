import { createStyles, ActionIcon, Menu, Table, Text, Badge, Checkbox } from "@mantine/core"
import { AdminProjectDto } from "@/common/types"
import { IconBan, IconBugOff, IconBulb, IconBulbOff, IconDots, IconEyeOff, IconTrash } from "@tabler/icons"
import Link from "next/link"
import { useCallback } from "react"
import Image from "next/future/image"
import { useSWRConfig } from "swr"

const useStyles = createStyles((theme) => ({
    section: {
        position: "relative",
        width: "100%",
        maxWidth: 1160,
    },

    image: {
        borderRadius: theme.radius.sm,
    },

    action: {
        minWidth: 180,
    },
}))

type Props = {
    items: AdminProjectDto[]
}

const statusColors = new Map([
    ["Active", undefined],
    ["Init", "gray"],
    ["Banned", "red"],
])

export const AdminProjectsTable: React.FC<Props> = ({ items }) => {
    const { classes: s } = useStyles()
    const { mutate } = useSWRConfig()

    // const onDelete = useCallback((id: string) => {

    // }, [])
    // const onBan = useCallback((id: string) => {

    // }, [])
    const onSetTopStatus = useCallback(async (id: string, status: boolean) => {
        const method = status ? "PUT" : "DELETE"
        const res = await fetch(`/api/admin/projects/${id}/top`, {
            method,
        })
        if (res.ok) {
            mutate("/api/admin/projects")
        }
    }, [mutate])

    return (
        <Table
            className={s.section}
            verticalSpacing="sm"
        >
            <thead>
                <tr>
                    <th></th>
                    <th>Название</th>
                    <th>Галерея</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map(({ id, title, imageUrl, status, isTop, href }) => (
                    <tr key={id}>
                        <td>
                            {!imageUrl ? null : (
                                <Image
                                    src={imageUrl}
                                    width={40}
                                    height={40}
                                    alt={title}
                                    className={s.image}
                                />
                            )}
                        </td>
                        <td style={{
                            width: "100%",
                        }}>
                            <Link href={href} passHref>
                                <Text
                                    component='a'
                                    inherit
                                >
                                    {title}
                                </Text>
                            </Link>
                        </td>
                        <td>
                            {isTop ? (
                                <IconBulb />
                            ) : (
                                <IconBulbOff />
                            )}
                        </td>
                        <td>
                            <Badge color={statusColors.get(status)}>
                                {status}
                            </Badge>
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
                                <Menu.Dropdown style={{
                                    width: 200,
                                }}>
                                    {/* <Menu.Item
                                        icon={<IconTrash />}
                                        onClick={() => onDelete(id)}
                                    >
                                        {"Удалить"}
                                    </Menu.Item> */}
                                    {/* <Menu.Item
                                        icon={<IconBan />}
                                        onClick={() => onBan(id)}
                                    >
                                        {"Забанить"}
                                    </Menu.Item> */}
                                    {isTop ? null : (
                                        <Menu.Item
                                            className={s.action}
                                            icon={<IconBulb />}
                                            onClick={() => onSetTopStatus(id, true)}
                                        >
                                            {"Добавить на главную"}
                                        </Menu.Item>
                                    )}
                                    {!isTop ? null : (
                                        <Menu.Item
                                            className={s.action}
                                            icon={<IconBulbOff />}
                                            onClick={() => onSetTopStatus(id, false)}
                                        >
                                            {"Скрыть с главной"}
                                        </Menu.Item>
                                    )}
                                </Menu.Dropdown>
                            </Menu>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
