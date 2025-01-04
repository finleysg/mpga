import { createSlice } from "@reduxjs/toolkit"

export interface IAppState {
	isBusy: boolean
	editMode: boolean
	closedForms: string[]
	location?: string
}

export const defaultState: IAppState = {
	isBusy: false,
	editMode: false,
	closedForms: [],
}

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
	}
})

export const { isBusy, isNotBusy, saveLocation, toggleEditMode, closeOpenForms } = appSlice.actions
export default appSlice.reducer
