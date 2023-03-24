import { apiSlice } from "../api/apiSlice";

export const addTaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
    }),
  }),
});

export const { useAddTaskMutation } = addTaskApi;
