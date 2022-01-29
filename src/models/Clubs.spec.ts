// {id: 216, year: 2019, club: 5, group_name: "8 Man A", is_senior: true, notes: null}
import { IContactData } from "services/Data";

import { Club, Team } from "./Clubs";

describe("model serialization", () => {
  let teamJson: any;

  beforeEach(() => {
    teamJson = {
      id: 216,
      year: 2019,
      club: 5,
      group_name: "policy 8 Man A",
      is_senior: true,
      notes: "some text goes here",
    };
  });

  it("#team constructor creates a club with an id", () => {
    const team = new Team(teamJson);
    expect(team.club).toBeDefined();
    // expect(team.club).toBe(5);
  });

  it("#club.addContact assigns its own id to the new contact", () => {
    const club = new Club({ id: 5, name: "test" });
    const cc = club.addContact({ first_name: "Joe", last_name: "Cool" } as IContactData);
    expect(cc.club).toBe(5);
  });
});
