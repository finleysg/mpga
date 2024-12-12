import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { PaymentMethod, Stripe } from "@stripe/stripe-js"

import { Club } from "models/Clubs"

import { Api } from "../http"

export interface IPaymentState {
	paymentConfirmationId?: string
	paymentError?: string
	paymentProcessing: boolean
	hasError: boolean
}

export const defaultState: IPaymentState = {
	paymentProcessing: false,
	hasError: false,
}

const payClubDues = createAsyncThunk(
	"payments/payClubDues",
	async (data: { stripe: Stripe; club: Club; method: PaymentMethod }) => {
		const response = await Api.get(`/club-dues/${data.club.id}/`)
		const clientSecret = response.data
		return await data.stripe.confirmCardPayment(clientSecret, { payment_method: data.method.id })
	},
)

const paymentSlice = createSlice({
	name: "payments",
	initialState: defaultState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(payClubDues.pending, (state) => {
			state.paymentProcessing = true
		})
		builder.addCase(payClubDues.fulfilled, (state, action) => {
			state.paymentProcessing = false
			if (action.payload.error) {
				state.paymentError = action.payload.error.message
			} else if (action.payload.paymentIntent) {
				state.paymentConfirmationId = action.payload.paymentIntent.id
			} else {
				state.paymentError = "Unexpected result from the payment processor."
			}
		})
		builder.addCase(payClubDues.rejected, (state) => {
			state.paymentProcessing = false
			state.paymentError = "An error occurred while processing the payment."
		})
	},
})

export { payClubDues }
export default paymentSlice.reducer
