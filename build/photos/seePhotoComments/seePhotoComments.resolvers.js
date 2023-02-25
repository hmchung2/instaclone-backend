"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _client = _interopRequireDefault(require("../../client"));
var _default = {
  Query: {
    seePhotoComments: function seePhotoComments(_, _ref) {
      var id = _ref.id;
      return _client["default"].comment.findMany({
        where: {
          photoId: id
        },
        orderBy: {
          updatedAt: "desc"
        }
      });
    }
  }
};
exports["default"] = _default;