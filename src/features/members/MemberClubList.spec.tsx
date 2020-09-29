import useMemberClubs from "./UseMemberClubs";
import MemberClubList from "./MemberClubList";
import React from "react";
import { shallow } from "enzyme";
import Table from "react-bootstrap/Table";
import MemberClubRow from "./MemberClubRow";

jest.mock("./UseMemberClubs");

describe("<MemberClubList />", () => {
    it("renders a row for each club", () => {
        (useMemberClubs as any).mockReturnValue([{ id: 1 }, { id: 2 }]);

        const wrapper = shallow(<MemberClubList />);

        expect(wrapper.find(MemberClubRow)).toHaveLength(2);
    });
});
