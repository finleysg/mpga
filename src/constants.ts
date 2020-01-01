const getStringFromConfig = (value: string) => {
	return (process && process.env && process.env[value]) ? process.env[value] as string : "ERROR!ERROR!";
};

export class PolicyCodes {
	public static LocalRule: string = "LR";
    public static CodeOfConduct: string = "CC";
    public static AboutUs: string = "AU";
    public static SeniorMatchPlay: string = "SP";
    public static MatchPlay: string = "MP";
    public static Tournament: string = "TN";
    public static TournamentPlayerInformation: string = "TP";
    public static PaceOfPlay: string = "PP";
    public static Other: string = "OX";
}

export class PageCodes {
    public static Home: string = "H";
    public static TournamentBids: string = "B";
    public static AboutTheMPGA: string = "A";
    public static MatchPlay: string = "M";
    public static MemberClubs: string = "C";
    public static ClubEditing: string = "E";
    public static CodeOfConduct: string = "CC";
    public static OurMission: string = "OM";
    public static ExecutiveCommittee: string = "EC";
    public static MatchPlaySignup: string = "MP";
	public static FAQ: string = "FQ";
}

export default class Constants {
	// Use .env or .env.local to override REACT_APP_API_BASE_URL parameter 
    public static ServerUrl: string = getStringFromConfig("REACT_APP_SERVER_URL");
    public static ApiUrl: string = getStringFromConfig("REACT_APP_API_URL");
    public static AuthUrl: string = getStringFromConfig("REACT_APP_AUTH_URL");
    public static AdminUrl: string = getStringFromConfig("REACT_APP_ADMIN_URL");
    public static EventCalendarYear: number = Number(getStringFromConfig("REACT_APP_EVENT_CALENDAR_YEAR"));
	public static MatchPlayYear: number = Number(getStringFromConfig("REACT_APP_MATCH_PLAY_YEAR"));
	public static MemberClubYear: number = Number(getStringFromConfig("REACT_APP_MEMBER_CLUB_YEAR"));
	public static MembershipDues: number = Number(getStringFromConfig("REACT_APP_MEMBERSHIP_DUES"));
	public static StripePublicKey: number = Number(getStringFromConfig("REACT_APP_STRIPE_PUBLIC_KEY"));

	public static BearerTokenName: string = "mpga-token";
	public static CrsfCookieName: string = "crsftoken";
}
