import { PaymentMethod, Stripe } from "@stripe/stripe-js";

import { Api } from "../http";
import { Club } from "../models/Clubs";
import NotificationActions from "./NotificationActions";

export enum PaymentActionTypes {
    PAY_CLUB_DUES_STARTED = "PAY_CLUB_DUES_STARTED",
    PAY_CLUB_DUES_COMPLETED = "PAY_CLUB_DUES_COMPLETED",
    PAY_CLUB_DUES_FAILED = "PAY_CLUB_DUES_FAILED",
}

const PaymentActions = {
    PayClubDues: (stripe: Stripe, club: Club, method: PaymentMethod) => async (dispatch: any) => {
        dispatch({ type: PaymentActionTypes.PAY_CLUB_DUES_STARTED });
        try {
            const response = await Api.get(`/club-dues/${club.id}/`);
            const clientSecret = response.data;
            const result = await stripe.confirmCardPayment(clientSecret, { payment_method: method.id });
            if (result.error) {
                const message = result.error.message;
                dispatch({ type: PaymentActionTypes.PAY_CLUB_DUES_FAILED, payload: message });
            } else if (result.paymentIntent) {
                dispatch({ type: PaymentActionTypes.PAY_CLUB_DUES_COMPLETED, payload: result.paymentIntent.id });
                dispatch(NotificationActions.ToastSuccess("Your payment has been received."));
            } else {
                dispatch({ type: PaymentActionTypes.PAY_CLUB_DUES_FAILED, payload: "Unexpected result from the payment processor." });
            }
        } catch (error) {
            dispatch({ type: PaymentActionTypes.PAY_CLUB_DUES_FAILED });
            dispatch(NotificationActions.ToastError(error));
        }
    },
};

export default PaymentActions;
