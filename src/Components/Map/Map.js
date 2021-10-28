import React, { useRef, useState } from "react";
import styled from "styled-components";

import mapImg from "./img/map.png";
import { formatComputedSize } from "./utils/format";
import { getLimitValue } from "./utils/limit";

const INIT_POS = { x: 0, y: 0 };

function Map() {
  const [pos, setPos] = useState(INIT_POS);
  const viewport = useRef();
  const size = useRef({});

  const move = (e) => {
    const { movementX, movementY } = e;
    const computed = window.getComputedStyle(viewport.current);
    const viewWidth = formatComputedSize(computed.width);
    const viewHeight = formatComputedSize(computed.height);

    const { width, height } = size.current;

    setPos(({ x, y }) => ({
      x: getLimitValue(x - movementX, { max: width - viewWidth, min: 0 }),
      y: getLimitValue(y - movementY, { max: height - viewHeight, min: 0 }),
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
    <Container pos={pos} onMouseDown={onMouseDown} ref={viewport}>
      <img
        src={mapImg}
        alt="map"
        style={{
          left: -pos.x,
          top: -pos.y,
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
