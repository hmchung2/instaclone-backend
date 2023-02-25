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
  Photo: {
    user: function user(_ref) {
      var userId = _ref.userId;
      return _client["default"].user.findUnique({
        where: {
          id: userId
        }
      });
    },
    hashtags: function hashtags(_ref2) {
      var id = _ref2.id;
      return _client["default"].hashtag.findMany({
        where: {
          photos: {
            some: {
              id: id
            }
          }
        }
      });
    },
    likes: function likes(_ref3) {
      var id = _ref3.id;
      return _client["default"].like.count({
        where: {
          photoId: id
        }
      });
    },
    commentNumber: function commentNumber(_ref4) {
      var id = _ref4.id;
      return _client["default"].comment.count({
        where: {
          photoId: id
        }
      });
    },
    comments: function comments(_ref5) {
      var id = _ref5.id;
      return _client["default"].comment.findMany({
        where: {
          photoId: id
        },
        include: {
          user: true
        }
      });
    },
    isMine: function isMine(_ref6, _, _ref7) {
      var userId = _ref6.userId;
      var loggedInUser = _ref7.loggedInUser;
      if (!loggedInUser) {
        return false;
      }
      return userId === loggedInUser.id;
    },
    isLiked: function () {
      var _isLiked = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref8, _, _ref9) {
        var id, loggedInUser, ok;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              id = _ref8.id;
              loggedInUser = _ref9.loggedInUser;
              if (loggedInUser) {
                _context.next = 4;
                break;
              }
              return _context.abrupt("return", false);
            case 4:
              _context.next = 6;
              return _client["default"].like.findUnique({
                where: {
                  photoId_userId: {
                    photoId: id,
                    userId: loggedInUser.id
                  }
                },
                select: {
                  id: true
                }
              });
            case 6:
              ok = _context.sent;
              if (!ok) {
                _context.next = 9;
                break;
              }
              return _context.abrupt("return", true);
            case 9:
              return _context.abrupt("return", false);
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function isLiked(_x, _x2, _x3) {
        return _isLiked.apply(this, arguments);
      }
      return isLiked;
    }()
  },
  Hashtag: {
    photos: function photos(_ref10, _ref11, _ref12) {
      var id = _ref10.id;
      var page = _ref11.page;
      var loggedInUser = _ref12.loggedInUser;
      _client["default"].hashtag.findUnique({
        where: {
          id: id
        }
      }).photos();
    },
    totalPhotos: function totalPhotos(_ref13) {
      var id = _ref13.id;
      return _client["default"].photo.count({
        where: {
          hashtags: {
            some: {
              id: id
            }
          }
        }
      });
    }
  }
};
exports["default"] = _default;