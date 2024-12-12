import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios"

import { AppConfig } from "../models/AppConfig"

export interface IAppState {
	config: AppConfig
	isBusy: boolean
	editMode: boolean
	closedForms: string[]
	location?: string
}

export const defaultState: IAppState = {
	config: {
		eventCalendarYear: 0,
		matchPlayYear: 0,
		memberClubYear: 0,
		membershipDues: 0,
		stripePublicKey: "",
	},
	isBusy: false,
	editMode: false,
	closedForms: [],
}

const getConfig = createAsyncThunk("app/getConfig", async () => {
	const result = await axios.get("/settings/")
	return result.data as AppConfig
})

const appSlice = createSlice({
	name: "app",
	initialState: defaultState,
	reducers: {
		isBusy: (state) => {
			state.isBusy = true
		},
		isNotBusy: (state) => {
			state.isBusy = false
		},
		saveLocation: (state, action) => {
			state.location = action.payload
		},
		toggleEditMode: (state) => {
			state.editMode = !state.editMode
		},
		closeOpenForms: (state, action) => {
			state.closedForms.push(action.payload)
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getConfig.pending, (state) => {
			state.isBusy = true
		})
		builder.addCase(getConfig.fulfilled, (state, action) => {
			state.isBusy = false
			state.config = action.payload
		})
		builder.addCase(getConfig.rejected, (state) => {
			state.isBusy = false
		})
	},
})

export { getConfig }
export const { isBusy, isNotBusy, saveLocation, toggleEditMode, closeOpenForms } = appSlice.actions
export default appSlice.reducer
