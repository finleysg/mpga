export class AppConfig {

  eventCalendarYear: number = 0;
  matchPlayYear: number = 0;
  memberClubYear: number = 0;
  membershipDues: number = 0;
  stripePublicKey: string = "";

  constructor(json: any) {
    if (json && json.event_calendar_year) {
      this.eventCalendarYear = json.event_calendar_year;
      this.matchPlayYear = json.match_play_year;
      this.memberClubYear = json.member_club_year;
      this.membershipDues = json.membership_dues;
      this.stripePublicKey = json.stripe_public_key;
    }
  }
}
