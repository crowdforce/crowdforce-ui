import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { ActionIcon, createStyles } from "@mantine/core"
import { IconArrowBarToRight, IconCheckupList, IconClipboardList, IconNotes, IconSelector, IconSettings, IconTools } from "@tabler/icons"
import React, { useCallback, useContext } from "react"
import { SideMenu } from "@/components/SideMenu"
import { SideButton } from "../SideMenu/SideButton"
import { ToggleSideButton } from "../SideMenu/ToggleSideButton"

type ProjectSideMenuProps = {

}

export type ProjectSideMenuIds = "aside" | "info" | "tasks" | "add-task" | "edit"
type ProjectSideMenuButtons = {
    icon: JSX.Element
    text: string
    id: ProjectSideMenuIds
}[]

export const buttons: ProjectSideMenuButtons = [
    {
        icon: <IconNotes />,
        text: "Описание проекта",
        id: "info",
    },
    {
        icon: <IconCheckupList />,
        text: "Задачи проекта",
        id: "tasks",
    },
    {
        icon: <IconClipboardList />,
        text: "Добавить задачу",
        id: "add-task",
    },
    {
        icon: <IconTools />,
        text: "Редактирование",
        id: "edit",
    },
]

const useStyles = createStyles((theme) => ({
    icon: {
        border: "none",
        color: theme.colors.gray[0],
    },
    iconSelected: {
        color: theme.colors.lime,
        background: "#ECF2F6",
        "&:hover": {
            background: theme.colors.lime[0],
        },
    },
    asideId: {
        "& svg": {
            transform: "rotate(-180deg)",
        },
    },
    mobileHidden: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },
}))

export const ProjectSideMenu: React.FC<ProjectSideMenuProps> = ({ }) => {
    const { classes: s, cx } = useStyles()

    const { open, setOpen, openId, setOpenId, wide, setWide, isAdmin, isInit } = useContext(ProjectSideMenuContext)

    const onAction = useCallback<(id: ProjectSideMenuIds) => void>(id => {
        if (id == "aside") {
            setOpen(!open)
            return
        }

        setOpenId(id)
        setOpen(true)
    }, [open, setOpen, setOpenId])

    return (
        <SideMenu
            wide={wide}
            extra={(
                <>
                    <ActionIcon
                        size="xl"
                        radius="md"
                        variant="outline"
                        className={cx(s.icon, s.mobileHidden)}
                        onClick={() => setWide(!wide)}
                        style={{
                            transform: "rotate(90deg)",
                        }}
                    >
                        <IconSelector />
                    </ActionIcon>
                    <ActionIcon
                        size="xl"
                        radius="md"
                        variant="outline"
                        className={s.icon}
                    >
                        <IconSettings />
                    </ActionIcon>
                </>
            )}
        >
            <ToggleSideButton
                open={open}
                wide={wide}
                icon={(
                    <IconArrowBarToRight />
                )}
                onClick={() => setOpen(!open)}
            >
                {["Закрыть панель", "Открыть панель"]}
            </ToggleSideButton>

            {buttons
                .filter(x => {
                    if (isInit) {
                        return ["edit"].includes(x.id)
                    }

                    if (isAdmin) {
                        return true
                    }

                    return ["info", "tasks"].includes(x.id)
                })
                .map(x => (
                    <SideButton
                        key={x.id}
                        active={openId === x.id}
                        wide={wide}
                        radius="md"
                        className={cx(s.icon, openId === x.id && s.iconSelected, x.id == "aside" && open && s.asideId)}
                        icon={x.icon}
                        onClick={() => onAction(x.id)}
                    >
                        {x.id == "aside" ? (open ? "Закрыть панель" : "Открыть панель") : (x.text)}
                    </SideButton>
                ))}
        </SideMenu>
    )
}
