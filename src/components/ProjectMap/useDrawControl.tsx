import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"

import MapboxDraw from "@mapbox/mapbox-gl-draw"
import { useControl, useMap } from "react-map-gl"
import type { ControlPosition } from "react-map-gl"
import { useCallback, useEffect } from "react"

// eslint-disable-next-line no-unused-vars
type Handler = (ev: any) => void

// eslint-disable-next-line no-unused-vars
export type OnChangeDraw = (event: { features: GeoJSON.Feature[]; type: string }, draw: MapboxDraw) => void

export type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
    position?: ControlPosition
    onChange?: OnChangeDraw
};

export function useDrawControl({ onChange, ...props }: DrawControlProps): MapboxDraw {
    const { current: map } = useMap()
    const draw = useControl<MapboxDraw>(
        () => new MapboxDraw(props),
        {
            position: props.position,
        }
    )

    const handler = useCallback<Handler>(event => {
        if (typeof onChange === "function") {
            onChange(event, draw)
        }
    }, [onChange, draw])

    useEffect(() => {
        if (!map) {
            return
        }

        map.on("draw.create", handler)
        map.on("draw.update", handler)
        map.on("draw.delete", handler)

        return () => {
            map.off("draw.create", handler)
            map.off("draw.update", handler)
            map.off("draw.delete", handler)
        }
    }, [map, handler, draw])

    return draw
}
