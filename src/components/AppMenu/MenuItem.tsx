import { UnstyledButton, createStyles } from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
    user: {
        color: theme.black,
        borderRadius: theme.radius.sm,
        padding: `8px 2px`,

        '&:hover': {
            backgroundColor: theme.colors.gray[0],
        },
    }
}))

export type MenuItemProps = {
    href: string
    children?: React.ReactNode
}

export const MenuItem: React.FC<MenuItemProps> = props => {
    const { classes: s, cx } = useStyles();

    return (
        <UnstyledButton
            className={s.user}
        >
            <Link href={props.href} passHref>{props.children}</Link>
        </UnstyledButton>
    )
}
