import { useEffect } from "react"

import { Route, Routes } from "react-router-dom"

import Constants from "../app-constants"
import { useAppDispatch } from "../app-store"
import SessionLayout from "../components/layouts/SessionLayout"
import AccountDetail from "../features/account/AccountDetail"
import AccountActivation from "../features/session/AccountActivation"
import ForgotPassword from "../features/session/ForgotPassword"
import Login from "../features/session/Login"
import PasswordReset from "../features/session/PasswordReset"
import Register from "../features/session/Register"
import Layout from "../layout/Layout"
import AboutUsPage from "../pages/AboutUsPage"
import AwardsPage from "../pages/AwardsPage"
import CodeOfConductPage from "../pages/CodeOfConductPage"
import CommitteePage from "../pages/CommitteePage"
import ContactUsPage from "../pages/ContactUsPage"
import DocumentLibraryPage from "../pages/DocumentLibraryPage"
import EventContactPage from "../pages/EventContactPage"
import EventDetailPage from "../pages/EventDetailPage"
import HardCardPage from "../pages/HardCardPage"
import ConnectedHomePage from "../pages/HomePage"
import MaintenancePage from "../pages/MaintenancePage"
import MatchPlayHistoryPage from "../pages/MatchPlayHistoryPage"
import MatchPlayPage from "../pages/MatchPlayPage"
import MatchPlayResultsPage from "../pages/MatchPlayResultsPage"
import MatchPlayRulesPage from "../pages/MatchPlayRulesPage"
import MemberClubPage from "../pages/MemberClubPage"
import MemberClubsPage from "../pages/MemberClubsPage"
import ReportsPage from "../pages/ReportsPage"
import TournamentBidPage from "../pages/TournamentBidPage"
import TournamentGalleryPage from "../pages/TournamentGalleryPage"
import TournamentHistoryPage from "../pages/TournamentHistoryPage"
import TournamentsPage from "../pages/TournamentsPage"
import { getUser } from "../store/UserStore"

export const AppRoutes = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getUser())
	}, [dispatch])

	if (Constants.Mode !== "Live") {
		return (
			<Routes>
				<Route path="*" element={<MaintenancePage />} />
			</Routes>
		)
	}

	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<ConnectedHomePage />} />
				<Route path="home" element={<ConnectedHomePage />} />
				<Route path="tournaments" element={<TournamentsPage />} />
				<Route path="tournaments/hard-card" element={<HardCardPage />} />
				<Route path="tournaments/code-of-conduct" element={<CodeOfConductPage />} />
				{/* <Route path="tournaments/pace-of-play" element={<PaceOfPlayPage />} /> */}
				<Route path="tournaments/detail/:name/:year" element={<EventDetailPage />} />
				<Route path="tournaments/history/:name" element={<TournamentHistoryPage />} />
				<Route path="tournaments/gallery/:name" element={<TournamentGalleryPage />} />
				<Route path="tournaments/gallery/:name/:year" element={<TournamentGalleryPage />} />
				<Route path="tournaments/contact/:name/:year" element={<EventContactPage />} />
				<Route path="tournaments/bid" element={<TournamentBidPage />} />
				<Route path="match-play" element={<MatchPlayPage />} />
				<Route path="match-play/rules" element={<MatchPlayRulesPage />} />
				<Route path="match-play/results" element={<MatchPlayResultsPage />} />
				<Route path="match-play/history" element={<MatchPlayHistoryPage />} />
				<Route path="clubs" element={<MemberClubsPage />} />
				<Route path="clubs/:name" element={<MemberClubPage />} />
				<Route path="about" element={<AboutUsPage />} />
				<Route path="about/committee" element={<CommitteePage />} />
				<Route path="about/awards" element={<AwardsPage />} />
				<Route path="contact" element={<ContactUsPage />} />
				<Route path="admin/library" element={<DocumentLibraryPage />} />
				<Route path="admin/reports/:name" element={<ReportsPage />} />
				<Route path="account" element={<SessionLayout />}>
					<Route index element={<AccountDetail />} />
					<Route path="login" element={<Login />} />
					<Route path="forgot" element={<ForgotPassword />} />
					<Route path="register" element={<Register />} />
					<Route path="reset-password/:uid/:token" element={<PasswordReset />} />
					<Route path="activate/:uid/:token" element={<AccountActivation />} />
				</Route>
			</Route>
		</Routes>
	)
}
