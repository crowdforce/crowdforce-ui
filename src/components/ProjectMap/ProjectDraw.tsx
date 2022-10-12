import { useCallback, useEffect } from "react"
import { OnChangeDraw } from "./useDrawControl"
import { useSWRConfig } from "swr"
import { useDrawControl } from "./useDrawControl"

export type ProjectDrawProps = {
    projectId: string
    initialValue?: GeoJSON.FeatureCollection
}

export const ProjectDraw: React.FC<ProjectDrawProps> = ({ initialValue, projectId }) => {
    const { mutate } = useSWRConfig()
    const onChange = useCallback<OnChangeDraw>(async (event, draw) => {
        const feature = event.features[0]
        const featureId = feature.id! as string
        const ids = event.features.map(x => x.id) as string[]

        switch (event.type) {
            case "draw.create": {
                const payload = {
                    geometry: feature.geometry,
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
    }, [projectId, mutate])

    const draw = useDrawControl({
        onChange,
        position: "top-left",
        controls: {
            point: true,
            polygon: true,
            trash: true,
        },
        displayControlsDefault: false,
    })

    useEffect(() => {
        if (initialValue) {
            draw.set(initialValue)
        }
    }, [initialValue, draw])

    return null
}
