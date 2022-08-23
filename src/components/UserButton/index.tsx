import { useCallback, useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, Group, Menu, UnstyledButton, Text, createStyles, Loader } from '@mantine/core';
import { useRouter } from 'next/router';
import { NewProjectDto } from '@/common/types';

const useStyles = createStyles((theme) => ({
    user: {
        color: theme.black,
        borderRadius: theme.radius.sm,

        '&:hover': {
            backgroundColor: theme.colors.gray[0],
        },
    }
}))

export type UserButtonProps = {}

export const UserButton: React.FC<UserButtonProps> = () => {
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
                        // @ts-ignore
                        cred[key] = data[key];
                    }
                });

                signIn('credentials', {
                    // @ts-ignore
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


    const router = useRouter()
    const onNewProject = useCallback(() => {
        // its fetch() until swr2.0 useSWRMutation // https://github.com/vercel/swr/releases/tag/2.0.0-beta.0
        fetch(
            '/api/admin/projects/create',
            {
                method: 'POST',
            },
        )
            .then(async res => {
                if (res.ok && res.status == 200) {
                    return res.json()
                } else {
                    throw Error(res.statusText)
                }
            })
            .then((res: NewProjectDto) => {
                router.push(`/project/${res.id}/edit`)
            })
            .catch(e => {
                console.log('API error: ', e)
            })
    }, [router])

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
                            <Avatar
                                src={session.data?.user?.image!}
                                // radius="xl"
                                size={32}
                            />
                            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} pr={'sm'}>
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
                                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                                <line x1="12" y1="11" x2="12" y2="17" />
                                <line x1="9" y1="14" x2="15" y2="14" />
                            </svg>
                        )}
                        onClick={onNewProject}
                    >
                        Новый проект
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
