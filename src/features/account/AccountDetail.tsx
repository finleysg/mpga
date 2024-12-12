import React, { useEffect } from "react"

import { useNavigate } from "react-router-dom"

import { useAppDispatch } from "../../app-store"
import Loading from "../../components/Loading"
import { getContact } from "../../store/UserStore"
import useSession from "../../utilities/SessionHooks"
import { useGetClubsQuery } from "../member-clubs/memberClubApi"
import AccountEmail from "./AccountEmail"
import AccountName from "./AccountName"
import AccountPassword from "./AccountPassword"
import HomeClub from "./HomeClub"

const AccountDetail: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { user, flags } = useSession()
	const { data: clubs } = useGetClubsQuery()

	if (!user.isAuthenticated) {
		navigate("/")
	}

	useEffect(() => {
		dispatch(getContact(user.email))
	}, [user.email])

	return (
		<div>
			<h3 className="text-primary">MPGA Account Details</h3>
			{flags.isBusy && <Loading />}
			{!flags.isBusy && (
				<React.Fragment>
					<AccountEmail />
					<AccountPassword />
					<AccountName />
					<HomeClub clubs={clubs} />
				</React.Fragment>
			)}
		</div>
	)
}

export default AccountDetail
