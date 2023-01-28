import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { userName, page }) => {
      const followers = await client.user
        .findUnique({
          where: { userName },
        })
        .followers({
          take: 5,
          skip: (page - 1) * 5,
        });

      //   const bFollowers = await client.user.findMany({
      //     where: {
      //       following: {
      //         some: {
      //           userName,
      //         },
      //       },
      //     },
      //   });

      //   console.log(bFollowers);

      return {
        ok: true,
        followers,
      };
    },
  },
};
