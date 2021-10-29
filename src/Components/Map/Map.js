import React, { useRef, useState } from "react";
import styled from "styled-components";

import useArray from "hooks/useArray";
import { formatComputedSize } from "./utils/format";
import { getLimitValue } from "./utils/move";
import { VIEWPORT_SIZE } from "constant/size";

import mapImg from "./img/map.png";
import Marking from "./Marking";
import ResetButton from "./ResetButton";

const INIT_POS = { x: 0, y: 0 };

function Map() {
  const [pos, setPos] = useState(INIT_POS);
  const { state: marker, push: pushMarker, clear: clearMarker } = useArray([]);

  const size = useRef({});

  const move = (e) => {
    const { movementX, movementY } = e;
    const { width, height } = size.current;
    const maxPosX = width - VIEWPORT_SIZE.width;
    const maxPosY = height - VIEWPORT_SIZE.height;

    setPos((pos) => ({
      x: getLimitValue(pos.x - movementX, { max: maxPosX, min: 0 }),
      y: getLimitValue(pos.y - movementY, { max: maxPosY, min: 0 }),
    }));
  };

  const onMouseDown = (e) => {
    const endDrag = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", endDrag);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", endDrag);
  };

  const onLoad = (e) => {
    const { width, height } = window.getComputedStyle(e.target);

    size.current = {
      width: formatComputedSize(width),
      height: formatComputedSize(height),
    };
  };

  const onMarking = (e) => {
    e.preventDefault();

    if (!e.target.dataset.addMarker) {
      return;
    }

    const { offsetX, offsetY } = e.nativeEvent;

    pushMarker({ x: offsetX, y: offsetY });
  };

  return (
    <ViewPort onMouseDown={onMouseDown}>
      <MapContainer
        style={{
          transform: `translate(${-pos.x}px, ${-pos.y}px)`,
        }}
        onContextMenu={onMarking}
      >
        <img
          src={mapImg}
          alt="map"
          onLoad={onLoad}
          draggable="false"
          data-add-marker
        />

        <Marking marker={marker} />
      </MapContainer>

      <ResetButton onClick={clearMarker} />
    </ViewPort>
  );
}

export default Map;

const ViewPort = styled.div`
  position: relative;
  width: ${VIEWPORT_SIZE.width}px;
  height: ${VIEWPORT_SIZE.height}px;
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const MapContainer = styled.div`
  position: relative;
  display: inline-block;
`;
