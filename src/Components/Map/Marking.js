import React from "react";
import styled from "styled-components";

import markerIcon from "./img/marker.png";

function Marking({ marker }) {
  return (
    <div>
      {marker.map((pos, i) => (
        <Marker
          key={i}
          src={markerIcon}
          alt="marker"
          style={{ left: pos.x, top: pos.y }}
        />
      ))}
    </div>
  );
}

export default Marking;

const Marker = styled.img`
  position: absolute;
  width: 48px;
  transform: translate(-50%, -100%);
`;
