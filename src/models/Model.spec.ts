import { IContactData } from "services/Data";

import { ClubContact, Contact, Membership } from "./Clubs";
import { Policy } from "./Policies";

describe("model serialization", () => {
  let policyJson: any;
  let clubContactJson: any;
  let membershipJson: any;

  beforeEach(() => {
    policyJson = {
      id: 123,
      policy_type: "T",
      name: "policy name",
      title: "policy title",
      description: "some text goes here",
    };
    clubContactJson = {
      id: 177,
      club: 5,
      contact: {
        id: 282,
        first_name: "Zac",
        last_name: "Uren",
        contact_type: "Men's Club",
        primary_phone: "651-343-8833",
        alternate_phone: "",
        email: "zuren79@hotmail.com",
        address_txt: "",
        city: "",
        state: "MN",
        zip: "",
        notes: null,
      },
      is_primary: false,
      use_for_mailings: false,
      roles: [
        {
          id: 1,
          club_contact: 177,
          role: "Match Play Captain",
        },
        {
          id: 2,
          club_contact: 177,
          role: "Men's Club President",
        },
      ],
    };
    membershipJson = {
      id: 1,
      year: 2017,
      club: {
        id: 1,
        name: "Baker National Golf Club",
      },
      payment_date: "2017-03-11T00:00:00.000000-05:00",
      payment_type: "CK",
      payment_code: "1003",
      notes: "",
    };
  });

  it("#fromJson creates a simple object", () => {
    const policy = new Policy(policyJson);
    expect(policy.policyType).toBe("T");
    expect(policy.id).toBe(123);
  });

  it("#prepJson creates Django property names", () => {
    const policy = new Policy({ id: 321, policy_type: "X", name: "test", title: "foo" });
    policy.id = 321;
    policy.policyType = "X";
    const json = JSON.stringify(policy.prepJson());
    expect(json).toBe('{"id":321,"policy_type":"X","name":"test","title":"foo","description":""}');
  });

  it("#fromJson creates a nested object", () => {
    const cc = new ClubContact(clubContactJson);
    expect(cc.isPrimary).toBeFalsy();
    expect(cc.id).toBe(177);
    expect(cc.contact!.lastName).toBe("Uren");
    expect(cc.roles?.length).toBe(2);
  });

  it("#prepJson creates nested Django property names", () => {
    const cc = new ClubContact({});
    cc.id = 1;
    cc.isPrimary = true;
    cc.contact = new Contact({});
    cc.contact.id = 11;
    cc.contact.lastName = "Brown";
    cc.contact.firstName = "Bob";
    cc.addRole("Test");
    const json = JSON.stringify(cc.prepJson());
    expect(json).toBe(
      '{"id":1,"contact":{"id":11,"first_name":"Bob","last_name":"Brown","email":"","send_email":false},"is_primary":true,"send_email":false,"use_for_mailings":false,"roles":[{"club_contact":1,"role":"Test"}]}',
    );
  });

  it("#fromJson handles date fields", () => {
    const mem = new Membership(membershipJson);
    const dt = new Date(mem.paymentDate);
    expect(dt instanceof Date && !isNaN(dt.valueOf())).toBeTruthy();
  });

  it("#ClubContact boolean fields default to false when serialized", () => {
    const cc = new ClubContact({ contact: { first_name: "Fred" } } as Partial<IContactData>);
    const json = cc.prepJson();
    expect(json["is_primary"].toString()).toBe("false");
    expect(json["use_for_mailings"].toString()).toBe("false");
  });
});
