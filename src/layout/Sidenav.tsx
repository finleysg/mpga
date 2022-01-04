import React from "react";

import { useAppDispatch, useAppSelector } from "app-store";
import NavItem from "react-bootstrap/NavItem";
import { FaRegComment, FaRegFileExcel, FaRegFileWord } from "react-icons/fa";
import { MdGolfCourse, MdPeopleOutline } from "react-icons/md";
import { TiEdit, TiGroupOutline, TiInfoLargeOutline, TiKeyOutline, TiNews, TiPowerOutline } from "react-icons/ti";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useSession from "utilities/SessionHooks";

import AppActions from "../store/AppActions";
import { LayoutActions } from "../store/LayoutActions";
import UserActions from "../store/UserActions";
import usePermissions from "../utilities/Permissions";

interface ISidenavProps {
  isOpen: boolean;
}

const Sidenav: React.FC<ISidenavProps> = (props) => {
  const navigate = useNavigate();
  const permissions = usePermissions();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useSession();
  const app = useAppSelector((state) => state.app);

  const iconSize = 20;

  const goHome = () => {
    navigate("/");
  };

  const goLogin = () => {
    dispatch(AppActions.SaveLocation(location.pathname));
    navigate("/account/login");
  };

  const changeEditMode = () => {
    dispatch(AppActions.ToggleEditMode());
    dispatch(LayoutActions.EvaluateSidenav());
  };

  const logout = () => {
    dispatch(UserActions.Logout());
    goHome();
  };

  return (
    <div id="sidebar" className={props.isOpen ? "" : " active"}>
      <div className="sidebar-header" onClick={goHome}></div>
      <div className="flex-column nav">
        <NavLink to="/tournaments" className="nav-link">
          <MdGolfCourse size={iconSize} color={"secondary"} /> Tournaments
        </NavLink>
        <NavLink to="/match-play" className="nav-link">
          <MdPeopleOutline size={iconSize} color={"secondary"} /> Team Match Play
        </NavLink>
        <NavLink to="/clubs" className="nav-link">
          <TiGroupOutline size={iconSize} color={"secondary"} /> Member Clubs
        </NavLink>
        <NavLink to="/about" className="nav-link">
          <TiInfoLargeOutline size={iconSize} color={"secondary"} /> About Us
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          <FaRegComment size={iconSize} color={"secondary"} /> Contact Us
        </NavLink>
        {permissions.canViewDocumentLibrary() && (
          <NavLink to="/admin/library" className="nav-link">
            <FaRegFileWord size={iconSize} color={"secondary"} /> Document Library
          </NavLink>
        )}
        {permissions.canViewReports() && (
          <NavLink to="/admin/reports/current-clubs" className="nav-link">
            <FaRegFileExcel size={iconSize} color={"secondary"} /> Reports
          </NavLink>
        )}
        {permissions.canViewWiki() && (
          <NavLink to="/admin/wiki" className="nav-link">
            <TiNews size={iconSize} color={"secondary"} /> Wiki
          </NavLink>
        )}
        {!user.isAuthenticated && (
          <NavItem onClick={() => goLogin()} className="text-secondary nav-link clickable">
            <TiKeyOutline size={iconSize} color={"secondary"} />
            Login
          </NavItem>
        )}
        {permissions.canToggleEditMode() && !app.editMode && (
          <NavItem onClick={() => changeEditMode()} className="text-warning nav-link clickable">
            <TiEdit size={iconSize} color={"warning"} /> Turn on Edit Mode
          </NavItem>
        )}
        {permissions.canToggleEditMode() && app.editMode && (
          <NavItem onClick={() => changeEditMode()} className="text-warning nav-link clickable">
            <TiEdit size={iconSize} color={"warning"} /> Turn off Edit Mode
          </NavItem>
        )}
        {user.isAuthenticated && (
          <NavItem onClick={() => logout()} className="text-muted nav-link clickable">
            <TiPowerOutline size={iconSize} color={"muted"} /> Logout
          </NavItem>
        )}
      </div>
    </div>
  );
};

export default Sidenav;
