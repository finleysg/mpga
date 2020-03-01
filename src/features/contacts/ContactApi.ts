import { useEffect, useReducer, useState } from 'react';

import constants from '../../constants';
import { Api } from '../../http';

// raw contact data received from the api
export interface IContactData {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    contact_type: string;
    primary_phone: string;
    alternate_phone: string;
    email: string;
    address_txt: string;
    city: string;
    state: string;
    zip: string;
    notes: string;
}
  
export interface IContactDataState {
    isLoading: boolean,
    isError: boolean,
    data: IContactData[],
};

const contactApiReducer = (state: IContactDataState, action: any): IContactDataState => {
    switch (action.type) {
        case "GET_CONTACTS_INIT":
            return { ...state, isLoading: true, isError: false };
        case "GET_CONTACTS_SUCCESS":
            const contacts = action.payload.map((c: IContactData) => {
                c.name = c.first_name + " " + c.last_name;
                return c;
            });
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: contacts,
            };
        case "GET_CONTACTS_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error("That's not right!");
    }
};

const useContactApi = (initialQuery: string, initialData: IContactData[]): [IContactDataState, React.Dispatch<React.SetStateAction<string>>] => {
    
    const url = constants.ApiUrl + "/contacts/";
    const [query, setQuery] = useState(initialQuery);
    const [state, dispatch] = useReducer(contactApiReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    });

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            if (query) {
                dispatch({ type: "GET_CONTACTS_INIT" });
                try {
                    console.log("searching for " + query);
                    const result = await Api.get(url + "?pattern=" + query);
                    if (!didCancel) {
                        dispatch({ type: "GET_CONTACTS_SUCCESS", payload: result.data });
                    }
                } catch (error) {
                    if (!didCancel) {
                        dispatch({ type: "GET_CONTACTS_FAILURE" });
                    }
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [url, query]);

    return [state, setQuery];
};

export default useContactApi;
