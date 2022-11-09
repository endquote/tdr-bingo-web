// @refresh reset
/* eslint-disable @next/next/no-css-tags */
import { Map, View } from "ol";
import { Coordinate } from "ol/coordinate";
import TileLayer from "ol/layer/Tile";
import Zoomify from "ol/source/Zoomify";
import { MouseEvent, useEffect, useRef } from "react";
const mapSize = { w: 83512, h: 115478 };

const layer = new TileLayer({
  source: new Zoomify({
    tileSize: 256,
    tilePixelRatio: 1,
    url: `/zoomify/img/`,
    size: [mapSize.w, mapSize.h],
    crossOrigin: "anonymous",
  }),
});

const extent = layer.getSource()?.getTileGrid()?.getExtent();

const resolutions = layer.getSource()!.getTileGrid()!.getResolutions();

// limit min zoom https://openlayers.org/en/latest/examples/min-zoom.html
const ol = new Map({
  layers: [layer],
  view: new View({
    resolutions,
    extent,
    constrainOnlyCenter: true,
    enableRotation: false,
  }),
});

type Props = {
  onMapClick?: (coord: Coordinate) => void;
};

export const Pyramid = ({ onMapClick }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    ol.setTarget(mapRef.current);
    ol.getView().fit(extent!);
  }, [mapRef]);

  function onClick(e: MouseEvent<HTMLDivElement>) {
    if (!onMapClick) {
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
      <link rel="stylesheet" href="/ol.css" />
      <div onClick={onClick} style={{ display: "flex", flex: 1 }}>
        <div ref={mapRef} style={{ display: "flex", flex: 1 }}></div>
      </div>
    </>
  );
};

export default Pyramid;
