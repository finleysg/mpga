import * as AnnouncementStore from "./AnnouncementStore";
import * as DocumentStore from "./DocumentStore";
import * as LayoutStore from "./LayoutStore";
import * as NotificationStore from "./NotificationStore";
import * as TournamentStore from "./TournamentStore";
import * as ContentStore from "./ContentStore";

// The top-level state object
export interface IApplicationState {
	layout: LayoutStore.ILayoutState,
	notifications: NotificationStore.INotificationState,
	announcements: AnnouncementStore.IAnnouncementState,
	documents: DocumentStore.IDocumentState,
	tournaments: TournamentStore.ITournamentState,
	content: ContentStore.IContentState,
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
	layout: LayoutStore.reducer,
	notifications: NotificationStore.NotificationReducer,
	announcements: AnnouncementStore.AnnouncementsReducer,
	documents: DocumentStore.DocumentsReducer,
	tournaments: TournamentStore.TournamentsReducer,
	content: ContentStore.ContentReducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
// export type IAppThunkAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
