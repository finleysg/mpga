import React, { useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Sidenav from './Sidenav';
import SidenavToggle from './SidenavToggle';
import { connect } from 'react-redux';
import { IApplicationState } from '../store';
import { actionCreators } from '../store/LayoutStore';
import { useLocation } from 'react-router';
import './layout.scss';
import { PageMenu } from './PageMenu';

export interface ILayoutProps {
  showSidenav: boolean;
  subMenu: string;
  ToggleSidenav: (showSidenav: boolean) => void;
  RouteChange: (path: string) => void;
}

const mapStateToProps = (state: IApplicationState) => ({
  showSidenav: state.layout.sideNavOpen,
  subMenu: state.layout.subMenu,
});

export const Layout: React.FC<ILayoutProps> = (props) => {

  let location = useLocation();

  useEffect(
    () => {
      props.RouteChange(location.pathname);
    },
    [location]
  );

  return (
    <div className="wrapper">
      <Sidenav isOpen={props.showSidenav}></Sidenav>
      <div id="content" className={props.showSidenav ? "" : " active"}>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="light" sticky="top">
          <SidenavToggle {...props} />
          <Navbar.Brand className="ml-2 mpga" href="/home">MPGA.net</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {props.subMenu &&
            <PageMenu subMenu={props.subMenu} />
          }
        </Navbar>
        <div id="page">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export const ConnectedLayout = connect(mapStateToProps, { ...actionCreators })(Layout);
