import React from 'react';
import { AsyncTypeahead, Highlighter } from 'react-bootstrap-typeahead';
import useContactApi, { IContactData } from './ContactApi';

export interface IContactSearchProps {
    allowNew: boolean,
    OnSelect: (contact: IContactData) => void,
}

const ContactSearch: React.FC<IContactSearchProps> = (props) => {
    const [{ isLoading, isError, data }, setQuery] = useContactApi("", []);
    let instance: any;

    const _renderContact = (option: any, props: any, index: any) => {
        return [
            <>
                <Highlighter key="last_name" search={props.text}>
                    {option.first_name + " " + option.last_name}
                </Highlighter>
                <div key="email">
                    <small>Email: {option.email}</small>
                </div>
            </>
        ];
    }

    return (
        <div>
            <p>
                First search for a contact already in our database. If you don't find
                one, select "Create new contact".
            </p>
            <AsyncTypeahead
                id="contact-search"
                ref={(typeahead) => instance = typeahead}
                placeholder="Search for contact..."
                isLoading={isLoading}
                minLength={3}
                renderMenuItemChildren={_renderContact}
                highlightOnlyResult={true}
                selectHintOnEnter={true}
                newSelectionPrefix={"Create new contact: "}
                allowNew={props.allowNew}
                onSearch={query => {
                    setQuery(query);
                }}
                onChange={selected => {
                    props.OnSelect(selected[0]);
                    instance.getInstance().clear();
                }}
                options={data}
            />
            {isError && <span className="text-danger">Doh!</span>}
        </div>
    );
}

export default ContactSearch;
