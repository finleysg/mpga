import { useEffect, useReducer, useState } from "react";

import axios from "axios";

import constants from "../../app-constants";
import { ITag } from "../../models/Documents";

export interface ITagState {
  isLoading: boolean;
  isError: boolean;
  data: ITag[];
}

const tagApiReducer = (state: ITagState, action: any): ITagState => {
  switch (action.type) {
    case "GET_TAGS_INIT":
      return { ...state, isLoading: true, isError: false };
    case "GET_TAGS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "GET_TAGS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useTagApi = (
  initialQuery: string,
  initialData: ITag[],
): [ITagState, React.Dispatch<React.SetStateAction<string>>] => {
  const url = constants.ApiUrl + "/tags/";
  const [query, setQuery] = useState(initialQuery);
  const [state, dispatch] = useReducer(tagApiReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      if (query) {
        dispatch({ type: "GET_TAGS_INIT" });
        try {
          console.log("searching for " + query);
          const result = await axios(url + "?pattern=" + query);
          if (!didCancel) {
            dispatch({ type: "GET_TAGS_SUCCESS", payload: result.data });
          }
        } catch (error) {
          if (!didCancel) {
            dispatch({ type: "GET_TAGS_FAILURE" });
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

export default useTagApi;
