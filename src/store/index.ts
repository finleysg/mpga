import * as AppStore from "./AppStore";
import * as LayoutStore from "./LayoutStore";
import * as MessageStore from "./MessageStore";
import * as NotificationStore from "./NotificationStore";
import * as PaymentStore from "./PaymentStore";
import * as UserStore from "./UserStore";

// The top-level state object
export interface IApplicationState {
  app: AppStore.IAppState;
  layout: LayoutStore.ILayoutState;
  messaging: MessageStore.IMessageState;
  notifications: NotificationStore.INotificationState;
  payments: PaymentStore.IPaymentState;
  session: UserStore.IUserState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
  app: AppStore.AppReducer,
  layout: LayoutStore.reducer,
  messaging: MessageStore.MessageReducer,
  notifications: NotificationStore.NotificationReducer,
  payments: PaymentStore.PaymentsReducer,
  session: UserStore.UsersReducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
// export type IAppThunkAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
