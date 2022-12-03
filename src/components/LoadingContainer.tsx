import React from "react";

import { OverlaySpinner } from "./Spinner";

type LoadingContainerProps = {
  loading: boolean;
  hide?: boolean;
};

const LoadingContainer: React.FC<LoadingContainerProps> = (props) => {
  const showComponent = props.hide === true;
  if (!showComponent) {
    return (
      <div style={{ position: "relative" }}>
        <OverlaySpinner loading={props.loading} />
        {props.children}
      </div>
    );
  } else {
    return null;
  }
};

export default LoadingContainer;
