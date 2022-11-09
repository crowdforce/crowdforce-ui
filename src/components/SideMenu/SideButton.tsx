import { ActionIcon, Button, createStyles } from "@mantine/core"
import type { ButtonProps } from "@mantine/core"

export type SideButtonOnClick = () => void

export type SideButtonProps = Omit<ButtonProps, "leftIcon"> & {
    wide: boolean
    active: boolean
    icon: React.ReactNode
    onClick?: SideButtonOnClick
    href?: string
}

const useStyles = createStyles((theme) => ({
    button: {
        border: "none",
        color: theme.colors.gray[0],
    },
    selected: {
        color: theme.colors.lime,
        background: "#ECF2F6",
        "&:hover": {
            background: theme.colors.lime[0],
        },
    },
}))

export const SideButton: React.FC<SideButtonProps> = ({ active, wide, icon, href, onClick, ...props }) => {
    const { classes: s, cx } = useStyles()

    if (wide) {
        return (
            <Button
                {...props}
                size="md"
                fullWidth
                radius="md"
                variant={active ? "light" : "outline"}
                className={cx(s.button, props.className, {
                    [s.selected]: active,
                })}
                leftIcon={icon}
                onClick={onClick}
                component={href ? "a" : "button"}
                href={href}
                styles={{
                    inner: {
                        justifyContent: "flex-start",
                        fontWeight: "normal",
                    },
                }}
            >
                {props.children}
            </Button>
        )
    }

    return (
        <ActionIcon
            size="xl"
            radius="md"
            variant={active ? "light" : "outline"}
            className={cx(s.button, props.className)}
            component={href ? "a" : "button"}
            href={href}
            onClick={onClick}
        >
            {icon}
        </ActionIcon>
    )
}
