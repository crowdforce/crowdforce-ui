import { ActionIcon, createStyles, Flex, Tooltip } from "@mantine/core"

const useStyles = createStyles(theme => ({
    toolbar: {
        backgroundColor: theme.white,
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
    },
    button: {
        color: theme.black,
    },
}))

export type ToolbarItem = {
    name: string
    label: string
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
            {items.map(({ name, label, icon }) => (
                <Tooltip
                    key={name}
                    label={label}
                >
                    <ActionIcon
                        variant="subtle"
                        className={s.button}
                        onClick={() => { onClick(name) }}
                    >
                        {icon}
                    </ActionIcon>
                </Tooltip>
            ))}
        </Flex>
    )
}
