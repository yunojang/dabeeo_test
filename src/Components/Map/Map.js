import React, { useRef, useState } from "react";
import styled from "styled-components";

import { formatComputedSize } from "./utils/format";
import { getLimitValue } from "./utils/move";
import { VIEWPORT_SIZE } from "constant/size";

import mapImg from "./img/map.png";

const INIT_POS = { x: 0, y: 0 };

function Map() {
  const [pos, setPos] = useState(INIT_POS);
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

  const onMouseDown = () => {
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

  return (
    <Container pos={pos} onMouseDown={onMouseDown}>
      <img
        src={mapImg}
        alt="map"
        style={{
          transform: `translate(${-pos.x}px, ${-pos.y}px)`,
        }}
        onLoad={onLoad}
        draggable="false"
      />
    </Container>
  );
}

export default Map;

const Container = styled.div`
  position: relative;
  width: ${VIEWPORT_SIZE.width}px;
  height: ${VIEWPORT_SIZE.height}px;
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  img {
    position: absolute;
  }
`;
