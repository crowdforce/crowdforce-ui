import { createStyles, Card, ScrollArea, Paper } from '@mantine/core'
import ProjectMap from '@/components/ProjectMap'
import { ProjectMapLegend } from '@/components/ProjectMapLegend'

const useStyles = createStyles((theme) => ({
    card: {
        minHeight: '400px',
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
            <div style={{
                position: 'relative',
                width: '100%',
                height: '600px',
                minHeight: 'min(100vh, 400px)',
            }}>
                <ProjectMap
                    projectId={projectId}
                />
            </div>
            <div style={{
                top: 25,
                right: 25,
                position: 'absolute',
            }}>
                <Paper p={'sm'}>
                    <ScrollArea>
                        <ProjectMapLegend
                            projectId={projectId}
                        />
                    </ScrollArea>
                </Paper>
            </div>
        </Card>
    )
}
