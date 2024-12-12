import React from "react";

import Table from "react-bootstrap/Table";
import { CSVLink } from "react-csv";

import LoadingContainer from "../../components/LoadingContainer";
import { useGetContactsQuery } from "../../features/member-clubs/memberClubApi";
import { Contact } from "../../models/Clubs";

const ContactsReport: React.FC<{}> = () => {
  const { data: contacts, isLoading } = useGetContactsQuery();

  const headers = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "primaryPhone" },
    { label: "Address", key: "addressTxt" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "Zip", key: "zip" },
    { label: "Home Club", key: "homeClub" },
  ];

  const getData = () => {
    if (contacts && contacts.length > 0) {
      return contacts.map((c) => new Contact(c));
    }
    return [];
  };

  return (
    <LoadingContainer loading={isLoading}>
      <CSVLink data={getData()} headers={headers} enclosingCharacter={'"'} filename={"MpgaContacts.csv"}>
        Download
      </CSVLink>
      <Table striped size="sm">
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Home club</th>
          </tr>
        </thead>
        <tbody>
          {getData().map((contact: Contact) => (
            <tr key={contact.id}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.primaryPhone}</td>
              <td>{contact.addressTxt}</td>
              <td>{contact.city}</td>
              <td>{contact.state}</td>
              <td>{contact.zip}</td>
              <td>{contact.homeClub}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </LoadingContainer>
  );
};

export default ContactsReport;
