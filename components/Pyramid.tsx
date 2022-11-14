import { Map, MapBrowserEvent, View } from "ol";
import { Coordinate } from "ol/coordinate";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import { Size } from "ol/size";
import Zoomify from "ol/source/Zoomify";
import { useCallback, useEffect, useMemo, useRef } from "react";

type Props = {
  onMapClick?: (coord: Coordinate) => void;
};

export const Pyramid = ({ onMapClick }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null!);

  const mapSize = useMemo<Size>(() => [83512, 115478], []);

  const tileSize = useMemo<Size>(
    () => [mapSize[0] / 22, mapSize[1] / 22],
    [mapSize]
  );

  // tell listeners which grid cell was clicked
  const onClick = useCallback(
    (e: MapBrowserEvent<PointerEvent>) => {
      const [x, y] = e.coordinate;
      const [w, h] = mapSize;

      if (x < 0 || x > w) {
        return;
      }

      if (y > 0 || y < -h) {
        return;
      }

      const [tw, th] = tileSize;
      const tx = Math.floor(x / tw) + 1;
      const ty = Math.floor(Math.abs(y) / th) + 1;

      onMapClick?.([tx, ty]);
    },
    [mapSize, onMapClick, tileSize]
  );

  useEffect(() => {
    const source = new Zoomify({ url: `/zoomify/img/`, size: mapSize });
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
};;;

export default Pyramid;
