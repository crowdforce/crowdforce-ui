import { createStyles, Card, Button } from "@mantine/core"
import { IconMap } from "@tabler/icons"
import { useCallback } from "react"
import { useMap } from "react-map-gl"

const useStyles = createStyles(() => ({
    card: {
        minHeight: "400px",
        maxHeight: "100vh",
    },
}))

export type ProjectMapEditorProps = {
    projectId: string
}

export const ProjectMapEditor: React.FC<ProjectMapEditorProps> = ({ projectId }) => {
    const { classes: s } = useStyles()
    const id = "schema"
    const { [id]: map } = useMap()

    const onSaveViewport = useCallback(async () => {
        if (!map) {
            return
        }

        const { lng, lat } = map.getCenter()
        const zoom = map.getZoom()

        const payload = {
            lng,
            lat,
            zoom,
        }
        await fetch(`/api/edit/projects/${projectId}/update-viewport`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(payload),
        })
    }, [map, projectId])

    return (
        <Card
            withBorder
            className={s.card}
        >
            <Card.Section withBorder inheritPadding py="xs">
                <Button
                    leftIcon={(
                        <IconMap size={14} />
                    )}
                    onClick={onSaveViewport}
                >
                    Сохранить вид
                </Button>
            </Card.Section>
        </Card>
    )
}
