import React, { ReactNode, useEffect, useState } from "react";
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
            ToggleEdit={() => setDoEdit(!doEdit)}
            viewComponent={viewComponent}
            editComponent={editComponent}
        />
    );
};

export default WithEdit;
