import { apiSlice } from "../api/apiSlice";

export const updateTaskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateTask: builder.mutation({
      query: ({ id, task }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: task,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: updatedTask } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
              const taskIndex = draft.findIndex(
                (task) => task.id === updatedTask.id
              );
              if (taskIndex !== -1) {
                draft[taskIndex] = updatedTask;
              }
            })
          );
          dispatch(
            apiSlice.util.updateQueryData("getTask", arg.id, (draft) => {
              Object.assign(draft, updatedTask);
            })
          );
        } catch (error) {
          console.error("Failed to update task:", error);
        }
      },
    }),
  }),
});

export const { useUpdateTaskMutation } = updateTaskApi;
