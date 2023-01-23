import { createWriteStream } from "fs";
import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          firstName,
          lastName,
          userName,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser } // { loggedInUser, protectResolvers }
      ) => {
        // if (!loggedInUser) {
        //   return {
        //     ok: false,
        //     error: "you need to login",
        //   };
        // }
        // protectResolvers(loggedInUser);

        // console.log("user token");
        // console.log(loggedInUser);

        const { filename, createReadStream } = await avatar;
        const readStream = createReadStream();

        const writeStream = createWriteStream(
          process.cwd() + "/uploads/" + filename
        );

        readStream.pipe(writeStream);

        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }

        // token initiated in the login

        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            userName,
            email,
            bio,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });

        if (updatedUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update the profile",
          };
        }
      }
    ),
  },
};

// yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjc0Mzg4Mjk0fQ.A-JkGpvlVlD8BT4dm4QQLpsb63OtyZ2Mb-vgxIuOm4I
