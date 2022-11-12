// @refresh reset
import { Map, MapBrowserEvent, View } from "ol";
import { Coordinate } from "ol/coordinate";
import TileLayer from "ol/layer/Tile";
import { ObjectEvent } from "ol/Object";
import "ol/ol.css";
import Zoomify from "ol/source/Zoomify";
import { useCallback, useEffect, useMemo, useRef } from "react";

type Props = {
  onMapClick?: (coord: Coordinate) => void;
};

export const Pyramid = ({ onMapClick }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null!);

  const mapSize = useMemo(() => ({ w: 83512, h: 115478 }), []);

  const layer = useMemo(
    () =>
      new TileLayer({
        source: new Zoomify({
          tileSize: 256,
          tilePixelRatio: 1,
          url: `/zoomify/img/`,
          size: [mapSize.w, mapSize.h],
          crossOrigin: "anonymous",
        }),
      }),
    [mapSize]
  );

  const extent = useMemo(
    () => layer.getSource()?.getTileGrid()?.getExtent()!,
    [layer]
  );

  const resolutions = useMemo(
    () => layer.getSource()?.getTileGrid()?.getResolutions()!,
    [layer]
  );

  const view = useMemo(
    () =>
      new View({
        resolutions,
        extent,
        constrainOnlyCenter: true,
        enableRotation: false,
      }),
    [extent, resolutions]
  );

  const onChange = useCallback((e: ObjectEvent) => {
    const view = e.target as View;
    const [width, height] = e.target.viewportSize_;
    const center = view.getCenter();
    const resolution = view.getResolution();
    const zoom = view.getZoom();
    console.log({ type: e.type, width, height, center, resolution, zoom });

    const outOfBounds = false;
    if (outOfBounds) {
      if (e.type === "change:center") {
        view.un("change:center", onChange);
        view.setCenter(e.oldValue);
        view.on("change:center", onChange);
      }
      if (e.type === "change:resolution") {
        view.un("change:resolution", onChange);
        view.setResolution(e.oldValue);
        view.on("change:resolution", onChange);
      }
    }
  }, []);

  const onClick = useCallback(
    (e: MapBrowserEvent<PointerEvent>) => {
      onMapClick?.(e.coordinate);
    },
    [onMapClick]
  );

  useEffect(() => {
    const ol = new Map({ layers: [layer], view });
    ol.setTarget(mapRef.current);
    view.fit(extent);
    view.on("change:center", onChange);
    view.on("change:resolution", onChange);
    ol.on("click", onClick);

    const ref = mapRef.current;
    return () => {
      ref.innerHTML = "";
      view.un("change:center", onChange);
      view.un("change:resolution", onChange);
      ol.un("click", onClick);
    };
  }, [extent, layer, mapRef, onChange, onClick, resolutions, view]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div ref={mapRef} style={{ display: "flex", flex: 1 }}></div>
    </div>
  );
};

export default Pyramid;
