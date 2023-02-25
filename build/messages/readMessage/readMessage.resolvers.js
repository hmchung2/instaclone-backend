"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = _interopRequireDefault(require("../../client"));
var _users = require("../../users/users.utils");
var _default = {
  Mutation: {
    readMessage: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, loggedInUser, message;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;
              loggedInUser = _ref2.loggedInUser;
              _context.next = 4;
              return _client["default"].message.findFirst({
                where: {
                  id: id,
                  userId: {
                    not: loggedInUser.id
                  },
                  room: {
                    users: {
                      some: {
                        id: loggedInUser.id
                      }
                    }
                  }
                },
                select: {
                  id: true
                }
              });
            case 4:
              message = _context.sent;
              if (message) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "Message Not found"
              });
            case 7:
              _context.next = 9;
              return _client["default"].message.update({
                where: {
                  id: id
                },
                data: {
                  read: true
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