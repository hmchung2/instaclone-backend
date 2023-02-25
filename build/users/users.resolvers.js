"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = _interopRequireDefault(require("../client"));
var _default = {
  User: {
    totalFollowing: function totalFollowing(_ref) {
      var id = _ref.id;
      return _client["default"].user.count({
        where: {
          followers: {
            some: {
              id: id
            }
          }
        }
      });
    },
    totalFollowers: function totalFollowers(_ref2) {
      var id = _ref2.id;
      return _client["default"].user.count({
        where: {
          following: {
            some: {
              id: id
            }
          }
        }
      });
    },
    //  isMe: ({ id }, args, context ) => {
    isMe: function isMe(_ref3, _, _ref4) {
      var id = _ref3.id;
      var loggedInUser = _ref4.loggedInUser;
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: function () {
      var _isFollowing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref5, _, _ref6) {
        var id, loggedInUser, exists;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              id = _ref5.id;
              loggedInUser = _ref6.loggedInUser;
              if (loggedInUser) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", false);
            case 4:
              _context.next = 6;
              return _client["default"].user.count({
                where: {
                  username: loggedInUser.username,
                  following: {
                    some: {
                      id: id
                    }
                  }
                }
              });
            case 6:
              exists = _context.sent;
              return _context.abrupt("return", Boolean(exists));
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function isFollowing(_x, _x2, _x3) {
        return _isFollowing.apply(this, arguments);
      }
      return isFollowing;
    }(),
    photos: function photos(_ref7) {
      var id = _ref7.id;
      return _client["default"].user.findUnique({
        where: {
          id: id
        }
      }).photos();
    }
  }
};
exports["default"] = _default;