import { useRouter } from "next/router"
import { useMap } from "react-map-gl"
import { memo, useEffect } from "react"

export const ProjectSchema: React.FC = memo(() => {
    const router = useRouter()
    const { schema } = useMap()
    const projectId = router.query.projectId as string

    useEffect(() => {
        if (!schema) {
            return
        }

        const map = schema.getMap()
        const init = () => {
            map.addSource("project-polygons", {
                type: "geojson",
                // Use a URL for the value for the `data` property.
                // data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",

                data: `/api/projects/${projectId}/features?type=Polygon`,
            })

            map.addLayer({
                "id": "border",
                "type": "line",
                "source": "project-polygons",
                "paint": {
                    "line-color": "#ff0000",
                    "line-width": 2,
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round",
                },
            })
        }

        if (map.loaded()) {
            init()
        } else {
            map.on("load", init)
        }

        return () => {
            map.off("load", init)
            map.removeLayer("border")
            map.removeSource("project-polygons")
        }
    }, [schema, projectId])

    return null
})

ProjectSchema.displayName = "ProjectSchema"
