import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
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
      console.log("not logged in");
      return {
        ok: false,
        error: "Please, login to perform this action",
      };
    }
    return ourResolver(root, args, context, info);
  };
