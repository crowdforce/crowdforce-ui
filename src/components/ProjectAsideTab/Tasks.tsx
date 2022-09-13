import { Aside, createStyles, Group, ScrollArea, Title } from "@mantine/core"
import { IconCheck, IconToolsKitchen } from "@tabler/icons"
import React from "react"
import { ProjectTasksList } from "../ProjectTasksList"

type ProjectTasksProps = {

}

const useStyles = createStyles((theme) => ({
}))

export const Tasks: React.FC<ProjectTasksProps> = () => {
    const { classes: s, cx } = useStyles()

    return (
        <Aside.Section
            grow
            component={ScrollArea}
            px='xs'
        >
            <Group
                p='xs'
                spacing='xs'
            >
                <IconToolsKitchen strokeWidth={1.2} />
                <Title order={5}
                    sx={{
                        fontSize: 18,
                    }}
                >
                    Актуальные задачи
                </Title>
            </Group>

            <ProjectTasksList />

            <Group
                p='xs'
                spacing='xs'
            >
                <IconCheck strokeWidth={1.2} />
                <Title order={5}
                    sx={{
                        fontSize: 18,
                    }}
                >
                    Выполненные задачи
                </Title>
            </Group>

            <ProjectTasksList
                variant='completed'
            />
        </Aside.Section>
    )
}
