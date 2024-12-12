import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { Api } from "../http"
import { ContactMessage } from "../models/ContactMessage"

export interface IMessageState {
	sending: boolean
	failed: boolean
	sent?: ContactMessage
}

export const defaultState: IMessageState = {
	sending: false,
	failed: false,
}

const sendMessage = createAsyncThunk("messages/sendMessage", async (message: ContactMessage) => {
	const result = await Api.post("/messages/", message)
	return result.data
})

const messageSlice = createSlice({
	name: "messages",
	initialState: defaultState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(sendMessage.pending, (state) => {
			state.sending = true
		})
		builder.addCase(sendMessage.fulfilled, (state, action) => {
			state.sending = false
			state.sent = action.payload
		})
		builder.addCase(sendMessage.rejected, (state) => {
			state.sending = false
			state.failed = true
		})
	},
})

export { sendMessage }
export default messageSlice.reducer
