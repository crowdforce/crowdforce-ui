import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { ActionIcon, createStyles } from "@mantine/core"
import { IconArrowBarToRight, IconCheckupList, IconClipboardList, IconNotes, IconSelector, IconSettings, IconTools, IconTree } from "@tabler/icons"
import React, { useContext } from "react"
import { SideMenu } from "@/components/SideMenu"
import { SideButton } from "../SideMenu/SideButton"
import { ToggleSideButton } from "../SideMenu/ToggleSideButton"
import { useRouter } from "next/router"

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
    const router = useRouter()
    const projectId = router.query.projectId as string
    const { classes: s, cx } = useStyles()
    const { open, setOpen, wide, setWide, isAdmin, isInit } = useContext(ProjectSideMenuContext)

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
                href={`/project/${projectId}`}
                wide={wide}
                icon={(
                    <IconNotes />
                )}
            >
                Описание проекта
            </SideButton>
            <SideButton
                wide={wide}
                icon={(
                    <IconCheckupList />
                )}
                href={`/project/${projectId}/tasks`}
            >
                Задачи проекта
            </SideButton>
            {!isAdmin ? null : (
                <>
                    <SideButton
                        href={`/project/${projectId}/new-task`}
                        wide={wide}
                        icon={(
                            <IconClipboardList />
                        )}
                        disabled={isInit}
                    >
                        Добавить задачу
                    </SideButton>
                    <SideButton
                        href={`/project/${projectId}/edit`}
                        wide={wide}
                        icon={(
                            <IconTools />
                        )}
                    >
                        Редактирование
                    </SideButton>
                    <SideButton
                        href={`/project/${projectId}/schema`}
                        wide={wide}
                        icon={(
                            <IconTree />
                        )}
                    >
                        Схема
                    </SideButton>
                </>
            )}
        </SideMenu>
    )
}
