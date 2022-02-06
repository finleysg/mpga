import React, { useEffect, useReducer, useState } from "react";

import { Api } from "../../http";

export interface IRoleState {
  isLoading: boolean;
  isError: boolean;
  data: string[];
}

const RoleApiReducer = (state: IRoleState, action: any): IRoleState => {
  switch (action.type) {
    case "GET_ROLES_INIT":
      return { ...state, isLoading: true, isError: false };
    case "GET_ROLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.map((d) => d.name),
      };
    case "GET_ROLES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useRoleApi = (
  initialQuery: string,
  initialData: string[],
): [IRoleState, React.Dispatch<React.SetStateAction<string>>] => {
  const url = "/roles/";
  const [query, setQuery] = useState(initialQuery);
  const [state, dispatch] = useReducer(RoleApiReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      if (query) {
        dispatch({ type: "GET_ROLES_INIT" });
        try {
          const result = await Api.get(url + "?pattern=" + query);
          if (!didCancel) {
            dispatch({ type: "GET_ROLES_SUCCESS", payload: result.data });
          }
        } catch (error) {
          if (!didCancel) {
            dispatch({ type: "GET_ROLES_FAILURE" });
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

export default useRoleApi;
