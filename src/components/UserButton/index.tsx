import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, Group, Menu, UnstyledButton, Text, createStyles, Loader } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    user: {
        color: theme.black,
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,

        '&:hover': {
            backgroundColor: theme.colors.gray[0],
        },
    }
}))

export const UserButton = () => {
    const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID
    const session = useSession()
    const isLoading = session.status === 'loading'
    const isAuthenticated = session.status === 'authenticated'

    const { classes: s, cx } = useStyles();

    useEffect(() => {
        const loginController = new AbortController();

        window.addEventListener('message', async ({ data }) => {
            if (data.type === 'login' && data.id) {
                const query = new URLSearchParams();
                const cred = {};
                Object.keys(data).forEach((key) => {
                    if (key !== 'type') {
                        query.set(key, data[key]);
                        cred[key] = data[key];
                    }
                });

                signIn('credentials', {
                    redirect: '/',
                    ...cred,
                });
            }
        }, {
            signal: loginController.signal,
        });

        return () => {
            loginController.abort();
        };
    }, []);

    if (isAuthenticated) {
        return (
            <Menu
                width={200}
                position="bottom-end"
                transition="pop-top-right"
            >
                <Menu.Target>
                    <UnstyledButton
                        className={s.user}
                    >
                        <Group>
                            <Avatar src={session.data?.user?.image!} radius="xl" size={32} />
                            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                                {session.data?.user?.name!}
                            </Text>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        component='a'
                        href='/profile'
                        icon={(
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <circle cx="12" cy="7" r="4" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                        )}
                    >
                        Профиль
                    </Menu.Item>
                    <Menu.Item
                        icon={(
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                <path d="M7 12h14l-3 -3m0 6l3 -3" />
                            </svg>
                        )}
                        onClick={() => signOut()}
                    >
                        Выйти
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        )
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <iframe
            frameBorder="0"
            scrolling="no"
            title="login"
            width="100"
            height="36"
            src={`https://crowdforce.ru/loginButton.html?bot_id=${botId}&origin=${window.location.origin}`}
        />
    )
}
