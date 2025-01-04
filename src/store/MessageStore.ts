import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { apiUrl, httpClient } from "../utilities/HttpClient"

export interface IMessageState {
	sending: boolean
	failed: boolean
	sent: boolean
}

export const defaultState: IMessageState = {
	sending: false,
	failed: false,
	sent: false,
}

const sendMessage = createAsyncThunk("messages/sendMessage", async (message: any) => {
	message.message_type = "general"
	const result = await httpClient(apiUrl("/messages/"), {body: JSON.stringify(message)})
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
			state.failed = false
			state.sent = true
		})
		builder.addCase(sendMessage.rejected, (state) => {
			state.sending = false
			state.failed = true
		})
	},
})

export { sendMessage }
export default messageSlice.reducer
