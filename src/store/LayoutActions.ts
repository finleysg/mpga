export enum LayoutActionTypes {
    SIDENAV_TOGGLED = "SIDENAV_TOGGLED",
    ROUTE_CHANGED = "ROUTE_CHANGED",
}

export const LayoutActions = {
    ToggleSidenav: (isOpen: boolean) => (dispatch: any) => {
        dispatch({ type: LayoutActionTypes.SIDENAV_TOGGLED, payload: isOpen });
    },
    RouteChange: (path: string) => (dispatch: any) => {
        dispatch({ type: LayoutActionTypes.ROUTE_CHANGED, payload: path });
    }
}
