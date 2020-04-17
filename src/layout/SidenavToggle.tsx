import React from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../store';
import { LayoutActions } from "../store/LayoutActions";

const SidenavToggle: React.FC = () => {
    const dispatch = useDispatch();
    const layoutState = useSelector((state: IApplicationState) => state.layout);

    return (
        <Button variant="secondary" id="sidebarCollapse" className={(layoutState.sideNavOpen ? "" : " active")}
            onClick={() => dispatch(LayoutActions.ToggleSidenav())}>
            <span></span>
            <span></span>
            <span></span>
        </Button>
    );
}

export default SidenavToggle;
