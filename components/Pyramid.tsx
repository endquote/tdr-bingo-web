import { Map, MapBrowserEvent, View } from "ol";
import { Coordinate } from "ol/coordinate";
import { easeOut } from "ol/easing";
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
      const [clickX, clickY] = e.coordinate;
      const [mapW, mapH] = mapSize;

      if (clickX < 0 || clickX > mapW) {
        return;
      }

      if (clickY > 0 || clickY < -mapH) {
        return;
      }

      const [tileW, tileH] = tileSize;
      const tileX = Math.floor(clickX / tileW) + 1;
      const tileY = Math.floor(Math.abs(clickY) / tileH) + 1;

      onMapClick?.([tileX, tileY]);

      const map = e.target as Map;
      const view = map.getView();
      const [viewW, viewH] = map.getSize()!;

      // compute the bounds of the tile
      let minX = tileX * tileW - tileW;
      let minY = -tileY * tileH;
      let maxX = minX + tileW;
      let maxY = minY + tileH;

      // make room for the overlay
      let padding = [0, viewW / 3, 0, 0];
      if (viewH > viewW) {
        padding = [0, 0, viewH / 3, 0];
      }

      view.fit([minX, minY, maxX, maxY], {
        padding,
        duration: 200,
        easing: easeOut,
      });
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
      // showFullExtent: true,
      constrainOnlyCenter: true,
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
