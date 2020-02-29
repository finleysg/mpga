import moment from 'moment';
import { Model } from './Model';
import { IContactData } from '../features/contacts/ContactApi';

export class Address {
  addressTxt: string | undefined;
  city: string | undefined;
  state: string | undefined;
  zip: string | undefined;

  get isComplete(): boolean {
    return this.addressTxt!.length > 0 && this.city!.length > 0 && this.state!.length > 0 && this.zip!.length > 0;
  }
}

export class GolfCourse extends Model {
  name: string = "";
  addressTxt?: string;
  city?: string;
  state?: string;
  zip?: string;
  website?: string;
  logoUrl?: string;
  email?: string;
  phone?: string;
  notes?: string;

  constructor(obj: any) {
    super();
    const course = this.fromJson(obj);
    Object.assign(this, course);
  }

  updateAddress(addr: Address): void {
    this.addressTxt = addr.addressTxt;
    this.city = addr.city;
    this.state = addr.state;
    this.zip = addr.zip;
  }

  copyAddress(): Address {
    const { addressTxt, city, state, zip } = this;
    return Object.assign(new Address(), { addressTxt, city, state, zip });
  }
}

export class Contact extends Model {
  firstName: string = "";
  lastName: string = "";
  contactType: string = "";
  primaryPhone?: string;
  alternatePhone?: string;
  email: string = "";
  addressTxt?: string;
  city?: string;
  state?: string;
  zip?: string;
  notes?: string;

  constructor(obj: any) {
    super();
    const contact = this.fromJson(obj);
    Object.assign(this, contact);
  }

  get name(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  updateAddress(addr: Address): void {
    this.addressTxt = addr.addressTxt;
    this.city = addr.city;
    this.state = addr.state;
    this.zip = addr.zip;
  }

  copyAddress(): Address {
    const { addressTxt, city, state, zip } = this;
    return Object.assign(new Address(), { addressTxt, city, state, zip });
  }
}

export interface IClub {
  id: number;
  name: string;
  systemName: string;
  isCurrent: boolean;
  website: string;
  location: GolfCourse;
  size?: number;
  president?: string;
}

export class Club extends Model {
  name: string = "";
  systemName: string = "";
  website?: string;
  type2: boolean = false;
  notes?: string;
  size?: number;
  golfCourse?: GolfCourse;
  clubContacts: ClubContact[] = [];
  years: number[] = [];  // years for which we have membership data

  constructor(obj: any) {
    super();
    if (obj) {
      const club = super.fromJson(obj);
      club.golfCourse = new GolfCourse(obj['golf_course']);
      if (obj['club_contacts']) {
        club.clubContacts = obj['club_contacts'].map((cc: any) => new ClubContact(cc));
      }
      Object.assign(this, club);
    }
  }

  addContact(contact: IContactData): ClubContact {
    const cc = new ClubContact({'contact': contact});
    cc.club = this.id;
    cc.id = 0;
    if (!this.clubContacts) {
      this.clubContacts = [];
    }
    this.clubContacts.unshift(cc);
    return cc;
  }

  prepJson(): any {
    return {
      'name': this.name,
      'website': this.website,
      'type_2': this.type2,
      'notes': this.notes,
      'size': this.size,
      'golf_course': this.golfCourse!.prepJson(),
      'club_contacts': []  // contacts are managed separately
    };
  }
}

export class Membership extends Model {
  year: number = 0;
  club: number = 0;
  paymentDate: string = "";
  paymentType: string = "";
  paymentCode?: string;
  createDate: Date = new Date();
  notes?: string;

  constructor(obj: any) {
    super();
    if (obj) {
      const mem = super.fromJson(obj);
      mem.paymentDate = obj.payment_date;
      Object.assign(this, mem);
    }
  }
}

export class Team extends Model {
  localId: string = Math.floor(Math.random() * 1000).toString();
  year: number | undefined;
  club: Club | undefined;
  groupName: string | undefined;
  isSenior: boolean | undefined;
  notes: string | undefined;
  deleted: boolean | undefined;

  constructor(obj: any) {
    super();
    if (obj) {
      const team = super.fromJson(obj);
      team.club = new Club(obj['club']);
      if (!team.club || !team.club.id) {
        // Only have an id, not an object
        console.log('only a club id is present');
        team.club = new Club({id: obj['club']});
      }
      Object.assign(this, team);
    }
  }

  static divisions(): string[] {
    return ['12 Man', '16 Man A', '16 Man B', '20 Man'];
  }

  static seniorDivisions(): string[] {
    return ['8 Man A', '8 Man B'];
  }

  prepJson(): any {
    const json = this.snakeCase(this);
    json.is_senior = this.isSenior ? this.isSenior : false;
    json.club = this.club!.id;
    return json;
  }

  captainNames(senior: boolean): string {
    const captains = this.captains(senior);
    return captains ? captains.map(c => `${c.contact!.firstName} ${c.contact!.lastName}`).join(', ') : '';
  }

  captains(senior: boolean): ClubContact[] {
    if (this.club && this.club.clubContacts) {
      if (senior) {
        return this.club.clubContacts
          .filter(c => c.isSeniorCaptain);
      }
      return this.club.clubContacts
        .filter(c => c.isCaptain);
    }
    return [];
  }
}

export class ClubContactRole extends Model {
  clubContact: number | undefined;
  role: string | undefined;

  constructor(obj: any) {
    super();
    if (obj) {
      const ccr = super.fromJson(obj);
      Object.assign(this, ccr);
    }
  }
}

export class ClubContact extends Model {
  club: number | undefined;
  contact: Contact | undefined;
  isPrimary = false;
  useForMailings = false;
  deleted = false;
  dirty = false;
  roles: ClubContactRole[] = [];
  notes: string | undefined;

  constructor(obj: any) {
    super();
    if (obj) {
      const cc = super.fromJson(obj);
      cc.contact = new Contact(obj['contact']);
      if (obj['roles']) {
        cc.roles = obj['roles'].map((r: any) => new ClubContactRole(r));
      }
      Object.assign(this, cc);
    }
  }

  addRole(name: string): void {
    if (!this.roles) {
      this.roles = [];
    }
    const role = new ClubContactRole({ 'role': name, 'clubContact': this.id });
    this.roles.push(role);
  }

  clearRoles(): void {
    this.roles = [];
  }

  get isCaptain(): boolean {
    return this.roles && this.roles.some(r => r.role === 'Match Play Captain');
  }

  get isSeniorCaptain(): boolean {
    return this.roles && this.roles.some(r => r.role === 'Sr. Match Play Captain');
  }

  // get maybeCaptain(): boolean {
  //   return !this.roles || this.roles.length === 0 || this.roles.some(r => r.role.indexOf('Captain') > 0);
  // }

  prepJson(): any {
    const cc = super.snakeCase(this);
    cc.roles = this.roles.map(r => r.prepJson());
    cc.contact = this.contact!.prepJson();
    return cc;
  }
}

export class ClubValidationMessage {
  level: string | undefined;
  message: string | undefined;

  constructor(msg: string[]) {
    if (msg) {
      this.level = msg[0];
      this.message = msg[1];
    }
  }
}

export class ExecutiveCommittee extends Model {
  contact: Contact | undefined;
  role: string | undefined;
  homeClub: string | undefined;

  constructor(obj: any) {
    super();
    if (obj) {
      const ec = super.fromJson(obj);
      ec.contact = new Contact(obj['contact']);
      Object.assign(this, ec);
    }
  }
}

export class Affiliate extends Model {
  organization: string | undefined;
  website: string | undefined;
  notes: string | undefined;

  constructor(obj: any) {
    super();
    if (obj) {
      const affiliate = super.fromJson(obj);
      Object.assign(this, affiliate);
    }
  }
}

export class MatchResult extends Model {
  groupName: string | undefined;
  matchDate: moment.Moment | undefined;
  homeTeam: number | undefined;
  awayTeam: number | undefined;
  homeTeamName: string | undefined;
  awayTeamName: string | undefined;
  homeTeamScore: number | undefined;
  awayTeamScore: number | undefined;
  enteredBy: string | undefined;
  forfeit: boolean | undefined;
  notes: string | undefined;

  constructor(obj: any) {
    super();
    if (obj) {
      const result = super.fromJson(obj);
      Object.assign(this, result);
    }
  }

  prepJson(): any {
    return {
      'group_name': this.groupName,
      'match_date': this.matchDate!.format('YYYY-MM-DD'),
      'home_team': this.homeTeam,
      'away_team': this.awayTeam,
      'home_team_score': this.homeTeamScore,
      'away_team_score': this.awayTeamScore,
      'entered_by': this.enteredBy,
      'forfeit': this.forfeit ? true : false,
      'notes': this.notes
    };
  }

  // get winner(): string {
  //   let winner = '';
  //   if (+this.homeTeamScore > +this.awayTeamScore) {
  //     winner = this.homeTeamName;
  //   } else if (+this.awayTeamScore > +this.homeTeamScore) {
  //     winner = this.awayTeamName;
  //   }
  //   return winner;
  // }
}
