import React from "react";

import { OverlaySpinner } from "./Spinner";

type LoadingContainerProps = {
  loading: boolean;
};

const LoadingContainer: React.FC<LoadingContainerProps> = (props) => {
  return (
    <div style={{ position: "relative" }}>
      <OverlaySpinner loading={props.loading} />
      {props.children}
    </div>
  );
};

export default LoadingContainer;
