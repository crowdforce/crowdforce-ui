import { ProjectSideMenuContext } from '@/contexts/projectSideMenu'
import { ActionIcon, Box, createStyles, Stack } from '@mantine/core'
import { IconArrowBarToRight, IconCheckupList, IconClipboardList, IconNotes, IconTools } from '@tabler/icons'
import { Dispatch, SetStateAction, useCallback, useContext, useState } from 'react'

type ProjectSideMenuProps = {

}

export const buttons = [
    {
        icon: <IconArrowBarToRight />,
        text: '',
        id: 'aside',
    },
    {
        icon: <IconNotes />,
        text: 'Описание пректа',
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
    },
    {
        icon: <IconTools />,
        text: 'Редактирование',
        id: 'edit',
    },
]

const useStyles = createStyles((theme) => ({
    container: {
        position: 'absolute',
        zIndex: 101, // aside+1
        height: '100%',
        width: 50,
        background: theme.colors.dark[7],
        left: 0,
        top: 0,
        paddingTop: theme.spacing.xs,
    }
}))

export const ProjectSideMenu: React.FC<ProjectSideMenuProps> = () => {
    const { classes: s, cx } = useStyles()

    const { open, setOpen, openId, setOpenId } = useContext(ProjectSideMenuContext)

    const onAction = useCallback<(id: string) => void>(id => {
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
        >
            <Stack
                align='center'
                spacing='xs'
            >
                {buttons.map((x, i) => (
                    <ActionIcon
                        size='xl'
                        variant={openId === x.id ? 'light' : 'outline'}
                        sx={{
                            border: 'none',
                        }}
                        onClick={() => onAction(x.id)}
                    >
                        {x.icon}
                    </ActionIcon>
                ))}
            </Stack>
        </Box>
    )

}
