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

        const bushSource = "project-bushes"
        const bushLayer = "project-bushes-circle"

        const lawnSource = "project-lawn"
        const lawnLayer = "project-lawn-fill"
        const lawnLayer2 = "project-lawn-outline"

        const flowersSource = "project-flowers"
        const flowersLayer = "project-flowers-fill"
        const flowersLayer2 = "project-flowers-outline"

        const gardenbedSource = "project-gardenbed"
        const gardenbedLayer = "project-gardenbed-fill"
        const gardenbedLayer2 = "project-gardenbed-outline"

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

            map.addSource(flowersSource, {
                type: "geojson",
                data: `/api/projects/${projectId}/features?type=${FeatureType.Flowers}`,
            })
            map.addLayer({
                "id": flowersLayer,
                "type": "fill",
                "source": flowersSource,
                "paint": {
                    "fill-color": "#0E0E0E",
                    "fill-opacity": 0.25,
                },
            })
            map.addLayer({
                "id": flowersLayer2,
                "type": "line",
                "source": flowersSource,
                "paint": {
                    "line-color": "#00FC67",
                    "line-width": 3,
                },
            })

            map.addSource(gardenbedSource, {
                type: "geojson",
                data: `/api/projects/${projectId}/features?type=${FeatureType.GardenBed}`,
            })
            map.addLayer({
                "id": gardenbedLayer,
                "type": "fill",
                "source": gardenbedSource,
                "paint": {
                    "fill-color": "#D00E5D",
                    "fill-opacity": 0.25,
                },
            })
            map.addLayer({
                "id": gardenbedLayer2,
                "type": "line",
                "source": gardenbedSource,
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

            map.addSource(bushSource, {
                type: "geojson",
                data: `/api/projects/${projectId}/features?type=${FeatureType.Bush}`,
            })
            map.addLayer({
                "id": bushLayer,
                "type": "circle",
                "source": bushSource,
                "paint": {
                    "circle-color": "#D05D0E",
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

                map.removeLayer(bushLayer)
                map.removeSource(bushSource)

                map.removeLayer(lawnLayer)
                map.removeLayer(lawnLayer2)
                map.removeSource(lawnSource)

                map.removeLayer(flowersLayer)
                map.removeLayer(flowersLayer2)
                map.removeSource(flowersSource)

                map.removeLayer(gardenbedLayer)
                map.removeLayer(gardenbedLayer2)
                map.removeSource(gardenbedSource)
            } catch (error) {

            }
        }
    }, [schema, projectId])

    return null
})

ProjectSchema.displayName = "ProjectSchema"
