import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useControl } from 'react-map-gl'
import type { ControlPosition } from 'react-map-gl'

type Feature = any
type Callback = (ev: any) => void

export type OnChangeDraw = (evt: { features: Feature[]; type: string }) => void

export type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
    position?: ControlPosition
    onChange?: OnChangeDraw
};

export const DrawControl: React.FC<DrawControlProps> = props => {
    useControl<MapboxDraw>(
        ({ map }) => {
            map.on('draw.create', props.onChange as Callback)
            map.on('draw.update', props.onChange as Callback)
            map.on('draw.delete', props.onChange as Callback)

            return new MapboxDraw(props)
        },
        ({ map }) => {
            map.off('draw.create', props.onChange as Callback)
            map.off('draw.update', props.onChange as Callback)
            map.off('draw.delete', props.onChange as Callback)
        },
        {
            position: props.position,
        }
    )

    return null
}
