import * as AnnouncementStore from "./AnnouncementStore";
import * as AppStore from "./AppStore";
import * as AwardStore from "./AwardStore";
import * as CommitteeStore from "./CommitteeStore";
import * as ContentStore from "./ContentStore";
import * as DocumentStore from "./DocumentStore";
import * as EventStore from "./EventStore";
import * as LayoutStore from "./LayoutStore";
import * as MatchPlayStore from "./MatchPlayStore";
import * as MemberClubsStore from "./MemberClubStore";
import * as MessageStore from "./MessageStore";
import * as NotificationStore from "./NotificationStore";
import * as PaymentStore from "./PaymentStore";
import * as PhotoStore from "./PhotoStore";
import * as TournamentStore from "./TournamentStore";
import * as TournamentWinnerStore from "./TournamentWinnerStore";
import * as UserStore from "./UserStore";

// The top-level state object
export interface IApplicationState {
	announcements: AnnouncementStore.IAnnouncementState,
    app: AppStore.IAppState,
    awards: AwardStore.IAwardState,
    committee: CommitteeStore.ICommitteeState,
	content: ContentStore.IContentState,
	documents: DocumentStore.IDocumentState,
	events: EventStore.IEventState,
	layout: LayoutStore.ILayoutState,
    matchPlay: MatchPlayStore.IMatchPlayState,
	memberClubs: MemberClubsStore.IMemberClubState,
    messaging: MessageStore.IMessageState,
	notifications: NotificationStore.INotificationState,
    payments: PaymentStore.IPaymentState,
    photos: PhotoStore.IPhotoState,
	session: UserStore.IUserState,
	tournament: TournamentStore.ITournamentState,
	winners: TournamentWinnerStore.ITournamentWinnerState,
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
	announcements: AnnouncementStore.AnnouncementsReducer,
    app: AppStore.AppReducer,
    awards: AwardStore.AwardReducer,
    committee: CommitteeStore.CommitteeReducer,
	content: ContentStore.ContentReducer,
	documents: DocumentStore.DocumentsReducer,
	events: EventStore.EventsReducer,
	layout: LayoutStore.reducer,
    matchPlay: MatchPlayStore.MatchPlaysReducer,
	memberClubs: MemberClubsStore.MemberClubsReducer,
    messaging: MessageStore.MessageReducer,
	notifications: NotificationStore.NotificationReducer,
    payments: PaymentStore.PaymentsReducer,
    photos: PhotoStore.PhotosReducer,
	session: UserStore.UsersReducer,
	tournament: TournamentStore.TournamentReducer,
	winners: TournamentWinnerStore.TournamentWinnersReducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
// export type IAppThunkAction<TAction> = (dispatch: (action: TAction) => void, getState: () => IApplicationState) => void;
