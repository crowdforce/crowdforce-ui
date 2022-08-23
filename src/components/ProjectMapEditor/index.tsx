import { createStyles, Stack, Card, Group, ScrollArea } from '@mantine/core'
import ProjectMap from '@/components/ProjectMap'
import ProjectMapLegend from '../ProjectMapLegend'

const useStyles = createStyles((theme) => ({
    card: {
        maxHeight: '100vh',
    }
}))

export type ProjectMapEditorProps = {
    projectId: string
}

export const ProjectMapEditor: React.FC<ProjectMapEditorProps> = ({ projectId }) => {
    const { classes: s, cx } = useStyles()

    return (
        <Card
            withBorder
            className={s.card}
        >
            <Group
                grow
                align='flex-start'
            >
                <Stack>
                    <div style={{
                        position: 'relative',
                        minHeight: 'min(100vh, 400px)',
                    }}>
                        <ProjectMap
                            projectId={projectId}
                        />
                    </div>
                </Stack>
                <Stack>
                    <ScrollArea>
                        <ProjectMapLegend
                            projectId={projectId}
                        />
                    </ScrollArea>
                </Stack>
            </Group>
        </Card>
    )
}
