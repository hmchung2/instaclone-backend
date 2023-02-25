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
var _photos = require("../photos.utils");
var _default = {
  Mutation: {
    editPhoto: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var id, caption, loggedInUser, oldPhoto;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id, caption = _ref.caption;
              loggedInUser = _ref2.loggedInUser;
              _context.next = 4;
              return _client["default"].photo.findFirst({
                where: {
                  id: id,
                  userId: loggedInUser.id
                },
                include: {
                  hashtags: {
                    select: {
                      hashtag: true
                    }
                  }
                }
              });
            case 4:
              oldPhoto = _context.sent;
              if (oldPhoto) {
                _context.next = 7;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "photo not found"
              });
            case 7:
              _context.next = 9;
              return _client["default"].photo.update({
                where: {
                  id: id
                },
                data: {
                  caption: caption,
                  hashtags: {
                    disconnect: oldPhoto.hashtags,
                    connectOrCreate: (0, _photos.processHashtags)(caption)
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