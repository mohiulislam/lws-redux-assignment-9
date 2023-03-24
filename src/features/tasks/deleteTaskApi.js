import { apiSlice } from "../api/apiSlice";

export const deleteApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            const index = draft.findIndex((task) => task.id === arg);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});
export const { useDeleteTaskMutation } = deleteApi;
