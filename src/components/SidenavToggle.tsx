import React from 'react';
import Button from 'react-bootstrap/Button';
import { ILayoutProps } from '../layout/Layout';

const SidenavToggle: React.FC<ILayoutProps> = (props) => {
    return (
        <Button variant="primary" id="sidebarCollapse" className={(props.showSidenav ? "" : " active")}
            onClick={() => props.ToggleSidenav(!props.showSidenav)}>
            <span></span>
            <span></span>
            <span></span>
        </Button>
    );
}

export default SidenavToggle;
