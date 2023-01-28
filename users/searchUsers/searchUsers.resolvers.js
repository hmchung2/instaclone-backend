import client from "../../client";

export default {
  Query: {
    searchUsers: async (_, { keyword, lastId }) =>
      client.user.findMany({
        where: {
          OR: [
            {
              userName: {
                startsWith: keyword,
                mode: "insensitive",
              },
            },
            {
              userName: {
                endsWith: keyword,
                mode: "insensitive",
              },
            },
          ],
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      }),
  },
};
