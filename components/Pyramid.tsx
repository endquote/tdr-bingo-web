import { Map, MapBrowserEvent, View } from "ol";
import { Coordinate } from "ol/coordinate";
import { easeOut } from "ol/easing";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import { Size } from "ol/size";
import Zoomify from "ol/source/Zoomify";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  onMapClick?: (coord: Coordinate) => void;
  col?: number;
  row?: number;
};

// add a prop to pyramid to tell it what to focus on instead of the click
// maintain focus on resize
// clear selection on move
// arrow keys to navigate?
// styling -- pull colors and fonts from main site

export const Pyramid = ({ onMapClick, col, row }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null!);

  const mapSize = useMemo<Size>(() => [83512, 115478], []);

  const tileSize = useMemo<Size>(
    () => [mapSize[0] / 22, mapSize[1] / 22],
    [mapSize]
  );

  const [map, setMap] = useState<Map>();

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
    },
    [mapSize, onMapClick, tileSize]
  );

  useEffect(() => {
    const source = new Zoomify({ url: `/zoomify/img/`, size: mapSize });
    const grid = source.getTileGrid()!;

    // add a buffer of one tile all the way around
    let extent = grid.getExtent();
    let [minX, minY, maxX, maxY] = extent;
    const [tileW, tileH] = tileSize;
    minX -= tileW;
    minY -= tileH;
    maxX += tileW;
    maxY += tileH;
    extent = [minX, minY, maxX, maxY];

    const view = new View({
      resolutions: grid.getResolutions(),
      extent: extent,
      enableRotation: false,
      showFullExtent: true,
    });

    const map = new Map({ layers: [new TileLayer({ source })], view });

    map.setTarget(mapRef.current);
    view.fit(extent);
    map.on("click", onClick);

    setMap(() => map);

    const ref = mapRef.current;
    return () => {
      ref.innerHTML = "";
      map.un("click", onClick);
      setMap(undefined);
    };
  }, [mapRef, mapSize, onClick, tileSize]);

  useEffect(() => {
    if (!col || !row || !map) {
      return;
    }

    // compute the bounds of the tile
    const [tileW, tileH] = tileSize;
    let minX = col * tileW - tileW;
    let minY = -row * tileH;
    let maxX = minX + tileW;
    let maxY = minY + tileH;

    // make room for the overlay
    const [viewW, viewH] = map.getSize()!;
    // landscape
    let padding = [0, viewW / 3, 0, 0];
    if (viewH > viewW) {
      // portrait
      padding = [0, 0, viewH / 3, 0];
    }

    const view = map.getView();
    view.fit([minX, minY, maxX, maxY], {
      padding,
      duration: 200,
      easing: easeOut,
    });
  }, [col, map, row, tileSize]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div ref={mapRef} style={{ display: "flex", flex: 1 }}></div>
    </div>
  );
};

export default Pyramid;
