import { UnstyledButton, createStyles } from "@mantine/core"
import Link from "next/link"

const useStyles = createStyles((theme) => ({
    user: {
        color: theme.colorScheme === "dark"
            ? theme.white
            : theme.black,
        borderRadius: theme.radius.md,
        padding: "8px 2px",
        height: 36,

        textDecoration: "none",
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark"
                ? theme.colors.gray[8]
                : theme.colors.gray[0],
        },
    },
}))

export type MenuItemProps = {
    href: string
    children?: React.ReactNode
}

export const MenuItem: React.FC<MenuItemProps> = props => {
    const { classes: s } = useStyles()

    return (
        <Link href={props.href} passHref>
            <UnstyledButton
                component='a'
                className={s.user}
            >
                {props.children}
            </UnstyledButton>
        </Link>
    )
}
