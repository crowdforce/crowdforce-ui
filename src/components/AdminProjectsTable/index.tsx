import { createStyles, ActionIcon, Menu, Table, Text, Badge, Checkbox, Group } from "@mantine/core"
import { AdminProjectDto } from "@/common/types"
import { IconBan, IconBugOff, IconBulb, IconBulbOff, IconDots, IconEyeOff, IconTrash } from "@tabler/icons"
import Link from "next/link"
import { useCallback } from "react"
import Image from "next/future/image"
import { useSWRConfig } from "swr"
import { UserAvatar } from "../UserAvatar"

const useStyles = createStyles((theme) => ({
    section: {
        position: "relative",
        width: "100%",
        maxWidth: 1160,
    },

    image: {
        borderRadius: theme.radius.md,
    },

    noImage: {
        width: 32,
        height: 32,
        backgroundColor: theme.white,
        borderRadius: theme.radius.md,
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
                    <th>Название</th>
                    <th>Куратор</th>
                    <th>Галерея</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map(({ id, title, imageUrl, status, ownerName, ownerAvatarSrc, isTop, href }) => (
                    <tr key={id}>
                        <td style={{
                            // width: "100%",
                        }}>
                            <Group>
                                {!imageUrl ? (
                                    <div className={s.noImage}></div>
                                ) : (
                                    <Image
                                        src={imageUrl}
                                        width={32}
                                        height={32}
                                        alt={title}
                                        className={s.image}
                                    />
                                )}
                                <Link href={href} passHref>
                                    <Text
                                        component='a'
                                        inherit
                                    >
                                        {title}
                                    </Text>
                                </Link>
                            </Group>
                        </td>
                        <td>
                            <Link href={href} passHref>
                                <UserAvatar
                                    src={ownerAvatarSrc}
                                >{ownerName}</UserAvatar>
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
