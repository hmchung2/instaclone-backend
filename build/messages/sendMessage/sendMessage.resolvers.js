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
var _constants = require("../../constants");
var _pubsub = _interopRequireDefault(require("../../pubsub"));
var _users = require("../../users/users.utils");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var _default = {
  Mutation: {
    sendMessage: (0, _users.protectedResolver)( /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var payload, roomId, userId, loggedInUser, room, user, message;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              payload = _ref.payload, roomId = _ref.roomId, userId = _ref.userId;
              loggedInUser = _ref2.loggedInUser;
              room = null;
              if (!userId) {
                _context.next = 14;
                break;
              }
              _context.next = 6;
              return _client["default"].user.findUnique({
                where: {
                  id: userId
                },
                select: {
                  id: true
                }
              });
            case 6:
              user = _context.sent;
              if (user) {
                _context.next = 9;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "This user does not exisst"
              });
            case 9:
              _context.next = 11;
              return _client["default"].room.create({
                data: {
                  users: {
                    connect: [{
                      id: userId
                    }, {
                      id: loggedInUser.id
                    }]
                  }
                }
              });
            case 11:
              room = _context.sent;
              _context.next = 20;
              break;
            case 14:
              if (!roomId) {
                _context.next = 20;
                break;
              }
              _context.next = 17;
              return _client["default"].room.findUnique({
                where: {
                  id: roomId
                },
                select: {
                  id: true
                }
              });
            case 17:
              room = _context.sent;
              if (room) {
                _context.next = 20;
                break;
              }
              return _context.abrupt("return", {
                ok: false,
                error: "Room not found"
              });
            case 20:
              _context.next = 22;
              return _client["default"].message.create({
                data: {
                  payload: payload,
                  room: {
                    connect: {
                      id: roomId
                    }
                  },
                  user: {
                    connect: {
                      id: loggedInUser.id
                    }
                  }
                }
              });
            case 22:
              message = _context.sent;
              console.log("message : ");
              console.log(message);
              _pubsub["default"].publish(_constants.NEW_MESSAGE, {
                roomUpdates: _objectSpread({}, message)
              });
              return _context.abrupt("return", {
                ok: true,
                id: message.id
              });
            case 27:
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