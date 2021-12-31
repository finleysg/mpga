import React, { ForwardRefRenderFunction, ReactNode, useEffect, useImperativeHandle, useState } from "react";

import { useSelector } from "react-redux";

import { IApplicationState } from "../store";
import EditContainer from "./EditContainer";

export interface IWithEditProps {
  formName: string;
  initEdit: boolean;
  canEdit: boolean;
  viewComponent: ReactNode;
  editComponent: ReactNode;
  openIcon?: ReactNode;
}

const WithEdit: React.FC<IWithEditProps> = (props) => {
  const { canEdit, initEdit, formName, viewComponent, editComponent } = props;
  const [doEdit, setDoEdit] = useState(initEdit);
  const appState = useSelector((state: IApplicationState) => state.app);

  // Using the closedForms collection as a signal that there was a successful
  // async action that means we're done editting the current record.
  useEffect(() => {
    if (!initEdit && appState.closedForms.length > 0 && formName === appState.closedForms[0]) {
      setDoEdit(false);
    }
  }, [initEdit, formName, appState.closedForms]);

  return (
    <EditContainer
      doEdit={doEdit}
      canEdit={canEdit}
      onToggleEdit={() => setDoEdit(!doEdit)}
      viewComponent={viewComponent}
      editComponent={editComponent}
    />
  );
};

export type CloseHandle = {
  close: () => void;
};

export type WithEditProps = {
  initEdit: boolean;
  canEdit: boolean;
  viewComponent: ReactNode;
  editComponent: ReactNode;
  openIcon?: ReactNode;
  onClose?: () => void;
};

const CloseableEditFn: ForwardRefRenderFunction<CloseHandle, WithEditProps> = (props, ref) => {
  const { canEdit, initEdit, viewComponent, editComponent, onClose } = props;
  const [doEdit, setDoEdit] = useState(initEdit);

  useImperativeHandle(ref, () => ({
    close: () => setDoEdit(false),
  }));

  const handleEditToggle = () => {
    if (doEdit && onClose) {
      onClose();
    }
    setDoEdit(!doEdit);
  };

  return (
    <EditContainer
      doEdit={doEdit}
      canEdit={canEdit}
      onToggleEdit={handleEditToggle}
      viewComponent={viewComponent}
      editComponent={editComponent}
    />
  );
};

// Create a component from the forward function
export const CloseableEditContainer = React.forwardRef(CloseableEditFn);

export default WithEdit;
