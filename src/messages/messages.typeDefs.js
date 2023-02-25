import { gql } from "apollo-server";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Room {
    id: Int!
    users: [User]
    messages: [Message]
    unreadTotal: Int!
    createdAt: String!
    updatedAt: String!
  }
`;

// generator client {
//     provider = "prisma-client-js"
//   }

//   datasource db {
//     provider          = "postgresql"
//     url               = env("DATABASE_URL")
//     shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
//   }

//   followers User[]    @relation("FollowRelation")
//   following User[]    @relation("FollowRelation")
