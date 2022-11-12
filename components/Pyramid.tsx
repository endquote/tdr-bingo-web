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

  const onChange = useCallback((e: ObjectEvent) => {
    const view = e.target as View;
    const [width, height] = e.target.viewportSize_;
    const center = view.getCenter();
    const resolution = view.getResolution();
    const zoom = view.getZoom();
    const extent = view.calculateExtent();
    console.log({
      type: e.type,
      width,
      height,
      center,
      resolution,
      zoom,
      extent,
    });

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
    (e: MapBrowserEvent<PointerEvent>) => onMapClick?.(e.coordinate),
    [onMapClick]
  );

  useEffect(() => {
    const source = new Zoomify({
      url: `/zoomify/img/`,
      size: [mapSize.w, mapSize.h],
    });

    const grid = source.getTileGrid()!;
    const extent = grid.getExtent();
    const view = new View({
      resolutions: grid.getResolutions(),
      extent: extent,
      constrainOnlyCenter: true,
      enableRotation: false,
    });

    const ol = new Map({ layers: [new TileLayer({ source })], view });

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
  }, [mapRef, mapSize.h, mapSize.w, onChange, onClick]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div ref={mapRef} style={{ display: "flex", flex: 1 }}></div>
    </div>
  );
};

export default Pyramid;
