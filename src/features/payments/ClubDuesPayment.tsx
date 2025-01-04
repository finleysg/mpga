import React from "react"

import styled from "styled-components"

import { Club } from "../../models/Clubs"
import PaymentForm from "./PaymentForm"

const PaymentContainer = styled.div`
	padding: 10px;
	margin: 20px;
`
PaymentContainer.displayName = "PaymentContainer"

export interface IClubPaymentProps {
	club: Club
	title: string
	Cancel: () => void
}

const ClubDuesPayment: React.FC<IClubPaymentProps> = (props) => {
	return (
		<PaymentContainer>
      <h4 className="text-secondary">{props.title}</h4>
      <PaymentForm
        clubId={props.club.id}
        Cancel={() => props.Cancel()}
      />
		</PaymentContainer>
	)
}

export default ClubDuesPayment
