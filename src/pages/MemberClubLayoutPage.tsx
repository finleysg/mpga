import { skipToken } from "@reduxjs/toolkit/query"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { useEffect, useState } from "react"

import Container from "react-bootstrap/Container"
import { Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom"

import { useGetClubQuery, useGetClubsQuery } from "../features/member-clubs/memberClubApi"
import { Club } from "../models/Clubs"

export type ClubContextType = { selectedClub: Club }

const MemberClubLayout = ({membershipDues, stripePublicKey}: {membershipDues: number, stripePublicKey: string}) => {
	const { name } = useParams()
  const navigate = useNavigate()
	const { data: clubs } = useGetClubsQuery()
	const { data, isLoading } = useGetClubQuery(
		clubs?.find((c) => c.system_name === name).id || skipToken,
	)
  const [stripePromise] = useState(() => loadStripe(stripePublicKey ?? ""))
	const selectedClub = new Club(data)

  useEffect(() => {
    if (!stripePublicKey) {
      navigate("/clubs")
    }
  }, [stripePublicKey, navigate])

	return (
		<Container fluid={true}>
      <Elements 
        stripe={stripePromise}
        options={{
          mode: "payment",
          currency: "usd",
          amount: membershipDues * 100,
        }}
      >
        {!isLoading && (
          <Outlet context={{ selectedClub } satisfies ClubContextType} />
        )}
      </Elements>
		</Container>
	)
}

export default MemberClubLayout

export function useCurrentClub() {
  return useOutletContext<ClubContextType>()
}