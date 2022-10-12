import { createStyles, Card, ScrollArea, Paper, Group, Text, Menu, ActionIcon } from "@mantine/core"
import ProjectMap from "@/components/ProjectMap"
import { ProjectMapLegend } from "@/components/ProjectMapLegend"
import { IconDots, IconMap } from "@tabler/icons"
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
    const id = "project"
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
                <Group position='apart'>
                    <Text weight={500}>Схема проекта</Text>
                    <Group>
                        {/* <ActionIcon>
                            <IconLocation size={16} />
                        </ActionIcon> */}
                        <Menu withinPortal position="bottom-end" shadow="sm">
                            <Menu.Target>
                                <ActionIcon>
                                    <IconDots size={16} />
                                </ActionIcon>
                            </Menu.Target>

                            <Menu.Dropdown>
                                {/* <Menu.Item icon={<IconFileZip size={14} />}>Download zip</Menu.Item> */}
                                {/* <Menu.Item icon={<IconEye size={14} />} color="red">Preview all</Menu.Item> */}
                                <Menu.Item
                                    icon={(
                                        <IconMap size={14} />
                                    )}
                                    onClick={onSaveViewport}
                                >
                                    Сохранить вид
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
            </Card.Section>

            <Card.Section sx={{
                position: "relative",
            }}>
                <div style={{
                    position: "relative",
                    width: "100%",
                    height: "600px",
                    minHeight: "min(100vh, 400px)",
                }}>
                    <ProjectMap
                        id={id}
                        projectId={projectId}
                    />
                </div>
                <div style={{
                    top: 10,
                    right: 10,
                    position: "absolute",
                }}>
                    <Paper p={"sm"}>
                        <ScrollArea>
                            <ProjectMapLegend
                                projectId={projectId}
                            />
                        </ScrollArea>
                    </Paper>
                </div>
            </Card.Section>
        </Card>
    )
}
