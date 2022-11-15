import { useCallback, useContext, useEffect, useState } from "react"
import { OnChangeDraw } from "./useDrawControl"
import useSWR, { useSWRConfig } from "swr"
import { useDrawControl } from "./useDrawControl"
import { useRouter } from "next/router"
import { EditFeatureDto } from "@/common/types"
import { dataToGeojson } from "./lib"
import { Box, Center, createStyles } from "@mantine/core"
import { IconMarquee2, IconPoint, IconPolygon, IconTallymark4, IconTrash, IconTree } from "@tabler/icons"
import { Toolbar } from "./Toolbar"
import { ProjectSideMenuContext } from "@/contexts/projectSideMenu"
import { FeatureType } from "@prisma/client"

const useStyles = createStyles(theme => ({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        padding: theme.spacing.sm,
        pointerEvents: "none",
    },
    toolbar: {
        pointerEvents: "auto",
    },
}))

export type ProjectSchemaDrawProps = {
}

export const ProjectSchemaDraw: React.FC<ProjectSchemaDrawProps> = () => {
    const [currentType, setCurrentType] = useState<FeatureType | null>(null)
    const { mutate } = useSWRConfig()
    const { classes: s } = useStyles()
    const router = useRouter()
    const projectId = router.query.projectId as string
    const { data: features } = useSWR<EditFeatureDto[]>(`/api/edit/projects/${projectId}/features`)
    const { open } = useContext(ProjectSideMenuContext)

    const onChange = useCallback<OnChangeDraw>(async (event, draw) => {
        const feature = event.features[0]
        const featureId = feature.id! as string
        const ids = event.features.map(x => x.id) as string[]

        switch (event.type) {
            case "draw.create": {
                const payload = {
                    geometry: feature.geometry,
                    type: currentType ?? FeatureType.Unknown,
                }
                fetch(`/api/edit/projects/${projectId}/features/create`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(payload),
                })
                    .then(async res => {
                        if (res.ok && res.status == 200) {
                            return await res.json()
                        } else {
                            throw Error(res.statusText)
                        }
                    })
                    .then(() => {
                        mutate(`/api/edit/projects/${projectId}/features`)
                    })
                    .catch(e => {
                        // eslint-disable-next-line no-console
                        console.log("API error: ", e)
                        draw.delete(ids)
                    })
                break
            }

            case "draw.update": {
                const payload = {
                    geometry: feature.geometry,
                }
                fetch(`/api/edit/features/${featureId}/update-geometry`, {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(payload),
                })
                break
            }

            case "draw.delete": {
                fetch(`/api/edit/features/${featureId}/delete`, {
                    method: "DELETE",
                })
                    .then(() => {
                        mutate(`/api/edit/projects/${projectId}/features`)
                    })
                break
            }

            default: {
                // eslint-disable-next-line no-console
                console.log(event.type, event.features)
                break
            }
        }
    }, [currentType, projectId, mutate])

    const draw = useDrawControl({
        id: "schema",
        onChange,
        position: "top-right",
        controls: {
            point: false,
            polygon: false,
            trash: false,
        },
        displayControlsDefault: false,
    })

    useEffect(() => {
        if (features) {
            const initialValue = dataToGeojson(features ?? [])
            draw.set(initialValue)
        }
    }, [features, draw])

    const openShift = open ? 530 : 0
    return (
        <Box className={s.container} style={{
            left: openShift,
        }}>
            <Center>
                <Toolbar
                    className={s.toolbar}
                    items={[
                        // {
                        //     name: "point",
                        //     icon: (
                        //         <IconPoint size={16} />
                        //     ),
                        // },
                        // {
                        //     name: "polygon",
                        //     icon: (
                        //         <IconPolygon size={16} />
                        //     ),
                        // },
                        {
                            name: "tree",
                            icon: (
                                <IconTree size={16} />
                            ),
                        },
                        {
                            name: "border",
                            icon: (
                                <IconMarquee2 size={16} />
                            ),
                        },
                        {
                            name: "lawn",
                            icon: (
                                <IconTallymark4 size={16} />
                            ),
                        },
                        {
                            name: "trash",
                            icon: (
                                <IconTrash size={16} />
                            ),
                        },
                    ]}
                    onClick={(name) => {
                        switch (name) {
                            case "point": {
                                setCurrentType(FeatureType.Unknown)
                                draw.changeMode("draw_point")
                                break
                            }
                            case "polygon": {
                                setCurrentType(FeatureType.Unknown)
                                draw.changeMode("draw_polygon")
                                break
                            }
                            case "trash": {
                                draw.trash()
                                break
                            }
                            case "tree": {
                                setCurrentType(FeatureType.Tree)
                                draw.changeMode("draw_point")
                                break
                            }
                            case "lawn": {
                                setCurrentType(FeatureType.Lawn)
                                draw.changeMode("draw_polygon")
                                break
                            }
                            case "border": {
                                setCurrentType(FeatureType.Border)
                                draw.changeMode("draw_polygon")
                                break
                            }
                        }
                    }}
                />
            </Center>
        </Box >
    )
}
