import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { ActionIcon, createStyles } from "@mantine/core"
import { IconArrowBarToRight, IconCheckupList, IconClipboardList, IconNotes, IconSelector, IconSettings, IconTools } from "@tabler/icons"
import React, { useCallback, useContext } from "react"
import { SideMenu } from "@/components/SideMenu"
import { SideButton } from "../SideMenu/SideButton"
import { ToggleSideButton } from "../SideMenu/ToggleSideButton"

type ProjectSideMenuProps = {

}

export type ProjectSideMenuIds = "info" | "tasks" | "add-task" | "edit"

const useStyles = createStyles((theme) => ({
    icon: {
        border: "none",
        color: theme.colors.gray[0],
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
        setOpenId(id)
        setOpen(true)
    }, [setOpen, setOpenId])

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

            <SideButton
                active={openId === "info"}
                wide={wide}
                icon={(
                    <IconNotes />
                )}
                onClick={() => onAction("info")}
            >
                Описание проекта
            </SideButton>
            <SideButton
                active={openId === "tasks"}
                wide={wide}
                icon={(
                    <IconCheckupList />
                )}
                onClick={() => onAction("tasks")}
            >
                Задачи проекта
            </SideButton>
            {!isAdmin ? null : (
                <>
                    <SideButton
                        active={openId === "add-task"}
                        wide={wide}
                        icon={(
                            <IconClipboardList />
                        )}
                        disabled={isInit}
                        onClick={() => onAction("add-task")}
                    >
                        Добавить задачу
                    </SideButton>
                    <SideButton
                        active={openId === "edit"}
                        wide={wide}
                        icon={(
                            <IconTools />
                        )}
                        onClick={() => onAction("edit")}
                    >
                        Редактирование
                    </SideButton>
                </>
            )}
        </SideMenu>
    )
}
