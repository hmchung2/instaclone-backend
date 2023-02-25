"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _apolloServer = require("apollo-server");
var _templateObject;
var _default = (0, _apolloServer.gql)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2["default"])(["\n  type Photo {\n    id: Int!\n    user: User!\n    file: String!\n    caption: String\n    likes: Int!\n    commentNumber: Int!\n    comments: [Comment]\n    hashtags: [Hashtag]\n    createdAt: String!\n    updatedAt: String!\n    isMine: Boolean!\n    isLiked: Boolean!\n  }\n  type Hashtag {\n    id: Int!\n    hashtag: String!\n    photos(page: Int): [Photo]\n    totalPhotos: Int!\n    createdAt: String!\n    updatedAt: String!\n  }\n\n  type Like {\n    id: Int!\n    photo: Photo!\n    createdAt: String!\n    updatedAt: String!\n  }\n"])));
exports["default"] = _default;