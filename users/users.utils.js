import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      console.log("token input null");
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    console.log("user from token");
    console.log(user);
    if (user) {
      return user;
    } else {
      console.log("null output from token");
      return null;
    }
  } catch (error) {
    console.log("Error from getUser : ", error);
    return null;
  }
};

// export const protectResolvers = (user) => {
//   if (!user) {
//     throw new Error("You need to login");
//   }
// };

export const protectedResolver =
  (ourResolver) => (root, args, context, info) => {
    if (!context.loggedInUser) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please, login to perform this action",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
