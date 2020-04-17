import "./layout.scss";

import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useSelector, useDispatch } from "react-redux";
import useResizeAware from "react-resize-aware";
import { useLocation } from "react-router";

import ErrorBoundary from "../components/ErrorBoundary";
import { Toaster } from "../components/Toaster";
import { IApplicationState } from "../store";
import { LayoutActions } from "../store/LayoutActions";
import PageMenu from "./PageMenu";
import Sidenav from "./Sidenav";
import SidenavToggle from "./SidenavToggle";

const ConnectedLayout: React.FC<any> = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [resizeListener, sizes] = useResizeAware();
    const layoutState = useSelector((state: IApplicationState) => state.layout);

    useEffect(() => {
        dispatch(LayoutActions.ViewPortChange(sizes));
    }, [dispatch, sizes]);

    useEffect(() => {
        dispatch(LayoutActions.RouteChange(location.pathname));
        dispatch(LayoutActions.EvaluateSidenav());
    }, [dispatch, location.pathname]);

    return (
        <div className="wrapper">
            <Sidenav isOpen={layoutState.sideNavOpen}></Sidenav>
            <div id="content" className={layoutState.sideNavOpen ? "" : " active"}>
                <Navbar collapseOnSelect expand="lg" bg="secondary" variant="light" sticky="top">
                    <SidenavToggle />
                    <Navbar.Brand className="ml-2 mpga" href="/home">
                        MPGA
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    {layoutState.subMenu && <PageMenu subMenu={layoutState.subMenu} segments={layoutState.segments} />}
                </Navbar>
                <div id="page">
                    {resizeListener}
                    <Toaster />
                    <ErrorBoundary>{props.children}</ErrorBoundary>
                </div>
            </div>
        </div>
    );
};

export default ConnectedLayout;
