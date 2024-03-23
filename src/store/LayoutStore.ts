import { Action, Reducer } from "redux"

import { LayoutActionTypes } from "./LayoutActions"

export interface ILayoutState {
  subMenu: string
  segments: string[]
}

export const defaultState: ILayoutState = {
  subMenu: "home",
  segments: [],
}

export interface IRouteChanged extends Action {
  type: LayoutActionTypes.ROUTE_CHANGED
  payload: string
}

type KnownActions = IRouteChanged

export const reducer: Reducer<ILayoutState, KnownActions> = (
  state: ILayoutState | undefined,
  action: KnownActions,
): ILayoutState => {
  if (!state) {
    state = { ...defaultState }
  }

  switch (action.type) {
    case LayoutActionTypes.ROUTE_CHANGED: {
      var segments = action.payload.split("/")
      var submenu = segments[1].length > 0 ? segments[1] : "home"
      return { ...state, subMenu: submenu, segments: segments.slice(1) }
    }
    default:
      return state
  }
}
