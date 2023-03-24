import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTaskQuery } = taskApi;
