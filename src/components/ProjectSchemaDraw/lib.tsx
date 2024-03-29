import { EditFeatureDto } from "@/common/types"
import { feature, featureCollection } from "@turf/helpers"

export function dataToGeojson(data: EditFeatureDto[]): GeoJSON.FeatureCollection {
    const xs = data.map(x => {
        const geometry = {
            coordinates: x.coordinates,
            type: x.geometryType,
        }
        const properties = { title: x.title, description: x.description }
        const f = feature(geometry, properties) as unknown as GeoJSON.Feature
        f.id = x.id

        return f
    })

    return featureCollection(xs)
}
