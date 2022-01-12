import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-toastify/dist/ReactToastify.css";
import "./layout.scss";

import { useEffect } from "react";

import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import useResizeAware from "react-resize-aware";
import { Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";

import ErrorBoundary from "../components/ErrorBoundary";
import { IApplicationState } from "../store";
import { LayoutActions } from "../store/LayoutActions";
import PageMenu from "./PageMenu";
import Sidenav from "./Sidenav";
import SidenavToggle from "./SidenavToggle";

export default function Layout() {
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
          <ToastContainer autoClose={3000} hideProgressBar={true} newestOnTop={true} />
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}
