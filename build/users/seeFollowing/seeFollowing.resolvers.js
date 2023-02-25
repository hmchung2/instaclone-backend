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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  Query: {
    seeFollowing: function () {
      var _seeFollowing = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var username, lastId, ok, following;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              username = _ref.username, lastId = _ref.lastId;
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
              }).following(_objectSpread({
                take: 5,
                skip: lastId ? 1 : 0
              }, lastId && {
                cursor: {
                  id: lastId
                }
              }));
            case 8:
              following = _context.sent;
              return _context.abrupt("return", {
                ok: true,
                following: following
              });
            case 10:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function seeFollowing(_x, _x2) {
        return _seeFollowing.apply(this, arguments);
      }
      return seeFollowing;
    }()
  }
};
exports["default"] = _default;