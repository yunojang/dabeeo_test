import React from "react";
import styled from "styled-components";

import reset from "./img/reset.png";

function ResetButton(props) {
  return (
    <Button {...props}>
      <img src={reset} alt="reset" />
    </Button>
  );
}

export default ResetButton;

const Button = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
`;
