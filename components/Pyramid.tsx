import { Map, MapBrowserEvent, View } from "ol";
import { Coordinate } from "ol/coordinate";
import { easeOut } from "ol/easing";
import TileLayer from "ol/layer/Tile";
import { ObjectEvent } from "ol/Object";
import "ol/ol.css";
import { Size } from "ol/size";
import Zoomify from "ol/source/Zoomify";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  onMapClick?: (coord: Coordinate) => void;
  onMapChange?: () => void;
  col?: number;
  row?: number;
};

// arrow keys to navigate?
// styling -- pull colors and fonts from main site

export const Pyramid = ({ onMapClick, onMapChange, col, row }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null!);

  const mapSize = useRef<Size>([83512, 115478]);

  const tileSize = useRef<Size>([
    mapSize.current[0] / 22,
    mapSize.current[1] / 22,
  ]);

  const map = useRef<Map>();

  const [resize, setResize] = useState(false);

  // tell listeners which grid cell was clicked
  const onClick = useCallback(
    (e: MapBrowserEvent<PointerEvent>) => {
      const [clickX, clickY] = e.coordinate;
      const [mapW, mapH] = mapSize.current;

      if (clickX < 0 || clickX > mapW) {
        return;
      }

      if (clickY > 0 || clickY < -mapH) {
        return;
      }

      const [tileW, tileH] = tileSize.current;
      const tileX = Math.floor(clickX / tileW) + 1;
      const tileY = Math.floor(Math.abs(clickY) / tileH) + 1;

      onMapClick?.([tileX, tileY]);
    },
    [mapSize, onMapClick, tileSize]
  );

  // on resize, toggle the resize flag to force a re-focus
  const onResize = useCallback(() => {
    setResize((resize) => !resize);
  }, []);

  // on move/zoom, tell listeners about it
  const onChange = useCallback(
    (e: ObjectEvent) => {
      if (!onMapChange) {
        return;
      }
      const view = e.target as View;
      if (!view.getAnimating()) {
        onMapChange();
      }
    },
    [onMapChange]
  );

  // create the map at startup
  useEffect(() => {
    const source = new Zoomify({ url: `/zoomify/img/`, size: mapSize.current });
    const grid = source.getTileGrid()!;

    // add a buffer of one tile all the way around
    let extent = grid.getExtent();
    let [minX, minY, maxX, maxY] = extent;
    const [tileW, tileH] = tileSize.current;
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

    const ol = new Map({ layers: [new TileLayer({ source })], view });

    ol.setTarget(mapRef.current);
    view.fit(extent);

    ol.on("click", onClick);
    ol.on("change:size", onResize);
    view.on("change:center", onChange);
    view.on("change:resolution", onChange);

    map.current = ol;

    const ref = mapRef.current;
    return () => {
      ref.innerHTML = "";
      ol.un("click", onClick);
      ol.un("change:size", onResize);
      view.on("change:center", onChange);
      view.on("change:resolution", onChange);

      map.current = undefined;
    };
  }, [onChange, onClick, onResize]);

  // focus a token when the row/col/resize props change
  useEffect(() => {
    if (!col || !row || !map.current) {
      return;
    }

    // compute the bounds of the tile
    const [tileW, tileH] = tileSize.current;
    let minX = col * tileW - tileW;
    let minY = -row * tileH;
    let maxX = minX + tileW;
    let maxY = minY + tileH;

    // make room for the overlay
    const [viewW, viewH] = map.current.getSize()!;
    // landscape
    let padding = [0, viewW / 3, 0, 0];
    if (viewH > viewW) {
      // portrait
      padding = [0, 0, viewH / 3, 0];
    }

    const view = map.current.getView();
    view.fit([minX, minY, maxX, maxY], {
      padding,
      duration: 200,
      easing: easeOut,
    });
  }, [col, row, resize]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <div ref={mapRef} style={{ display: "flex", flex: 1 }}></div>
    </div>
  );
};

export default Pyramid;
