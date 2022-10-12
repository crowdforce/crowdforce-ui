import { useCallback, useEffect } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, Group, Menu, UnstyledButton, Text, createStyles, Loader } from "@mantine/core"
import { IconChevronDown, IconLogout, IconPlus, IconUser } from "@tabler/icons"
import { useRouter } from "next/router"
import { NewProjectDto } from "@/common/types"
import { NextLink } from "@mantine/next"
import { ColorThemeSwitch } from "../ColorThemeSwitch"

const useStyles = createStyles((theme) => ({
    user: {
        color: theme.colorScheme === "dark"
            ? theme.white
            : theme.black,
        borderRadius: theme.radius.md,
        paddingRight: theme.spacing.sm,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark"
                ? theme.colors.gray[8]
                : theme.colors.gray[0],
        },
    },
    mobileHidden: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
}))

export type UserButtonProps = {}

export const UserButton: React.FC<UserButtonProps> = () => {
    const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID
    const session = useSession()
    const isLoading = session.status === "loading"
    const isAuthenticated = session.status === "authenticated"

    const { classes: s } = useStyles()

    useEffect(() => {
        const loginController = new AbortController()

        window.addEventListener("message", async ({ data }) => {
            if (data.type === "login" && data.id) {
                const query = new URLSearchParams()
                const cred = {}
                Object.keys(data).forEach((key) => {
                    if (key !== "type") {
                        query.set(key, data[key])
                        // @ts-ignore
                        cred[key] = data[key]
                    }
                })

                signIn("telegram", {
                    // @ts-ignore
                    redirect: "/",
                    ...cred,
                })
            }
        }, {
            signal: loginController.signal,
        })

        return () => {
            loginController.abort()
        }
    }, [])

    const router = useRouter()
    const onNewProject = useCallback(() => {
        // its fetch() until swr2.0 useSWRMutation // https://github.com/vercel/swr/releases/tag/2.0.0-beta.0
        fetch(
            "/api/edit/projects/create",
            {
                method: "POST",
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
                // eslint-disable-next-line no-console
                console.log("API error: ", e)
            })
    }, [router])

    if (isAuthenticated) {
        return (
            <Menu
                width={200}
                position="bottom-end"
                transition="pop-top-right"
                shadow={"lg"}
            >
                <Menu.Target>
                    <UnstyledButton
                        className={s.user}
                    >
                        <Group>
                            <Avatar
                                src={session.data?.user?.image!}
                                size={32}
                            />
                            <Text size="sm" sx={{ lineHeight: 1 }}
                                className={s.mobileHidden}
                            >
                                {session.data?.user?.name!}
                            </Text>
                            <IconChevronDown size={20}
                                className={s.mobileHidden}
                            />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item
                        component={NextLink}
                        href='/profile'
                        icon={(
                            <IconUser size={16} />
                        )}
                    >
                        Профиль
                    </Menu.Item>
                    <Menu.Item
                        icon={(
                            <IconPlus size={16} />
                        )}
                        onClick={onNewProject}
                    >
                        Новый проект
                    </Menu.Item>
                    <Menu.Item
                        closeMenuOnClick={false}
                        component={ColorThemeSwitch}
                    />
                    <Menu.Item
                        icon={(
                            <IconLogout size={16} />
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
            src={`/loginButton.html?bot_id=${botId}&origin=${window.location.origin}`}
        />
    )
}
