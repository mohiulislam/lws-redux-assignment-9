import { apiSlice } from "../api/apiSlice";

export const addTaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: addedTask } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              draft.push(addedTask);
            })
          );
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useAddTaskMutation } = addTaskApi;
