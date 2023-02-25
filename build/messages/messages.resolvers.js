"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _client = _interopRequireDefault(require("../client"));
var _default = {
  Room: {
    users: function users(_ref) {
      var id = _ref.id;
      return _client["default"].room.findUnique({
        where: {
          id: id
        }
      }).users();
    },
    messages: function messages(_ref2) {
      var id = _ref2.id;
      return _client["default"].message.findMany({
        where: {
          roomId: id
        }
      });
    },
    unreadTotal: function unreadTotal(_ref3, _, _ref4) {
      var id = _ref3.id;
      var loggedInUser = _ref4.loggedInUser;
      if (!loggedInUser) {
        return 0;
      }
      return _client["default"].message.count({
        where: {
          read: false,
          roomId: id,
          user: {
            id: {
              not: loggedInUser.id
            }
          }
        }
      });
    }
  },
  Message: {
    user: function user(_ref5) {
      var id = _ref5.id;
      return _client["default"].message.findUnique({
        where: {
          id: id
        }
      }).user();
    }
  }
};
exports["default"] = _default;