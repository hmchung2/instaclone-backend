import client from "../../client";
import { handleDeletePhotoFromAWS } from "../../shared/shared.utils";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deletePhoto: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const photo = await client.photo.findUnique({
        where: { id },
        select: { userId: true, file: true },
      });
      if (!photo) {
        return {
          ok: false,
          error: "Photo not found",
        };
      } else if (photo.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "Not authorized",
        };
      } else {
        await client.photo.delete({
          where: { id },
        });
        //https://instaclone-uploads-hmchung.s3.ap-northeast-2.amazonaws.com/uploads/1-1675185394998-Screenshot%20from%202022-10-29%2021-31-15.png
        await handleDeletePhotoFromAWS(photo.file, "uploads");
        return { ok: true };
      }
    }),
  },
};
