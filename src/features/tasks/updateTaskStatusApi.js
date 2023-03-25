import { apiSlice } from "../api/apiSlice";

export const updateTaskStatusApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: { status },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const taskIndex = draft.findIndex((task) => task.id === arg.id);
            if (taskIndex !== -1) {
              draft[taskIndex].status = arg.status;
            }
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const { useUpdateTaskStatusMutation } = updateTaskStatusApi;
