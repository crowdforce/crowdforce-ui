import { AdminProjectDto } from '@/common/types'
import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { ActionIcon, Box, Button, createStyles, Group, Stack } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconArrowAutofitWidth, IconArrowBarToRight, IconCheckupList, IconClipboardList, IconNotes, IconTools } from '@tabler/icons'
import React, { useCallback, useContext, useEffect, useState } from 'react'
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
        zIndex: 101,
        height: '100%',
        background: theme.colors.dark[7],
        left: 0,
        top: 0,
        paddingTop: theme.spacing.xs,
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
        }
    },
    iconWide: {
        position: 'absolute',
        zIndex: 1,
        bottom: theme.spacing.xs,
        left: '50%',
        transform: 'translateX(-50%) !important',
        color: theme.colors.lime,
    },
}))

export const ProjectSideMenu: React.FC<ProjectSideMenuProps> = ({ projectId }) => {
    const { classes: s, cx } = useStyles()
    const { data, error } = useSWR<AdminProjectDto>(`/api/admin/projects/${projectId}`)

    const smallerThanSm = useMediaQuery('(max-width: 800px)', false)
    const { open, setOpen, openId, setOpenId } = useContext(ProjectSideMenuContext)
    const [wide, setWide] = useState(!smallerThanSm)
    useEffect(() => {
        setWide(!smallerThanSm)
    }, [smallerThanSm])

    const onAction = useCallback<(id: ProjectSideMenuIds) => void>(id => {
        if (id == 'aside') {
            setOpen(!open)
            return
        }

        setOpenId(id)
        setOpen(true)
    }, [open, openId])

    return (
        <Box
            className={s.container}
            sx={{
                width: wide ? 260 : 50,
                overflow: 'visible'
            }}
        >
            <Stack
                align='center'
                spacing='xs'
                px={wide ? 'xs' : 0}
            >
                {buttons
                    .filter((x, i) => (data && data?.error || error) && !x.admin)
                    .map((x, i) => wide ? (
                        <Button
                            key={x.id}
                            size='md'
                            fullWidth
                            variant={openId === x.id ? 'light' : 'outline'}
                            className={cx(s.icon, openId === x.id && s.iconSelected, x.id == 'aside' && open && s.asideId)}
                            leftIcon={x.icon}
                            onClick={() => onAction(x.id)}
                            styles={{
                                inner: {
                                    justifyContent: 'flex-start'
                                }
                            }}
                        >
                            {x.id == 'aside' ? (open ? 'Закрыть панель' : 'Открыть панель') : (x.text)}
                        </Button>
                    ) : (
                        <ActionIcon
                            key={x.id}
                            size='xl'
                            variant={openId === x.id ? 'light' : 'outline'}
                            className={cx(s.icon, openId === x.id && s.iconSelected, x.id == 'aside' && open && s.asideId)}
                            onClick={() => onAction(x.id)}
                        >
                            {x.icon}
                        </ActionIcon>
                    ))}
            </Stack>

            <ActionIcon
                size='xs'
                variant='default'
                className={cx(s.iconWide)}

                onClick={() => setWide(!wide)}
            >
                <IconArrowAutofitWidth />
            </ActionIcon>
        </Box>
    )

}
