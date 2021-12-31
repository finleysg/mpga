import { BaseQueryFn } from "@reduxjs/toolkit/query";

import { AxiosError, AxiosRequestConfig } from "axios";

import { Api } from "../http";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data }) => {
    try {
      const result = await Api({ url: baseUrl + url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      if (err) {
        return {
          error: JSON.stringify(err.response.data),
        };
      } else {
        return {
          error: JSON.stringify(axiosError),
        };
      }
    }
  };
