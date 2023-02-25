"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _client = _interopRequireDefault(require("../../client"));
var _default = {
  Query: {
    seePhoto: function seePhoto(_, _ref) {
      var id = _ref.id;
      return _client["default"].photo.findUnique({
        where: {
          id: id
        }
      });
    }
  }
};
exports["default"] = _default;