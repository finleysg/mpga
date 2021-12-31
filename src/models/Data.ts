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

export interface IRoleData {
  id: number;
  club_contact: number;
  role: string;
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

export interface IMembershipData {
  id: number;
  year: number;
  club: number;
  payment_date: string;
  payment_type: string;
  payment_code: string;
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

export interface IAwardWinnerData {
  id: number;
  year: number;
  award: number;
  winner: string;
  notes?: string;
}

export interface IAwardData {
  id: number;
  name: string;
  description: string;
  winners: IAwardWinnerData[];
}
