import { AppDispatch, RootState } from "app-store";

export enum LayoutActionTypes {
  SIDENAV_CLOSE = "SIDENAV_CLOSE",
  SIDENAV_TOGGLED = "SIDENAV_TOGGLED",
  ROUTE_CHANGED = "ROUTE_CHANGED",
  VIEWPORT_CHANGED = "VIEWPORT_CHANGED",
}

export const LayoutActions = {
  CloseSidenav: () => (dispatch: AppDispatch) => {
    dispatch({ type: LayoutActionTypes.SIDENAV_CLOSE });
  },
  EvaluateSidenav: () => (dispatch: AppDispatch, getState: () => RootState) => {
    // a phone may not close sidenav on initial render - I'm ok with that
    const vw = getState().layout.viewPortWidth || 900;
    if (vw < 360) {
      dispatch({ type: LayoutActionTypes.SIDENAV_CLOSE });
    }
  },
  ToggleSidenav: () => (dispatch: AppDispatch) => {
    dispatch({ type: LayoutActionTypes.SIDENAV_TOGGLED });
  },
  RouteChange: (path: string) => (dispatch: AppDispatch) => {
    dispatch({ type: LayoutActionTypes.ROUTE_CHANGED, payload: path });
  },
  ViewPortChange: (sizes: any) => (dispatch: AppDispatch) => {
    if (sizes.width) {
      dispatch({ type: LayoutActionTypes.VIEWPORT_CHANGED, payload: sizes });
    }
  },
};
