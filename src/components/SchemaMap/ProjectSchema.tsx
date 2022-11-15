import { useRouter } from "next/router"
import { useMap } from "react-map-gl"
import { memo, useEffect } from "react"
import { FeatureType } from "@prisma/client"

export const ProjectSchema: React.FC = memo(() => {
    const router = useRouter()
    const { schema } = useMap()
    const projectId = router.query.projectId as string

    useEffect(() => {
        const treesSource = "project-trees"
        const treesLayer = "project-trees-circle"

        const lawnSource = "project-lawn"
        const lawnLayer = "project-lawn-fill"
        const lawnLayer2 = "project-lawn-outline"

        const borderSource = "project-border"
        const borderLayer = "project-border-dash"
        
        if (!schema) {
            return
        }

        const map = schema.getMap()
        const init = () => {
            map.addSource(borderSource, {
                type: "geojson",
                data: `/api/projects/${projectId}/features?type=${FeatureType.Border}`,
            })
            map.addLayer({
                "id": borderLayer,
                "type": "line",
                "source": borderSource,
                "paint": {
                    "line-color": "#D00000",
                    "line-width": 3,
                    "line-dasharray": [2, 1],
                },
            })

            map.addSource(lawnSource, {
                type: "geojson",
                data: `/api/projects/${projectId}/features?type=${FeatureType.Lawn}`,
            })
            map.addLayer({
                "id": lawnLayer,
                "type": "fill",
                "source": lawnSource,
                "paint": {
                    "fill-color": "#0ED05D",
                    "fill-opacity": 0.25,
                },
            })
            map.addLayer({
                "id": lawnLayer2,
                "type": "line",
                "source": lawnSource,
                "paint": {
                    "line-color": "#00FC67",
                    "line-width": 3,
                },
            })

            map.addSource(treesSource, {
                type: "geojson",
                data: `/api/projects/${projectId}/features?type=${FeatureType.Tree}`,
            })
            map.addLayer({
                "id": treesLayer,
                "type": "circle",
                "source": treesSource,
                "paint": {
                    "circle-color": "#0ED05D",
                    "circle-radius": 7,
                    "circle-stroke-color": "#00FC67",
                    "circle-stroke-width": 3,
                },
            })

            // map.addLayer({
            //     "id": "border",
            //     "type": "line",
            //     "source": "project-polygons",
            //     "paint": {
            //         "line-color": "#ff0000",
            //         "line-width": 2,
            //     },
            //     "layout": {
            //         "line-join": "round",
            //         "line-cap": "round",
            //     },
            // })
        }

        if (map.isStyleLoaded()) {
            init()
        } else {
            map.on("load", init)
        }

        return () => {
            map.off("load", init)

            try {
                map.removeLayer(borderLayer)
                map.removeSource(borderSource)

                map.removeLayer(treesLayer)
                map.removeSource(treesSource)

                map.removeLayer(lawnLayer)
                map.removeLayer(lawnLayer2)
                map.removeSource(lawnSource)
            } catch (error) {

            }
        }
    }, [schema, projectId])

    return null
})

ProjectSchema.displayName = "ProjectSchema"
