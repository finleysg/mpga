import NavItem from "react-bootstrap/NavItem"
import { FaRegComment, FaRegFileExcel, FaRegFileWord } from "react-icons/fa"
import { MdGolfCourse, MdPeopleOutline } from "react-icons/md"
import {
	TiEdit,
	TiGroupOutline,
	TiInfoLargeOutline,
	TiKeyOutline,
	TiNews,
	TiPowerOutline,
} from "react-icons/ti"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../app-store"
import { saveLocation, toggleEditMode } from "../store/AppStore"
import { logout } from "../store/UserStore"
import usePermissions from "../utilities/Permissions"
import useSession from "../utilities/SessionHooks"
import { useLayout } from "./UseLayout"

const Sidenav = () => {
	const { sidebarOpen, closeSidebar } = useLayout()
	const navigate = useNavigate()
	const permissions = usePermissions()
	const location = useLocation()
	const dispatch = useAppDispatch()
	const { user } = useSession()
	const app = useAppSelector((state) => state.app)

	const iconSize = 20

	const goHome = () => {
		navigate("/")
		closeSidebar()
	}

	const goLogin = () => {
		dispatch(saveLocation(location.pathname))
		navigate("/account/login")
		closeSidebar()
	}

	const changeEditMode = () => {
		dispatch(toggleEditMode())
		closeSidebar()
	}

	const handleLogout = () => {
		dispatch(logout())
		goHome()
	}

	return (
		<div id="sidebar" className={sidebarOpen ? "" : " active"}>
			<div className="p-2">
				<div className="sidebar-header" onClick={goHome}></div>
			</div>
			<div className="flex-column nav">
				<NavLink to="/tournaments" onClick={closeSidebar} className="nav-link">
					<MdGolfCourse size={iconSize} color={"secondary"} /> Tournaments
				</NavLink>
				<NavLink to="/match-play" onClick={closeSidebar} className="nav-link">
					<MdPeopleOutline size={iconSize} color={"secondary"} /> Team Match Play
				</NavLink>
				<NavLink to="/clubs" onClick={closeSidebar} className="nav-link">
					<TiGroupOutline size={iconSize} color={"secondary"} /> Member Clubs
				</NavLink>
				<NavLink to="/about" onClick={closeSidebar} className="nav-link">
					<TiInfoLargeOutline size={iconSize} color={"secondary"} /> About Us
				</NavLink>
				<NavLink to="/contact" onClick={closeSidebar} className="nav-link">
					<FaRegComment size={iconSize} color={"secondary"} /> Contact Us
				</NavLink>
				{permissions.canViewDocumentLibrary() && (
					<NavLink to="/admin/library" onClick={closeSidebar} className="nav-link">
						<FaRegFileWord size={iconSize} color={"secondary"} /> Document Library
					</NavLink>
				)}
				{permissions.canViewReports() && (
					<NavLink to="/admin/reports/current-clubs" onClick={closeSidebar} className="nav-link">
						<FaRegFileExcel size={iconSize} color={"secondary"} /> Reports
					</NavLink>
				)}
				{permissions.canViewWiki() && (
					<NavLink to="/admin/wiki" onClick={closeSidebar} className="nav-link">
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
					<NavItem onClick={() => handleLogout()} className="nav-link clickable">
						<TiPowerOutline size={iconSize} color={"muted"} /> Logout
					</NavItem>
				)}
			</div>
		</div>
	)
}

export default Sidenav
