import { Action, Reducer } from "redux";
import { PaymentActionTypes } from "./PaymentActions";

export interface IPaymentState {
    paymentConfirmationId?: string;
    paymentError?: string;
    paymentProcessing: boolean;
    hasError: boolean;
}

export const defaultState: IPaymentState = {
    paymentProcessing: false,
    hasError: false,
};

export interface IPaymentsRequested extends Action {
    type: PaymentActionTypes.PAY_CLUB_DUES_STARTED;
}

export interface IPaymentsSucceeded extends Action {
    type: PaymentActionTypes.PAY_CLUB_DUES_COMPLETED;
    payload: string;
}

export interface IPaymentsFailed extends Action {
    type: PaymentActionTypes.PAY_CLUB_DUES_FAILED;
    payload: string;
}

type KnownActions =
    | IPaymentsRequested 
    | IPaymentsSucceeded 
    | IPaymentsFailed;

export const PaymentsReducer: Reducer<IPaymentState, KnownActions> =
    (state: IPaymentState | undefined, action: KnownActions): IPaymentState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case PaymentActionTypes.PAY_CLUB_DUES_STARTED: {
            return {...state, paymentProcessing: true, paymentConfirmationId: undefined, paymentError: undefined }
        }
        case PaymentActionTypes.PAY_CLUB_DUES_COMPLETED: {
            return {...state, paymentProcessing: false, paymentConfirmationId: action.payload }
        }
        case PaymentActionTypes.PAY_CLUB_DUES_FAILED: {
            return {...state, paymentProcessing: false, paymentConfirmationId: undefined, paymentError: action.payload }
        }
        default:
            return state;
    }
}
