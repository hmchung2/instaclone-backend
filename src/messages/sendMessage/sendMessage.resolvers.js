import client from "../../client";
import { NEW_MESSAGE } from "../../constants";
import pubsub from "../../pubsub";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async (_, { payload, roomId, userId }, { loggedInUser }) => {
        let room = null;

        if (userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId,
            },
            select: {
              id: true,
            },
          });
          if (!user) {
            return {
              ok: false,
              error: "This user does not exisst",
            };
          }
          room = await client.room.create({
            data: {
              users: {
                connect: [{ id: userId }, { id: loggedInUser.id }],
              },
            },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: {
              id: roomId,
            },
            select: {
              id: true,
            },
          });
          if (!room) {
            return {
              ok: false,
              error: "Room not found",
            };
          }
        }

        const message = await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: roomId,
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        console.log("message : ");
        console.log(message);

        pubsub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });

        return { ok: true, id: message.id };
      }
    ),
  },
};
