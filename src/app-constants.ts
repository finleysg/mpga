export class PolicyCodes {
  public static LocalRule: string = "LR"
  public static CodeOfConduct: string = "CC"
  public static AboutUs: string = "AU"
  public static SeniorMatchPlay: string = "SP"
  public static MatchPlay: string = "MP"
  public static Tournament: string = "TN"
  public static TournamentPlayerInformation: string = "TP"
  public static PaceOfPlay: string = "PP"
  public static Other: string = "OX"
}

export class PageCodes {
  public static Home: string = "H"
  public static TournamentBids: string = "B"
  public static AboutTheMPGA: string = "A"
  public static MatchPlay: string = "M"
  public static MemberClubs: string = "C"
  public static ClubEditing: string = "E"
  public static ClubRegistration: string = "R"
  public static IndividualRegistration: string = "I"
  public static CodeOfConduct: string = "CC"
  public static OurMission: string = "OM"
  public static ExecutiveCommittee: string = "EC"
  public static MatchPlaySignup: string = "MP"
  public static FAQ: string = "FQ"
  public static PastPresidents: string = "PP"
}

export default class Constants {
  public static CurrentYear: number = new Date().getFullYear()
  public static ServerUrl: string = import.meta.env.VITE_SERVER_URL
  public static ApiUrl: string = import.meta.env.VITE_API_URL
  public static AuthUrl: string = import.meta.env.VITE_AUTH_URL
  public static AdminUrl: string = import.meta.env.VITE_ADMIN_URL
  // public static EventCalendarYear: number = Number(
  //   import.meta.env.VITE_EVENT_CALENDAR_YEAR
  // )
  // public static MatchPlayYear: number = Number(import.meta.env.VITE_MATCH_PLAY_YEAR)
  // public static MemberClubYear: number = Number(import.meta.env.VITE_MEMBER_CLUB_YEAR)
  // public static MembershipDues: number = Number(import.meta.env.VITE_MEMBERSHIP_DUES)
  // public static StripePublicKey: string = import.meta.env.VITE_STRIPE_PUBLIC_KEY

  public static Mode: string = import.meta.env.VITE_MODE
}
