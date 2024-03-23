import { AppDispatch } from "app-store"

export enum LayoutActionTypes {
  ROUTE_CHANGED = "ROUTE_CHANGED",
}

export const LayoutActions = {
  RouteChange: (path: string) => (dispatch: AppDispatch) => {
    dispatch({ type: LayoutActionTypes.ROUTE_CHANGED, payload: path })
  },
}
