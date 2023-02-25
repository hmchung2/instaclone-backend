"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _apolloServer = require("apollo-server");
var _templateObject;
var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type seeFollowersResult {\n    ok: Boolean!\n    error: String\n    followers: [User]\n    totalPages: Int\n  }\n\n  type Query {\n    seeFollowers(username: String!, page: Int!): seeFollowersResult!\n  }\n"])));
exports["default"] = _default;