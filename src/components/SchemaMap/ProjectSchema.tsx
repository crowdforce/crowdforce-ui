import { useRouter } from "next/router"
import { useMap } from "react-map-gl"
import { memo, useEffect } from "react"
import { FeatureType } from "@prisma/client"
import mapboxgl from "mapbox-gl"

type MapImage = {
  name: string,
  url: string
}

async function loadImages(map: mapboxgl.Map, images: MapImage[]): Promise<void> {
  for (const { name, url } of images) {
    map.loadImage(url, (err, image) => {
      if (!image) {
        return
      }
      map.addImage(name, image)
    })
  }
}

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
    const lawnLayerPattern = "project-lawn-fill"
    const lawnLayerOutline = "project-lawn-outline"
    const lawnLayerLine = "project-lawn-line"

    const flowersSource = "project-flowers"
    const flowersLayer = "project-flowers-fill"
    const flowersLayer2 = "project-flowers-outline"

    const gardenbedSource = "project-gardenbed"
    const gardenbedLayer = "project-gardenbed-fill"
    const gardenbedLayer2 = "project-gardenbed-outline"

    const borderSource = "project-border"
    const borderLayerDash = "project-border-dash"
    const borderLayerOutline = "project-border-outline"

    if (!schema) {
      return
    }

    const map = schema.getMap()
    // Load an image to use as the pattern from an external URL.
    const init = async () => {
      await loadImages(map, [
        { name: 'icon-tree', url: '/assets/map/icon-tree.png' },
        { name: 'icon-bush', url: '/assets/map/icon-bush.png' },
        { name: 'icon-unknown', url: '/assets/map/icon-unknown.png' },
        { name: 'pattern-lawn', url: '/assets/map/pattern-lawn.png' },
      ])
      map.addSource(borderSource, {
        type: "geojson",
        data: `/api/projects/${projectId}/features?type=${FeatureType.Border}`,
      })
      map.addLayer({
        "id": borderLayerOutline,
        "type": "line",
        "source": borderSource,
        "paint": {
          "line-color": "#FFFFFF",
          "line-width": 5,
        },
      })
      // map.addLayer({
      //   'id': borderLayerDash,
      //   'type': 'fill',
      //   'source': borderSource,
      //   'paint': {
      //     'fill-pattern': 'pattern'
      //   }
      // });
      map.addLayer({
        "id": borderLayerDash,
        "type": "line",
        "source": borderSource,
        "paint": {
          "line-color": "#D00000",
          "line-width": 2,
          "line-dasharray": [3, 1],
        },
      })

      map.addSource(lawnSource, {
        type: "geojson",
        data: `/api/projects/${projectId}/features?type=${FeatureType.Lawn}`,
      })
      map.addLayer({
        'id': lawnLayerPattern,
        'type': 'fill',
        'source': lawnSource,
        'paint': {
          'fill-pattern': 'pattern-lawn',
        }
      });
      map.addLayer({
        "id": lawnLayerOutline,
        "type": "line",
        "source": lawnSource,
        "paint": {
          "line-color": "#FFFFFF",
          "line-width": 3,
        },
      })
      map.addLayer({
        "id": lawnLayerLine,
        "type": "line",
        "source": lawnSource,
        "paint": {
          "line-color": "#289F66",
          "line-width": 1,
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
        id: treesLayer,
        source: treesSource,
        type: "symbol",
        layout: {
          "icon-image": "icon-tree",
          "icon-size": 0.4,
        }
      })

      map.addSource(bushSource, {
        type: "geojson",
        data: `/api/projects/${projectId}/features?type=${FeatureType.Bush}`,
      })
      map.addLayer({
        id: bushLayer,
        source: bushSource,
        type: "symbol",
        layout: {
          "icon-image": "icon-bush",
          "icon-size": 0.4,
        }
      })
      // map.addLayer({
      //   "id": bushLayer,
      //   "type": "circle",
      //   "source": bushSource,
      //   "paint": {
      //     "circle-color": "#D05D0E",
      //     "circle-radius": 7,
      //     "circle-stroke-color": "#00FC67",
      //     "circle-stroke-width": 3,
      //   },
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
        map.removeLayer(borderLayerDash)
        map.removeLayer(borderLayerOutline)
        map.removeSource(borderSource)

        map.removeLayer(treesLayer)
        map.removeSource(treesSource)

        map.removeLayer(bushLayer)
        map.removeSource(bushSource)

        map.removeLayer(lawnLayerPattern)
        map.removeLayer(lawnLayerOutline)
        map.removeLayer(lawnLayerLine)
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
