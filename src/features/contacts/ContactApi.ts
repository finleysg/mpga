import { useEffect, useReducer, useState } from "react";

import constants from "../../constants";
import { Api } from "../../http";
import { Contact } from "../../models/Clubs";
import { IContactData } from "../../services/Data";

export interface IContactSearchState {
  isLoading: boolean;
  isError: boolean;
  data: Contact[];
}

const contactApiReducer = (state: IContactSearchState, action: any): IContactSearchState => {
  switch (action.type) {
    case "GET_CONTACTS_INIT":
      return { ...state, isLoading: true, isError: false };
    case "GET_CONTACTS_SUCCESS":
      const contacts = action.payload.map((c: IContactData) => {
        return new Contact(c);
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

const useContactApi = (
  initialQuery: string,
  initialData: Contact[],
): [IContactSearchState, React.Dispatch<React.SetStateAction<string>>] => {
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
