import React, { useState } from "react";
import styled from "styled-components";

import mapImg from "./img/map.png";

const INIT_POS = { x: 0, y: 0 };

function Map() {
  const [pos, setPos] = useState(INIT_POS);

  const move = (e) => {
    const { movementX, movementY } = e;

    setPos(({ x, y }) => ({ x: x + movementX, y: y + movementY }));
  };

  const onMouseDown = () => {
    const endDrag = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", endDrag);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", endDrag);
  };

  return (
    <Container pos={pos} onMouseDown={onMouseDown}>
      <img
        src={mapImg}
        alt="map"
        style={{
          left: pos.x,
          top: pos.y,
        }}
        draggable="false"
      />
    </Container>
  );
}

export default Map;

const Container = styled.div`
  position: relative;
  width: 1024px;
  height: 768px;
  overflow: hidden;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  img {
    position: absolute;
  }
`;
