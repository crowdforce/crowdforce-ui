import { ActionIcon, createStyles, Group } from "@mantine/core"

const useStyles = createStyles(theme => ({
    toolbar: {
        backgroundColor: theme.white,
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
    },
}))

export type ToolbarItem = {
    name: string
    icon: React.ReactNode
}

export type ToolbarClick = (name: string) => void

export type ToolbarProps = {
    items: ToolbarItem[]
    onClick: ToolbarClick
}

export const Toolbar: React.FC<ToolbarProps> = ({ onClick, items }) => {
    const { classes: s } = useStyles()

    return (
        <Group className={s.toolbar} spacing={"sm"}>
            {items.map(x => (
                <ActionIcon
                    key={x.name}
                    variant="subtle"
                    onClick={() => { onClick(x.name) }}
                >
                    {x.icon}
                </ActionIcon>
            ))}
        </Group>
    )
}
