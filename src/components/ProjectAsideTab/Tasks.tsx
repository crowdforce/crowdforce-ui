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
        >
            <ProjectTasksList
                header={(
                    <Group
                        mb='xs'
                        noWrap
                        align="baseline"
                    >
                        <IconToolsKitchen style={{flex: "0 0 auto"}} />
                        <Title order={2} >
                            Актуальные задачи
                        </Title>
                    </Group>
                )}
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
