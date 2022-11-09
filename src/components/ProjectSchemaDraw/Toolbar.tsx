import { ActionIcon, createStyles, Flex, Group } from "@mantine/core"

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
    className?: string
}

export const Toolbar: React.FC<ToolbarProps> = ({ onClick, items, className }) => {
    const { classes: s, cx } = useStyles()

    return (
        <Flex className={cx(s.toolbar, className)} gap={"sm"} justify={"center"}>
            {items.map(x => (
                <ActionIcon
                    key={x.name}
                    variant="subtle"
                    onClick={() => { onClick(x.name) }}
                >
                    {x.icon}
                </ActionIcon>
            ))}
        </Flex>
    )
}
