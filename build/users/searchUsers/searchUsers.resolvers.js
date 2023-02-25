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
    searchUsers: function () {
      var _searchUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var keyword, lastId;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              keyword = _ref.keyword, lastId = _ref.lastId;
              return _context.abrupt("return", _client["default"].user.findMany(_objectSpread({
                where: {
                  OR: [{
                    username: {
                      startsWith: keyword,
                      mode: "insensitive"
                    }
                  }, {
                    username: {
                      endsWith: keyword,
                      mode: "insensitive"
                    }
                  }]
                },
                take: 5,
                skip: lastId ? 1 : 0
              }, lastId && {
                cursor: {
                  id: lastId
                }
              })));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function searchUsers(_x, _x2) {
        return _searchUsers.apply(this, arguments);
      }
      return searchUsers;
    }()
  }
};
exports["default"] = _default;