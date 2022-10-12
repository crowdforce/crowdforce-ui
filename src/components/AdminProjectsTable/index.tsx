import { createStyles, ActionIcon, Menu, Table, Text, Badge } from "@mantine/core"
import { SystemProjectDto } from "@/common/types"
import { IconBan, IconDots, IconEyeOff, IconTrash } from "@tabler/icons"
import Link from "next/link"
import { useCallback } from "react"
import Image from "next/future/image"

const useStyles = createStyles((theme) => ({
    section: {
        position: "relative",
        width: "100%",
        maxWidth: 1160,
    },

    image: {
        borderRadius: theme.radius.sm,
    },
}))

type Props = {
    items: SystemProjectDto[]
}

const statusColors = new Map([
    ["Active", undefined],
    ["Init", "gray"],
    ["Banned", "red"],
])

export const AdminProjectsTable: React.FC<Props> = ({ items }) => {
    const { classes: s } = useStyles()

    const onDelete = useCallback((id: string) => null, [])
    const onBan = useCallback((id: string) => null, [])
    const onHide = useCallback((id: string) => null, [])

    return (
        <Table
            className={s.section}
            verticalSpacing="sm"
        >
            <thead>
                <tr>
                    <th></th>
                    <th>Название</th>
                    <th>Статус</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map(({ id, title, imageUrl, status, href }) => (
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
                                <Menu.Dropdown>
                                    <Menu.Item
                                        icon={<IconTrash />}
                                        onClick={() => onDelete(id)}
                                    >
                                        {"Удалить"}
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconBan />}
                                        onClick={() => onBan(id)}
                                    >
                                        {"Забанить"}
                                    </Menu.Item>
                                    <Menu.Item
                                        icon={<IconEyeOff />}
                                        onClick={() => onHide(id)}
                                    >
                                        {"Скрыть с главной"}
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
