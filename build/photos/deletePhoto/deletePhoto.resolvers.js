"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = _interopRequireDefault(require("../../client"));
var _shared = require("../../shared/shared.utils");
var _users = require("../../users/users.utils");
var _default = {
  Mutation: {
    deletePhoto: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, loggedInUser, photo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;
              loggedInUser = _ref2.loggedInUser;
              _context.next = 4;
              return _client["default"].photo.findUnique({
                where: {
                  id: id
                },
                select: {
                  userId: true,
                  file: true
                }
              });
            case 4:
              photo = _context.sent;
              if (photo) {
                _context.next = 9;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "Photo not found"
              });
            case 9:
              if (!(photo.userId !== loggedInUser.id)) {
                _context.next = 13;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "Not authorized"
              });
            case 13:
              _context.next = 15;
              return _client["default"].photo["delete"]({
                where: {
                  id: id
                }
              });
            case 15:
              _context.next = 17;
              return (0, _shared.handleDeletePhotoFromAWS)(photo.file, "uploads");
            case 17:
              return _context.abrupt("return", {
                ok: true
              });
            case 18:
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