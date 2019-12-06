import { Action } from "redux";
import { Reducer } from "react";

export enum LayoutActionTypes {
    SIDENAV_TOGGLED = "SIDENAV_TOGGLED",
    ROUTE_CHANGED = "ROUTE_CHANGED",
}

export interface ISidenavToggled extends Action {
    type: LayoutActionTypes.SIDENAV_TOGGLED;
    payload: boolean;
}

export interface IRouteChanged extends Action {
    type: LayoutActionTypes.ROUTE_CHANGED;
    payload: string;
}

export interface ILayoutState {
    sideNavOpen: boolean;
    subMenu: string;
}

export const defaultState: ILayoutState = {
    sideNavOpen: true,
    subMenu: "home",
};

export const actionCreators = {
    ToggleSidenav: (isOpen: boolean) => (dispatch: any) => {
        dispatch({ type: LayoutActionTypes.SIDENAV_TOGGLED, payload: isOpen });
    },
    RouteChange: (path: string) => (dispatch: any) => {
        dispatch({ type: LayoutActionTypes.ROUTE_CHANGED, payload: path });
    }
}

type KnownActions = ISidenavToggled | IRouteChanged;

export const reducer: Reducer<ILayoutState, KnownActions> =
    (state: ILayoutState, action: KnownActions): ILayoutState => {

    if (!state) {
        state = {...defaultState};
    }

    switch (action.type) {
        case LayoutActionTypes.SIDENAV_TOGGLED: {
            return {...state, sideNavOpen: action.payload};
        }
        case LayoutActionTypes.ROUTE_CHANGED: {
            var segments = action.payload.split("/");
            var submenu = segments[1].length > 0 ? segments[1] : "home";
            return {...state, subMenu: submenu};
        }
    }

    return state;
}