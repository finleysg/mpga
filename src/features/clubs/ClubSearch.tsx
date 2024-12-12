import React, { useRef } from "react";

import { Highlighter, Typeahead, TypeaheadRef } from "react-bootstrap-typeahead";

import useClubApi, { IClubData } from "./ClubApi";

export interface IClubSearchProps {
    OnSelect: (club: IClubData) => void;
}

const ClubSearch: React.FC<IClubSearchProps> = props => {
    const [{ isLoading, isError, data }] = useClubApi("", []);
    const typeaheadRef = useRef<TypeaheadRef>();

    return (
        <div className="mb-3">
            <Typeahead
                id="club-search"
                ref={typeaheadRef}
                placeholder="Search for club..."
                labelKey="name"
                isLoading={isLoading}
                minLength={3}
                renderMenuItemChildren={(option: IClubData, props) => (
                    <Highlighter key="name" search={props.text}>
                        {option.name}
                    </Highlighter>
                )}
                highlightOnlyResult={true}
                allowNew={false}
                onChange={selected => {
                    props.OnSelect(selected[0] as IClubData);
                    typeaheadRef.current?.clear();
                }}
                options={data}
            />
            {isError && <span className="text-danger">Doh!</span>}
        </div>
    );
};

export default ClubSearch;
