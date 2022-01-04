export interface IAffiliateData {
  id: number;
  organization: string;
  website: string;
  notes?: string;
}

export interface IAnnouncementData {
  id: number;
  text: string;
  title: string;
  starts: string;
  expires: string;
  external_url?: string;
  external_name?: string;
  document?: number;
}

export interface IAwardData {
  id: number;
  name: string;
  description: string;
  winners: IAwardWinnerData[];
}

export interface IAwardWinnerData {
  id: number;
  year: number;
  award: number;
  winner: string;
  notes?: string;
}

export interface IClubData {
  id: number;
  name: string;
  system_name: string;
  website?: string;
  notes?: string;
  size?: number;
  golf_course?: IGolfCourseData;
  club_contacts?: IClubContactData[];
}

export interface IClubContactData {
  id: number;
  club: number;
  contact: IContactData;
  is_primary: boolean;
  use_for_mailings: boolean;
  roles: IRoleData[];
  notes?: string;
}

export interface ICommitteeData {
  id: number;
  role: string;
  home_club: number;
  home_club_name?: string;
  contact: IContactData;
}

export interface IContactData {
  id: number;
  first_name: string;
  last_name: string;
  primary_phone: string;
  alternate_phone?: string;
  email: string;
  send_email: boolean;
  home_club?: string;
  address_txt?: string;
  city?: string;
  state?: string;
  zip?: string;
  notes?: string;
}

export interface IContactMessageData {
  id: number;
  message_type: string;
  course: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  event?: number;
  message: string;
  message_date: string;
}

export interface IDocumentData {
  id: number;
  year: number;
  title: string;
  document_type: string;
  file: string;
  tournament?: number;
  created_by: string;
  last_update: string;
  tags: IDocumentTagData[];
}

export interface IDocumentTagData {
  id: number;
  tag: ITagData;
}

export interface IEventChairData {
  id: number;
  chair: IContactData;
}

export interface IEventData {
  id: number;
  location: number;
  tournament: number;
  name: string;
  description: string;
  rounds: number;
  notes?: string;
  event_type: string;
  start_date: string;
  registration_start: string;
  registration_end: string;
  early_registration_end: string;
}

export interface IEventDetailData {
  id: number;
  location: IGolfCourseData;
  tournament: ITournamentData;
  name: string;
  description: string;
  rounds: number;
  notes?: string;
  event_type: string;
  start_date: string;
  registration_start: string;
  registration_end: string;
  early_registration_end: string;
  policies: IEventPolicyData[];
  chairs: IEventChairData[];
  player_points: IEventPointsData[];
  links: IEventLinkData[];
}

export interface IEventLinkData {
  id: number;
  event: number;
  link_type: string;
  title: string;
  url: string;
}

export interface IEventPointsData {
  id: number;
  event: number;
  place: number;
  points: number;
  ordinal_place: string;
}

export interface IEventPolicyData {
  id: number;
  event: number;
  policy: IPolicyData;
  order: number;
}

export interface IGolfCourseData {
  id: number;
  name: string;
  address_txt?: string;
  city: string;
  state?: string;
  zip?: string;
  website?: string;
  email?: string;
  phone?: string;
  logo_url?: string;
  notes?: string;
}

export interface ILandingPageData {
  id: number;
  page_type: string;
  title: string;
  content: string;
}

export interface IMatchPlayResultData {
  id: number;
  group_name: string;
  match_date: string;
  home_team: number;
  home_team_name?: string;
  away_team: number;
  away_team_name?: string;
  home_team_score: number;
  away_team_score: number;
  entered_by: string;
  forfeit: boolean;
  notes?: string;
}

export interface IMembershipData {
  id: number;
  year: number;
  club: number;
  payment_date: string;
  payment_type: string;
  payment_code: string;
  notes?: string;
}

export interface IPhotoData {
  id: number;
  year: number;
  caption?: string;
  photo_type: string;
  thumbnail_url: string;
  image_url: string;
  raw_image: string;
  last_update: string;
  created_by: string;
  tournament?: number;
  tags: IPhotoTagData[];
}

export interface IPhotoTagData {
  id: number;
  tag: ITagData;
}

export interface IPolicyData {
  id: number;
  policy_type: string;
  name: string;
  title: string;
  description: string;
}

export interface IRoleData {
  id: number;
  club_contact: number;
  role: string;
}

export interface ITagData {
  id: number;
  name: string;
}

export interface ITeamData {
  id: number;
  year: number;
  club: number;
  group_name: string;
  is_senior: boolean;
  notes?: string;
}

export interface ITournamentData {
  id: number;
  name: string;
  system_name: string;
  description: string;
}

export interface ITournamentWinnerData {
  id: number;
  year: number;
  tournament: number;
  location: string;
  winner: string;
  winner_club: string;
  co_winner?: string;
  co_winner_club?: string;
  flight_or_division: string;
  score: string;
  is_net: boolean;
  is_match: boolean;
  notes?: string;
}

export interface IUserData {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_authenticated: boolean;
  is_staff: boolean;
  is_active: boolean;
  groups: string[];
}
