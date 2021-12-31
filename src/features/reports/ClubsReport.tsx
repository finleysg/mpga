import React, { useEffect } from "react";

import Table from "react-bootstrap/Table";
import { CSVLink } from "react-csv";
import { useDispatch, useSelector } from "react-redux";

import constants from "../../constants";
import { Club, Membership } from "../../models/Clubs";
import { IApplicationState } from "../../store";
import ReportActions from "../../store/ReportActions";

interface IClubReportProps {
  current: boolean;
}

const ClubsReport: React.FunctionComponent<IClubReportProps> = (props) => {
  const { current } = props;
  const dispatch = useDispatch();
  const reportData = useSelector((state: IApplicationState) => state.reports);
  const clubList = current ? reportData.memberClubs : reportData.clubs;

  useEffect(() => {
    if (!clubList || clubList.length === 0) {
      if (current) {
        dispatch(ReportActions.GetMemberships(constants.MemberClubYear));
      } else {
        dispatch(ReportActions.GetClubs());
      }
    }
  }, [dispatch, clubList, current]);

  const paymentMethod = (membership: Membership): string => {
    if (membership.paymentType === "CK") {
      return `Check (${membership.paymentCode})`;
    } else if (membership.paymentType === "OL") {
      return "Online";
    } else {
      return "Other";
    }
  };

  const getHeaders = () => {
    const headers = [
      { label: "Name", key: "name" },
      { label: "System Name", key: "systemName" },
      { label: "Home Course", key: "homeCourse" },
      { label: "Members", key: "members" },
    ];
    if (current) {
      headers.push({ label: "Date", key: "paymentDate" });
      headers.push({ label: "Payment Method", key: "paymentMethod" });
    }
    return headers;
  };

  const getData = () => {
    if (current) {
      return clubList.map((club: Club) => {
        return {
          name: club.name,
          systemName: club.systemName,
          homeCourse: club.golfCourse?.name,
          members: club.size,
          paymentDate: club.membershipData?.paymentDate,
          paymentMethod: paymentMethod(club.membershipData!),
        };
      });
    }
    return clubList.map((club: Club) => {
      return {
        name: club.name,
        systemName: club.systemName,
        homeCourse: club.golfCourse?.name,
        members: club.size,
      };
    });
  };

  return (
    <div>
      <CSVLink
        data={getData()}
        headers={getHeaders()}
        enclosingCharacter={'"'}
        filename={current ? "CurrentMpgaClubs.csv" : "MpgaClubs.csv"}
      >
        Download
      </CSVLink>
      <Table striped size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>System name</th>
            <th>Home course</th>
            <th>Members</th>
            {current && <th>Date</th>}
            {current && <th>Payment Method</th>}
          </tr>
        </thead>
        <tbody>
          {clubList.map((club: Club) => (
            <tr key={club.id}>
              <td>{club.name}</td>
              <td>{club.systemName}</td>
              <td>{club.golfCourse?.name}</td>
              <td>{club.size}</td>
              {current && <td>{club.membershipData?.paymentDate}</td>}
              {current && <td>{paymentMethod(club.membershipData!)}</td>}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ClubsReport;
