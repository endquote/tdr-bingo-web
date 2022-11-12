// @refresh reset
import { Map, View } from "ol";
import { Coordinate } from "ol/coordinate";
import TileLayer from "ol/layer/Tile";
import "ol/ol.css";
import Zoomify from "ol/source/Zoomify";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  onMapClick?: (coord: Coordinate) => void;
};

export const Pyramid = ({ onMapClick }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null!);

  const mapSize = useMemo(() => {
    return { w: 83512, h: 115478 };
  }, []);

  const layer = useMemo(() => {
    return new TileLayer({
      source: new Zoomify({
        tileSize: 256,
        tilePixelRatio: 1,
        url: `/zoomify/img/`,
        size: [mapSize.w, mapSize.h],
        crossOrigin: "anonymous",
      }),
    });
  }, [mapSize]);

  const extent = useMemo(() => {
    return layer.getSource()?.getTileGrid()?.getExtent();
  }, [layer]);

  const resolutions = useMemo(() => {
    return layer.getSource()!.getTileGrid()!.getResolutions();
  }, [layer]);

  const [ol, setOl] = useState<Map>();

  useEffect(() => {
    console.log("map setup");

    const ol = new Map({
      layers: [layer],
      view: new View({
        resolutions,
        extent,
        constrainOnlyCenter: true,
        enableRotation: false,
      }),
    });

    setOl(ol);

    ol.setTarget(mapRef.current);
    ol.getView().fit(extent!);

    const ref = mapRef.current;
    return () => {
      console.log("map cleanup");
      setOl(undefined);
      ref.innerHTML = "";
    };
  }, [extent, layer, mapRef, resolutions]);

  function onClick(e: MouseEvent<HTMLDivElement>) {
    if (!onMapClick || !ol) {
      return;
    }
    const px = ol.getEventPixel(e as unknown as UIEvent);
    if (!px) {
      return;
    }
    const coord = ol.getCoordinateFromPixel(px);
    if (!coord) {
      return;
    }
    coord[1] *= -1;
    onMapClick(coord);
  }

  return (
    <>
      <div onClick={onClick} style={{ display: "flex", flex: 1 }}>
        <div ref={mapRef} style={{ display: "flex", flex: 1 }}></div>
      </div>
    </>
  );
};

export default Pyramid;
