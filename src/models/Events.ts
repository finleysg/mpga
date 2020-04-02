import moment from "moment";
import { Model } from "./Model";
import { Policy } from "./Policies";
import { Contact, GolfCourse } from "./Clubs";

export class AwardWinner extends Model {
    year: number = 0;
    winner: string = "";
    notes: string = "";

    constructor(obj: any) {
        super();
        if (obj) {
            const winner = super.fromJson(obj);
            Object.assign(this, winner);
        }
    }
}

export class Award extends Model {
    name: string = "";
    description: string = "";
    winners: AwardWinner[] = [];
    winnerList: any;

    constructor(obj: any) {
        super();
        if (obj) {
            const award = super.fromJson(obj);
            if (obj["winners"]) {
                award.winners = obj["winners"].map((o: any) => new AwardWinner(o));                
            }
            Object.assign(this, award);
        }
    }
}

export class TournamentWinner extends Model {
    tournament: number = 0;
    year: number = 0;
    location: string = "";
    winner: string = "";
    winnerClub: string = "";
    coWinner?: string;
    coWinnerClub?: string;
    flightOrDivision: string = "";
    score: string = "";
    isNet: boolean = false;
    isMatch: boolean = false;
    notes?: string;

    constructor(json: any) {
        super();
        const obj = this.fromJson(json);
        Object.assign(this, obj);
    }

    get scoreFormatted(): string {
        if (this.isNet) {
            return this.score + "*";
        }
        return this.score;
    }

    get winnersFormatted(): string {
        if (this.isMatch) {
            return `${this.winner} defeated ${this.coWinner}`;
        }
        if (this.coWinner) {
            return `${this.winner} (${this.winnerClub}) / ${this.coWinner} (${this.coWinnerClub})`;
        }
        return `${this.winner} (${this.winnerClub})`;
    }
}

export interface ITournamentWinnerGroup {
    year: number;
    location: string;
    tournament: Tournament;
    winners: TournamentWinner[];
}

export class Tournament extends Model {
    name: string = "";
    systemName: string = "";
    description: string = "";
    winners: TournamentWinner[] = [];

    constructor(obj: any) {
        super();
        if (obj) {
            const tournament = this.fromJson(obj);
            if (obj && obj["winners"]) {
                tournament.winners = obj["winners"].map((o: any) => new TournamentWinner(o));
            }
            Object.assign(this, tournament);
        }
    }
}

export class EventChair extends Model {
    chair: Contact | undefined;

    fromJson(obj: any): any {
        const ec = super.fromJson(obj);
        ec.chair = new Contact(obj["chair"]);
        return ec;
    }
}

export class EventPoints extends Model {
    event: number = 0;
    place: number = 0;
    points: number = 0;
    ordinalPlace?: string;
}

export class EventPolicy extends Model {
    event: number = 0;
    policy: Policy | undefined;
    order: number | undefined;

    constructor(obj: any) {
        super();
        if (obj !== undefined) {
            const ep = super.fromJson(obj);
            ep.policy = new Policy(obj["policy"]);
            Object.assign(this, ep);
        }
    }
}

export class EventLink extends Model {
    event: number = 0;
    linkType: string = "";
    title: string = "";
    url: string = "";

    constructor(obj: any) {
        super();
        const link = super.fromJson(obj);
        Object.assign(this, link);
    }
}

export class EventDetail extends Model {
    location?: GolfCourse;
    tournament?: Tournament;
    name: string = "";
    shortName: string = "";
    description: string = "";
    rounds: number = 0;
    notes?: string;
    eventType: string = "";
    startDate: Date = new Date();
    registrationStart: Date = new Date();
    registrationEnd: Date = new Date();
    earlyRegistrationEnd: Date = new Date();
    policies?: EventPolicy[];
    chairs?: EventChair[];
    playerPoints?: EventPoints[];
    links?: EventLink[];
    eventDates: string = "";

    constructor(obj: any) {
        super();
        const evt = super.fromJson(obj);
        if (evt.startDate) {
            evt.location = new GolfCourse(obj["location"]);
            evt.tournament = new Tournament(obj["tournament"]);
            if (obj["policies"]) {
                evt.policies = obj["policies"].map((o: any) => new EventPolicy(o));
            }
            if (obj["chairs"]) {
                evt.chairs = obj["chairs"].map((o: any) => new EventChair().fromJson(o));
            }
            if (obj["player_points"]) {
                evt.playerPoints = obj["player_points"].map((o: any) => new EventPoints().fromJson(o));
            }
            if (obj["links"]) {
                evt.links = obj["links"].map((o: any) => new EventLink(o));
            }
            if (evt.rounds === 1) {
                evt.eventDates = evt.startDate.format("dddd, MMM D");
            } else {
                evt.eventDates = `${evt.startDate.format("dddd, MMM D")} - ${evt.startDate
                    .add(1, "d")
                    .format("dddd, MMM D")}`;
            }
        }
        Object.assign(this, evt);
    }

    get eventYear(): number {
        return moment(this.startDate).year();
    }

    get mostRecentYear(): number {
        // the most recent year with a completed tournament
        const eventYear = this.eventYear;
        const currentYear = moment().year();
        const startDate = moment(this.startDate);
        if (eventYear === currentYear) {
            if (startDate.isAfter(moment())) {
                return this.eventYear - 1;
            }
            return this.eventYear;
        } else if (eventYear < currentYear) {
            return this.eventYear;
        } else {
            return this.eventYear - 1;
        }
    }

    get canRegister(): boolean {
        return moment(this.registrationStart).isBefore(moment()) && moment(this.registrationEnd).isAfter(moment());
    }

    get registrationIsPending(): boolean {
        return moment(this.registrationStart).isAfter(moment());
    }

    get registrationIsClosed(): boolean {
        const endDate = moment(this.registrationEnd).clone();
        return endDate.add("d", 1).isBefore(moment());
    }
}
