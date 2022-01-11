import { Action, Reducer } from "redux";

import { LayoutActionTypes } from "./LayoutActions";

export interface ILayoutState {
  sideNavOpen: boolean;
  viewPortWidth?: number;
  subMenu: string;
  segments: string[];
}

export const defaultState: ILayoutState = {
  sideNavOpen: true,
  subMenu: "home",
  segments: [],
};

export interface ISidenavClose extends Action {
  type: LayoutActionTypes.SIDENAV_CLOSE;
}

export interface ISidenavToggled extends Action {
  type: LayoutActionTypes.SIDENAV_TOGGLED;
}

export interface IRouteChanged extends Action {
  type: LayoutActionTypes.ROUTE_CHANGED;
  payload: string;
}

export interface IViewportChanged extends Action {
  type: LayoutActionTypes.VIEWPORT_CHANGED;
  payload: any;
}

type KnownActions = ISidenavClose | ISidenavToggled | IRouteChanged | IViewportChanged;

export const reducer: Reducer<ILayoutState, KnownActions> = (
  state: ILayoutState | undefined,
  action: KnownActions,
): ILayoutState => {
  if (!state) {
    state = { ...defaultState };
  }

  switch (action.type) {
    case LayoutActionTypes.SIDENAV_CLOSE: {
      return { ...state, sideNavOpen: false };
    }
    case LayoutActionTypes.SIDENAV_TOGGLED: {
      return { ...state, sideNavOpen: !state.sideNavOpen };
    }
    case LayoutActionTypes.ROUTE_CHANGED: {
      var segments = action.payload.split("/");
      var submenu = segments[1].length > 0 ? segments[1] : "home";
      return { ...state, subMenu: submenu, segments: segments.slice(1) };
    }
    case LayoutActionTypes.VIEWPORT_CHANGED: {
      return { ...state, viewPortWidth: action.payload.width };
    }
    default:
      return state;
  }
};
