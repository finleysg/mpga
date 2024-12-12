import appReducer, { IAppState } from "./AppStore"
import layoutReducer, { ILayoutState } from "./LayoutStore"
import messageReducer, { IMessageState } from "./MessageStore"
import paymentsReducer, { IPaymentState } from "./PaymentStore"
import userReducer, { IUserState } from "./UserStore"

// The top-level state object
export interface IApplicationState {
	app: IAppState
	layout: ILayoutState
	messaging: IMessageState
	payments: IPaymentState
	session: IUserState
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
	app: appReducer,
	layout: layoutReducer,
	messaging: messageReducer,
	payments: paymentsReducer,
	session: userReducer,
}

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
// export type IAppThunkAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
