"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = _interopRequireDefault(require("../../client"));
var _users = require("../users.utils");
var _default = {
  Mutation: {
    unfollowUser: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var username, loggedInUser, ok;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              username = _ref.username;
              loggedInUser = _ref2.loggedInUser;
              _context.next = 4;
              return _client["default"].user.findUnique({
                where: {
                  username: username
                }
              });
            case 4:
              ok = _context.sent;
              if (ok) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "Can't unfollow user."
              });
            case 7:
              _context.next = 9;
              return _client["default"].user.update({
                where: {
                  id: loggedInUser.id
                },
                data: {
                  following: {
                    disconnect: {
                      username: username
                    }
                  }
                }
              });
            case 9:
              return _context.abrupt("return", {
                ok: true
              });
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x, _x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;