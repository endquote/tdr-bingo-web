import { Map, MapBrowserEvent, View } from "ol";
import { Coordinate } from "ol/coordinate";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import Zoomify from "ol/source/Zoomify";
import { useCallback, useEffect, useMemo, useRef } from "react";

type Props = {
  onMapClick?: (coord: Coordinate) => void;
};

export const Pyramid = ({ onMapClick }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null!);

  const mapSize = useMemo(() => ({ w: 83512, h: 115478 }), []);

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
      enableRotation: false,
      showFullExtent: true,
    });

    const ol = new Map({ layers: [new TileLayer({ source })], view });

    ol.setTarget(mapRef.current);
    view.fit(extent);
    ol.on("click", onClick);

    const ref = mapRef.current;
    return () => {
      ref.innerHTML = "";
      ol.un("click", onClick);
    };
  }, [mapRef, mapSize, onClick]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div ref={mapRef} style={{ display: "flex", flex: 1 }}></div>
    </div>
  );
};

export default Pyramid;
