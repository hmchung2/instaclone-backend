"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = _interopRequireDefault(require("../../client"));
var _shared = require("../../shared/shared.utils");
var _users = require("../../users/users.utils");
var _photos = require("../photos.utils");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  Mutation: {
    uploadPhoto: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var file, caption, loggedInUser, hashtagObj, fileUrl;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              file = _ref.file, caption = _ref.caption;
              loggedInUser = _ref2.loggedInUser;
              hashtagObj = [];
              if (caption) {
                hashtagObj = (0, _photos.processHashtags)(caption);
              }
              _context.next = 6;
              return (0, _shared.uploadToS3)(file, loggedInUser.id, "uploads");
            case 6:
              fileUrl = _context.sent;
              return _context.abrupt("return", _client["default"].photo.create({
                data: _objectSpread({
                  file: fileUrl,
                  caption: caption,
                  user: {
                    connect: {
                      id: loggedInUser.id
                    }
                  }
                }, hashtagObj.length > 0 && {
                  hashtags: {
                    connectOrCreate: hashtagObj
                  }
                })
              }));
            case 8:
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