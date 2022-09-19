import { Aside, Group, ScrollArea, Title } from "@mantine/core"
import { IconToolsKitchen } from "@tabler/icons"
import { useRouter } from "next/router"
import React from "react"
import { ProjectTasksList } from "../ProjectTasksList"

type ProjectTasksProps = {

}

export const Tasks: React.FC<ProjectTasksProps> = () => {
    const router = useRouter()
    const projectId = router.query.projectId as string

    return (
        <Aside.Section
            grow
            component={ScrollArea}
            px='md'
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

            <ProjectTasksList
                projectId={projectId}
            />

            {/* <Group
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
            </Group> */}

            {/* <ProjectTasksList
                variant='completed'
            /> */}
        </Aside.Section>
    )
}
