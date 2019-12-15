import moment from 'moment';
import { Model } from './Model';
import { Policy } from './Policies';
import { Contact, GolfCourse } from './Clubs';

export class AwardWinner extends Model {
  year: number | undefined;
  winner: string | undefined;
  notes: string | undefined;

  constructor(obj: any) {
    super();
    if (obj) {
      const winner = super.fromJson(obj);
      Object.assign(this, winner);
    }
  }
}

export class Award extends Model {
  name: string | undefined;
  description: string | undefined;
  winners: AwardWinner[] | undefined;
  winnerList: any;

  constructor(obj: any) {
    super();
    if (obj) {
      const award = super.fromJson(obj);
      award.winners = obj['winners'].map((o: any) => new AwardWinner(o));
      Object.assign(this, award);
    }
  }
}

export class TournamentWinner extends Model {
  year: number | undefined;
  location: string | undefined;
  winner: string | undefined;
  winnerClub: string | undefined;
  coWinner: string | undefined;
  coWinnerClub: string | undefined;
  flightOrDivision: string | undefined;
  score: string | undefined;
  isNet: boolean | undefined;
  isMatch: boolean | undefined;
  notes: string | undefined;

  constructor(json: string) {
    super();
    const obj = this.fromJson(json);
    Object.assign(this, obj);
  }

  winnersFormatted(): string {
    if (this.isMatch) {
      return `${this.winner} defeated ${this.coWinner}`;
    }
    if (this.coWinner) {
      return `${this.winner} (${this.winnerClub}) / ${this.coWinner} (${this.coWinnerClub})`;
    }
    return `${this.winner} (${this.winnerClub})`;
  }
}

export class Tournament extends Model {
  name: string | undefined;
  description: string | undefined;
  winners: TournamentWinner[] | undefined;

  constructor(obj: any) {
    super();
    if (obj) {
      const tournament = this.fromJson(obj);
      if (obj && obj['winners']) {
        tournament.winners = obj['winners'].map((o: any) => new TournamentWinner(o));
      }
      Object.assign(this, tournament);
    }
  }
}

export class EventChair extends Model {
  chair: Contact | undefined;

  fromJson(obj: any): any {
    const ec = super.fromJson(obj);
    ec.chair = new Contact(obj['chair']);
    return ec;
  }
}

export class EventPoints extends Model {
  place: number | undefined;
  points: number | undefined;
  ordinalPlace: string | undefined;
}

export class EventPolicy extends Model {
  policy: Policy | undefined;
  order: number | undefined;

  fromJson(obj: any): any {
    const ep = super.fromJson(obj);
    ep.policy = new Policy().fromJson(obj['policy']);
    return ep;
  }
}

export class EventDivision extends Model {
  division: string | undefined;
}

export class EventFee extends Model {
  feeType: string | undefined;
  amount: number | undefined;
  ecOnly: boolean | undefined;
}

export class EventLink extends Model {
  linkType: string | undefined;
  title: string | undefined;
  url: string | undefined;
}

export class EventDetail extends Model {
  location: GolfCourse | undefined;
  name: string | undefined;
  shortName: string | undefined;
  description: string | undefined;
  rounds: number | undefined;
  // minimumSignupGroupSize: number | undefined;
  // maximumSignupGroupSize: number | undefined;
  tournament: number | undefined;
  // registrationType: string | undefined;
  notes: string | undefined;
  eventType: string | undefined;
  startDate: moment.Moment | undefined;
  registrationStart: moment.Moment | undefined;
  registrationEnd: moment.Moment | undefined;
  earlyRegistrationEnd: moment.Moment | undefined;
  // registrationMaximum: number | undefined;
  policies: EventPolicy[] | undefined;
  chairs: EventChair[] | undefined;
  playerPoints: EventPoints[] | undefined;
  divisions: EventDivision[] | undefined;
  links: EventLink[] | undefined;
  fees: EventFee[] | undefined;
  year: number | undefined;
  eventDates: string | undefined;

  constructor(obj: any) {
    super();
    const evt = super.fromJson(obj);
    if (obj) {
      evt.location = new GolfCourse(obj['location']);
      evt.year = evt.startDate.year();
      if (obj['policies']) {
        evt.policies = obj['policies'].map((o: any) => new EventPolicy().fromJson(o));
      }
      if (obj['chairs']) {
        evt.chairs = obj['chairs'].map((o: any) => new EventChair().fromJson(o));
      }
      if (obj['player_points']) {
        evt.playerPoints = obj['player_points'].map((o: any) => new EventPoints().fromJson(o));
      }
      if (obj['divisions']) {
        evt.divisions = obj['divisions'].map((o: any) => new EventDivision().fromJson(o));
      }
      if (obj['links']) {
        evt.links = obj['links'].map((o: any) => new EventLink().fromJson(o));
      }
      if (obj['fees']) {
        evt.fees = obj['fees'].map((o: any) => new EventFee().fromJson(o));
      }
      if (evt.rounds === 1) {
        evt.eventDates = evt.startDate.format('dddd, MMM D');
      } else {
        evt.eventDates = `${evt.startDate.format('dddd, MMM D')} - ${evt.startDate.add(1, 'd').format('dddd, MMM D')}`;
      }
    }
    Object.assign(this, evt);
  }

  get currentTournamentYear(): number {
    return this.startDate!.year();
  }

  get mostRecentYear(): number {
    // the most recent year with a completed tournament
    const eventYear = this.startDate!.year();
    const currentYear = moment().year();
    // const endDate = this.startDate.add(this.rounds - 1, 'days');
    if (eventYear === currentYear) {
      if (this.startDate!.isAfter(moment())) {
        return this.startDate!.year() - 1;
      }
      return this.startDate!.year();
    } else if (eventYear < currentYear) {
      return this.startDate!.year();
    } else {
      return this.startDate!.year() - 1;
    }
  }

  get canRegister(): boolean {
    return this.registrationStart!.isBefore(moment()) &&
      this.registrationEnd!.isAfter(moment());
  }

  get registrationIsPending(): boolean {
    return this.registrationStart!.isAfter(moment());
  }

  get registrationIsClosed(): boolean {
    const endDate = this.registrationEnd!.clone();
    return endDate.add(1, 'd').isBefore(moment());
  }
}
