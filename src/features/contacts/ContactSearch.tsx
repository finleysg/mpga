import React, { useRef } from "react";

import { AsyncTypeahead, Highlighter } from "react-bootstrap-typeahead";

import { Contact } from "../../models/Clubs";
import useContactApi from "./ContactApi";

export interface IContactSearchProps {
  allowNew: boolean;
  OnSelect: (contact: Contact) => void;
}

const ContactSearch: React.FC<IContactSearchProps> = (props) => {
  const [{ isLoading, isError, data }, setQuery] = useContactApi("", []);
  const instance = useRef<AsyncTypeahead<Contact>>();

  return (
    <div className="mb-3">
      <p>First search for a contact already in our database. If you don't find one, select "Create new contact".</p>
      <AsyncTypeahead
        id="contact-search"
        ref={(typeahead) => (instance.current = typeahead)}
        placeholder="Search for contact..."
        labelKey="name"
        isLoading={isLoading}
        minLength={3}
        renderMenuItemChildren={(option, props) => (
          <>
            <Highlighter key="name" search={props.text}>
              {option.name}
            </Highlighter>
            <div key="email">
              <small>Email: {option.email}</small>
            </div>
          </>
        )}
        highlightOnlyResult={!props.allowNew}
        newSelectionPrefix={"Create new contact: "}
        allowNew={props.allowNew}
        onSearch={(query) => {
          setQuery(query);
        }}
        onChange={(selected) => {
          props.OnSelect(selected[0]);
          if (instance?.current) {
            instance.current.clear();
          }
        }}
        options={data}
      />
      {isError && <span className="text-danger">Doh!</span>}
    </div>
  );
};

export default ContactSearch;
