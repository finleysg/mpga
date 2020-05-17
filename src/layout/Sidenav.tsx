import React from "react";
import NavItem from "react-bootstrap/NavItem";
import { FaRegComment, FaRegFileExcel, FaRegFileWord } from "react-icons/fa";
import { MdGolfCourse, MdPeopleOutline } from "react-icons/md";
import { TiEdit, TiGroupOutline, TiInfoLargeOutline, TiKeyOutline, TiNews, TiPowerOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";

import { IApplicationState } from "../store";
import AppActions from "../store/AppActions";
import UserActions from "../store/UserActions";
import usePermissions from "../utilities/Permissions";
import { LayoutActions } from "../store/LayoutActions";

interface ISidenavProps {
    isOpen: boolean;
}

// https://bootstrapious.com/p/bootstrap-sidebar
const Sidenav: React.FC<ISidenavProps> = (props) => {
    const history = useHistory();
    const permissions = usePermissions();
    const location = useLocation();
    const dispatch = useDispatch();

    const session = useSelector((state: IApplicationState) => state.session);
    const app = useSelector((state: IApplicationState) => state.app);

    const iconSize = 20;

    const goHome = () => {
        history.push("/");
    };

    const goLogin = () => {
        dispatch(AppActions.SaveLocation(location.pathname));
        history.push("/account/login");
    };

    const changeEditMode = () => {
        dispatch(AppActions.ToggleEditMode());
        dispatch(LayoutActions.EvaluateSidenav());
    }

    const logout = () => {
        dispatch(UserActions.Logout());
        goHome();
    }

    return (
        <div id="sidebar" className={props.isOpen ? "" : " active"}>
            <div className="sidebar-header" onClick={goHome}></div>
            <div className="flex-column nav">
                <NavLink to="/tournaments" className="nav-link" activeClassName="active">
                    <MdGolfCourse size={iconSize} color={"secondary"} /> Tournaments
                </NavLink>
                <NavLink to="/match-play" className="nav-link" activeClassName="active">
                    <MdPeopleOutline size={iconSize} color={"secondary"} /> Team Match Play
                </NavLink>
                <NavLink to="/clubs" className="nav-link" activeClassName="active">
                    <TiGroupOutline size={iconSize} color={"secondary"} /> Member Clubs
                </NavLink>
                <NavLink to="/about" className="nav-link" activeClassName="active">
                    <TiInfoLargeOutline size={iconSize} color={"secondary"} /> About Us
                </NavLink>
                <NavLink to="/contact" className="nav-link" activeClassName="active">
                    <FaRegComment size={iconSize} color={"secondary"} /> Contact Us
                </NavLink>
                {permissions.canViewDocumentLibrary() && (
                    <NavLink to="/admin/library" className="nav-link" activeClassName="active">
                        <FaRegFileWord size={iconSize} color={"secondary"} /> Document Library
                    </NavLink>
                )}
                {permissions.canViewReports() && (
                    <NavLink to="/admin/reports/current-clubs" className="nav-link" activeClassName="active">
                        <FaRegFileExcel size={iconSize} color={"secondary"} /> Reports
                    </NavLink>
                )}
                {permissions.canViewWiki() && (
                    <NavLink to="/admin/wiki" className="nav-link" activeClassName="active">
                        <TiNews size={iconSize} color={"secondary"} /> Wiki
                    </NavLink>
                )}
                {!session.user.isAuthenticated && (
                    <NavItem onClick={() => goLogin()} className="text-secondary nav-link clickable">
                        <TiKeyOutline size={iconSize} color={"secondary"} />
                        Login
                    </NavItem>
                )}
                {permissions.canToggleEditMode() && !app.editMode && (
                    <NavItem
                        onClick={() => changeEditMode()}
                        className="text-warning nav-link clickable">
                        <TiEdit size={iconSize} color={"warning"} /> Turn on Edit Mode
                    </NavItem>
                )}
                {permissions.canToggleEditMode() && app.editMode && (
                    <NavItem
                        onClick={() => changeEditMode()}
                        className="text-warning nav-link clickable">
                        <TiEdit size={iconSize} color={"warning"} /> Turn off Edit Mode
                    </NavItem>
                )}
                {session.user.isAuthenticated && (
                    <NavItem onClick={() => logout()} className="text-muted nav-link clickable">
                        <TiPowerOutline size={iconSize} color={"muted"} /> Logout
                    </NavItem>
                )}
            </div>
        </div>
    );
};

export default Sidenav;
