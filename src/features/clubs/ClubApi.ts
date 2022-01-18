import { useEffect, useReducer, useState } from "react";

import constants from "../../app-constants";
import { Api } from "../../http";

// raw club data received from the api
export interface IClubData {
  id: number;
  name: string;
  system_name: string;
  website: string;
  size: number;
}

export interface IClubDataState {
  isLoading: boolean;
  isError: boolean;
  data: IClubData[];
}

const clubApiReducer = (state: IClubDataState, action: any): IClubDataState => {
  switch (action.type) {
    case "GET_CLUBS_INIT":
      return { ...state, isLoading: true, isError: false };
    case "GET_CLUBS_SUCCESS":
      const clubs = action.payload;
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: clubs,
      };
    case "GET_CLUBS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error("That's not right!");
  }
};

const useClubApi = (
  initialQuery: string,
  initialData: IClubData[],
): [IClubDataState, React.Dispatch<React.SetStateAction<string>>] => {
  const url = constants.ApiUrl + "/clubs/";
  const [query, setQuery] = useState(initialQuery);
  const [state, dispatch] = useReducer(clubApiReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      if (query) {
        dispatch({ type: "GET_CLUBS_INIT" });
        try {
          const result = await Api.get(url + "?pattern=" + query);
          if (!didCancel) {
            dispatch({ type: "GET_CLUBS_SUCCESS", payload: result.data });
          }
        } catch (error) {
          if (!didCancel) {
            dispatch({ type: "GET_CLUBS_FAILURE" });
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

export default useClubApi;
