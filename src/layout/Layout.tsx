import "react-bootstrap-typeahead/css/Typeahead.css"
import "react-toastify/dist/ReactToastify.css"
import "./layout.scss"

import { useEffect } from "react"

import Navbar from "react-bootstrap/Navbar"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation } from "react-router"
import { ToastContainer } from "react-toastify"

import ErrorBoundary from "../components/ErrorBoundary"
import { IApplicationState } from "../store"
import { routeChanged } from "../store/LayoutStore"
import PageMenu from "./PageMenu"
import Sidenav from "./Sidenav"
import SidenavToggle from "./SidenavToggle"
import { useLayout } from "./UseLayout"

export default function Layout() {
	const { sidebarOpen, closeSidebar } = useLayout()
	const dispatch = useDispatch()
	const location = useLocation()
	const layoutState = useSelector((state: IApplicationState) => state.layout)

	useEffect(() => {
		dispatch(routeChanged(location.pathname))
	}, [dispatch, location.pathname])

	return (
		<div className="wrapper">
			<Sidenav />
			<div id="content" className={sidebarOpen ? "" : " active"}>
				<Navbar collapseOnSelect expand="lg" bg="secondary" variant="light" sticky="top">
					<SidenavToggle />
					<Navbar.Brand className="ml-2 mpga" href="/home">
						MPGA
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					{layoutState.subMenu && (
						<PageMenu subMenu={layoutState.subMenu} segments={layoutState.segments} />
					)}
				</Navbar>
				<div id="page" onClick={closeSidebar}>
					<ToastContainer autoClose={3000} hideProgressBar={true} newestOnTop={true} />
					<ErrorBoundary>
						<Outlet />
					</ErrorBoundary>
				</div>
			</div>
		</div>
	)
}
