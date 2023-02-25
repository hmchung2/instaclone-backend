"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = _interopRequireDefault(require("../../client"));
var _default = {
  Query: {
    seeFollowers: function () {
      var _seeFollowers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var username, page, ok, followers, totalFollowers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              username = _ref.username, page = _ref.page;
              _context.next = 3;
              return _client["default"].user.findUnique({
                where: {
                  username: username
                },
                select: {
                  id: true
                }
              });
            case 3:
              ok = _context.sent;
              if (ok) {
                _context.next = 6;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "User not Found"
              });
            case 6:
              _context.next = 8;
              return _client["default"].user.findUnique({
                where: {
                  username: username
                }
              }).followers({
                take: 5,
                skip: (page - 1) * 5
              });
            case 8:
              followers = _context.sent;
              _context.next = 11;
              return _client["default"].user.count({
                where: {
                  following: {
                    some: {
                      username: username
                    }
                  }
                }
              });
            case 11:
              totalFollowers = _context.sent;
              return _context.abrupt("return", {
                ok: true,
                followers: followers,
                totalPages: Math.ceil(totalFollowers / 5)
              });
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function seeFollowers(_x, _x2) {
        return _seeFollowers.apply(this, arguments);
      }
      return seeFollowers;
    }()
  }
};
exports["default"] = _default;