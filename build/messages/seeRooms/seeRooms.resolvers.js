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
  Query: {
    seeRooms: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, __, _ref) {
        var loggedInUser;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              loggedInUser = _ref.loggedInUser;
              return _context.abrupt("return", _client["default"].room.findMany({
                where: {
                  users: {
                    some: {
                      id: loggedInUser.id
                    }
                  }
                }
              }));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }())
  }
};
exports["default"] = _default;