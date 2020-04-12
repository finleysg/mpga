import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { useStripe } from "@stripe/react-stripe-js";
import { PaymentMethod } from "@stripe/stripe-js";

import Processing from "../../components/Processing";
import { Club } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import PaymentActions from "../../store/PaymentActions";
import PaymentForm from "./PaymentForm";

const PaymentContainer = styled.div`
    padding: 10px;
    margin: 20px;
`;
PaymentContainer.displayName = "PaymentContainer";

export interface IClubPaymentProps {
    club: Club;
    amountDue: number;
    title: string;
    Cancel: () => void;
}

const ClubDuesPayment: React.FC<IClubPaymentProps> = (props) => {
    const paymentState = useSelector((state: IApplicationState) => state.payments);
    const dispatch = useDispatch();
    const stripe = useStripe();

    const submitPayment = async (method: PaymentMethod) => {
        if (!stripe) {
            return;
        }
        dispatch(PaymentActions.PayClubDues(stripe, props.club, method));
    };

    return (
        <PaymentContainer>
            {paymentState.paymentProcessing && <Processing message="Processing your payment..." />}
            {!paymentState.paymentConfirmationId && !paymentState.paymentProcessing && (
                <React.Fragment>
                    <h4 className="text-secondary">{props.title}</h4>
                    <PaymentForm OnPayment={(method) => submitPayment(method)} Cancel={() => props.Cancel()} />
                </React.Fragment>
            )}
            {paymentState.paymentConfirmationId && (
                <p className="text-success">
                    Thank you for your payment. Here is your confirmation id {paymentState.paymentConfirmationId}. The
                    webite may take a few minutes to reflect this payment. Refresh your browser to see the latest status.
                </p>
            )}
            {paymentState.paymentError && <p className="text-danger">{paymentState.paymentError}</p>}
        </PaymentContainer>
    );
};

export default ClubDuesPayment;
