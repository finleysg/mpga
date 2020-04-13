import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IApplicationState } from "../store";
import NavItem from "react-bootstrap/NavItem";
import UserActions from "../store/UserActions";
import usePermissions from "../utilities/Permissions";
import AppActions from "../store/AppActions";

interface ISidenavProps {
    isOpen: boolean;
}

// https://bootstrapious.com/p/bootstrap-sidebar
const Sidenav: React.FC<ISidenavProps> = (props) => {
    const history = useHistory();
    const permissions = usePermissions();
    const session = useSelector((state: IApplicationState) => state.session);
    const app = useSelector((state: IApplicationState) => state.app);
    const dispatch = useDispatch();

    const goHome = () => {
        history.push("/");
    };

    return (
        <div id="sidebar" className={props.isOpen ? "" : " active"}>
            <div className="sidebar-header" onClick={goHome}></div>
            <div className="flex-column nav">
                <NavLink to="/tournaments" className="nav-link" activeClassName="active">
                    Tournaments
                </NavLink>
                <NavLink to="/match-play" className="nav-link" activeClassName="active">
                    Team Match Play
                </NavLink>
                <NavLink to="/clubs" className="nav-link" activeClassName="active">
                    Member Clubs
                </NavLink>
                <NavLink to="/about" className="nav-link" activeClassName="active">
                    About Us
                </NavLink>
                <NavLink to="/contact" className="nav-link" activeClassName="active">
                    Contact Us
                </NavLink>
                {permissions.canViewDocumentLibrary() && (
                    <NavLink to="/admin/library" className="nav-link" activeClassName="active">
                        Document Library
                    </NavLink>
                )}
                {permissions.canViewReports() && (
                    <NavLink to="/admin/reports" className="nav-link" activeClassName="active">
                        Reports
                    </NavLink>
                )}
                {permissions.canViewWiki() && (
                    <NavLink to="/admin/wiki" className="nav-link" activeClassName="active">
                        Wiki
                    </NavLink>
                )}
                {!session.user.isAuthenticated && (
                    <NavLink to="/account/login" className="nav-link" activeClassName="active">
                        Login
                    </NavLink>
                )}
                {permissions.canToggleEditMode() && !app.editMode && (
                    <NavItem onClick={() => dispatch(AppActions.ToggleEditMode())} className="text-warning nav-link clickable">
                        Turn on Edit Mode
                    </NavItem>
                )}
                {permissions.canToggleEditMode() && app.editMode && (
                    <NavItem onClick={() => dispatch(AppActions.ToggleEditMode())} className="text-warning nav-link clickable">
                        Turn off Edit Mode
                    </NavItem>
                )}
                {session.user.isAuthenticated && (
                    <NavItem onClick={() => dispatch(UserActions.Logout())} className="text-muted nav-link clickable">
                        Logout
                    </NavItem>
                )}
            </div>
        </div>
    );
};

export default Sidenav;
