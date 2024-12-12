import { createSlice } from "@reduxjs/toolkit"

export interface ILayoutState {
	subMenu: string
	segments: string[]
}

export const defaultState: ILayoutState = {
	subMenu: "home",
	segments: [],
}

const layoutSlice = createSlice({
	name: "layout",
	initialState: defaultState,
	reducers: {
		routeChanged(state, action: { payload: string }) {
			var segments = action.payload.split("/")
			var submenu = segments[1].length > 0 ? segments[1] : "home"
			state.subMenu = submenu
			state.segments = segments.slice(1)
		},
	},
})

export const { routeChanged } = layoutSlice.actions
export default layoutSlice.reducer
