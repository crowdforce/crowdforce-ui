import { AdminProjectDto } from '@/common/types'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { ActionIcon, Button, createStyles, Stack } from '@mantine/core'
import { IconArrowBarToRight, IconCheckupList, IconClipboardList, IconNotes, IconSelector, IconSettings, IconTools } from '@tabler/icons'
import React, { useCallback, useContext } from 'react'
import useSWR from 'swr'

type ProjectSideMenuProps = {
    projectId: string
}

export type ProjectSideMenuIds = 'aside' | 'info' | 'tasks' | 'add-task' | 'edit'
type ProjectSideMenuButtons = {
    icon: JSX.Element
    text: string
    id: ProjectSideMenuIds
    admin?: boolean
}[]

export const buttons: ProjectSideMenuButtons = [
    {
        icon: <IconArrowBarToRight />,
        text: '',
        id: 'aside',
    },
    {
        icon: <IconNotes />,
        text: 'Описание проекта',
        id: 'info',
    },
    {
        icon: <IconCheckupList />,
        text: 'Задачи проекта',
        id: 'tasks',
    },
    {
        icon: <IconClipboardList />,
        text: 'Добавить задачу',
        id: 'add-task',
        admin: true,
    },
    {
        icon: <IconTools />,
        text: 'Редактирование',
        id: 'edit',
        admin: true,
    },
]

const useStyles = createStyles((theme) => ({
    container: {
        position: 'relative',
        height: 'calc(100vh - 60px)',
        background: theme.colors.dark[7],
        left: 0,
        top: 0,
        paddingTop: 2,
    },
    icon: {
        border: 'none',
        color: theme.colors.gray[0],
    },
    iconSelected: {
        color: theme.colors.lime,
        background: '#ECF2F6',
        '&:hover': {
            background: theme.colors.lime[0],
        }
    },
    asideId: {
        '& svg': {
            transform: 'rotate(-180deg)',
        },
    },
    mobileHidden: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        }
    },
}))

export const ProjectSideMenu: React.FC<ProjectSideMenuProps> = ({ projectId }) => {
    const { classes: s, cx } = useStyles()

    const { open, setOpen, openId, setOpenId, wide, setWide, isAdmin, isInit } = useContext(ProjectSideMenuContext)

    const onAction = useCallback<(id: ProjectSideMenuIds) => void>(id => {
        if (id == 'aside') {
            setOpen(!open)
            return
        }

        setOpenId(id)
        setOpen(true)
    }, [open, openId])

    return (
        <Stack
            className={s.container}
            px={2}
            justify='space-between'
            sx={{
                width: wide ? 260 : 48,
                overflow: 'hidden',
            }}
        >
            <Stack
                align='center'
                spacing={2}
            >
                {buttons
                    .filter((x, i) => {
                        if (isInit) { // project just created
                            return ['aside', 'edit'].includes(x.id)
                        }
                        if (isAdmin) { // reqested by admin
                            return true
                        } else {  // requested by NOT admin
                            return ['aside', 'info', 'tasks'].includes(x.id)
                        }
                    })
                    .map((x, i) => wide ? (
                        <Button
                            key={x.id}
                            size='md'
                            fullWidth
                            radius='md'
                            variant={openId === x.id ? 'light' : 'outline'}
                            className={cx(s.icon, openId === x.id && s.iconSelected, x.id == 'aside' && open && s.asideId)}
                            leftIcon={x.icon}
                            onClick={() => onAction(x.id)}
                            styles={{
                                inner: {
                                    justifyContent: 'flex-start',
                                    fontWeight: 'normal',
                                }
                            }}
                        >
                            {x.id == 'aside' ? (open ? 'Закрыть панель' : 'Открыть панель') : (x.text)}
                        </Button>
                    ) : (
                        <ActionIcon
                            key={x.id}
                            size='xl'
                            radius='md'
                            variant={openId === x.id ? 'light' : 'outline'}
                            className={cx(
                                s.icon,
                                openId === x.id && s.iconSelected,
                                x.id == 'aside' && open && s.asideId,
                                x.id == 'edit' && s.mobileHidden,
                            )}
                            onClick={() => onAction(x.id)}
                        >
                            {x.icon}
                        </ActionIcon>
                    ))}
            </Stack>

            <Stack
                spacing={2}
                sx={{
                    position: 'sticky',
                    bottom: 2,
                }}
            >
                <ActionIcon
                    size='xl'
                    radius='md'
                    variant='outline'
                    className={cx(s.icon, s.mobileHidden)}
                    onClick={() => setWide(!wide)}
                    style={{
                        transform: 'rotate(90deg)',
                    }}
                >
                    <IconSelector />
                </ActionIcon>
                <ActionIcon
                    size='xl'
                    radius='md'
                    variant='outline'
                    className={s.icon}
                >
                    <IconSettings />
                </ActionIcon>
            </Stack>
        </Stack>
    )

}
