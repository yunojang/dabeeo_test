import styled from "styled-components";

import color from "./constant/color";
import Map from "./Components/Map";

function App() {
  return (
    <Coantainer>
      <div className="content">
        <Title>Map</Title>
        <Map />
      </div>
    </Coantainer>
  );
}

export default App;

const Coantainer = styled.main`
  .content {
    max-width: 1024px;
    margin: auto;
    padding: 20px 0;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: normal;
  color: ${color.main};
`;
