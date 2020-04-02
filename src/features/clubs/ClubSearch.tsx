import React from "react";
import { AsyncTypeahead, Highlighter } from "react-bootstrap-typeahead";
import useClubApi, { IClubData } from "./ClubApi";

export interface IClubSearchProps {
    OnSelect: (club: IClubData) => void;
}

const ClubSearch: React.FC<IClubSearchProps> = props => {
    const [{ isLoading, isError, data }, setQuery] = useClubApi("", []);
    let instance: any;

    return (
        <div className="mb-3">
            <AsyncTypeahead
                id="club-search"
                ref={typeahead => (instance = typeahead)}
                placeholder="Search for club..."
                labelKey="name"
                isLoading={isLoading}
                minLength={3}
                renderMenuItemChildren={(option, props) => (
                    <Highlighter key="name" search={props.text}>
                        {option.name}
                    </Highlighter>
                )}
                highlightOnlyResult={true}
                allowNew={false}
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
};

export default ClubSearch;
