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
    createComment: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var photoId, payload, loggedInUser, ok, newComment;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              photoId = _ref.photoId, payload = _ref.payload;
              loggedInUser = _ref2.loggedInUser;
              _context.next = 4;
              return _client["default"].photo.findUnique({
                where: {
                  id: photoId
                },
                select: {
                  id: true
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
                error: "photo not found"
              });
            case 7:
              _context.next = 9;
              return _client["default"].comment.create({
                data: {
                  payload: payload,
                  photo: {
                    connect: {
                      id: photoId
                    }
                  },
                  user: {
                    connect: {
                      id: loggedInUser.id
                    }
                  }
                }
              });
            case 9:
              newComment = _context.sent;
              return _context.abrupt("return", {
                ok: true,
                id: newComment.id
              });
            case 11:
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