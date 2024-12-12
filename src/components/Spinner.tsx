import { ImSpinner } from "react-icons/im";
import styled, { keyframes } from "styled-components";

import { rgba } from "../utilities/rgba";

const Loader = styled.div`
  position: absolute;
  margin: auto;
  width: 3rem;
  height: 3rem;
  font-size: 3rem;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #6f42c1;
  z-index: 10;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${rgba("#ffffff", 0.5)};
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled(ImSpinner)`
  animation: ${spin} 1s linear infinite;
`;
Spinner.defaultProps = {
  "aria-label": "loading",
};

export function OverlaySpinner(props) {
  const { loading } = props;
  if (loading) {
    return (
      <Overlay>
        <Loader>
          <Spinner />
        </Loader>
      </Overlay>
    );
  }
  return null;
}
