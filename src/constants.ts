const getStringFromConfig = (value: string) => {
	return (process && process.env && process.env[value]) ? process.env[value] as string : "ERROR!ERROR!";
};

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
}
