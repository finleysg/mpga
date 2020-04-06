import * as AppStore from "./AppStore";
import * as AnnouncementStore from "./AnnouncementStore";
import * as DocumentStore from "./DocumentStore";
import * as EventStore from "./EventStore";
import * as LayoutStore from "./LayoutStore";
import * as NotificationStore from "./NotificationStore";
import * as TournamentStore from "./TournamentStore";
import * as TournamentWinnerStore from "./TournamentWinnerStore";
import * as ContentStore from "./ContentStore";
import * as UserStore from "./UserStore";
import * as MemberClubsStore from "./MemberClubStore";
import * as PhotoStore from "./PhotoStore";
import * as CommitteeStore from "./CommitteeStore";
import * as AwardStore from "./AwardStore";
import * as MatchPlayStore from "./MatchPlayStore";
import * as MessageStore from "./MessageStore";

// The top-level state object
export interface IApplicationState {
    app: AppStore.IAppState,
	layout: LayoutStore.ILayoutState,
	notifications: NotificationStore.INotificationState,
	announcements: AnnouncementStore.IAnnouncementState,
	documents: DocumentStore.IDocumentState,
	tournament: TournamentStore.ITournamentState,
	winners: TournamentWinnerStore.ITournamentWinnerState,
	events: EventStore.IEventState,
	content: ContentStore.IContentState,
	session: UserStore.IUserState,
	memberClubs: MemberClubsStore.IMemberClubState,
    photos: PhotoStore.IPhotoState,
    committee: CommitteeStore.ICommitteeState,
    awards: AwardStore.IAwardState,
    matchPlay: MatchPlayStore.IMatchPlayState,
    messaging: MessageStore.IMessageState,
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    app: AppStore.AppReducer,
	layout: LayoutStore.reducer,
	notifications: NotificationStore.NotificationReducer,
	announcements: AnnouncementStore.AnnouncementsReducer,
	documents: DocumentStore.DocumentsReducer,
	tournament: TournamentStore.TournamentReducer,
	winners: TournamentWinnerStore.TournamentWinnersReducer,
	events: EventStore.EventsReducer,
	content: ContentStore.ContentReducer,
	session: UserStore.UsersReducer,
	memberClubs: MemberClubsStore.MemberClubsReducer,
    photos: PhotoStore.PhotosReducer,
    committee: CommitteeStore.CommitteeReducer,
    awards: AwardStore.AwardReducer,
    matchPlay: MatchPlayStore.MatchPlaysReducer,
    messaging: MessageStore.MessageReducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
// export type IAppThunkAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
