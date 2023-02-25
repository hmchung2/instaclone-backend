"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectedResolver = exports.getUser = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _client = _interopRequireDefault(require("../client"));
var getUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(token) {
    var _yield$jwt$verify, id, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (token) {
            _context.next = 4;
            break;
          }
          console.log("token input null");
          return _context.abrupt("return", null);
        case 4:
          _context.next = 6;
          return _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY);
        case 6:
          _yield$jwt$verify = _context.sent;
          id = _yield$jwt$verify.id;
          _context.next = 10;
          return _client["default"].user.findUnique({
            where: {
              id: id
            }
          });
        case 10:
          user = _context.sent;
          console.log("user from token");
          console.log(user);
          if (!user) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", user);
        case 17:
          console.log("null output from token");
          return _context.abrupt("return", null);
        case 19:
          _context.next = 25;
          break;
        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.log("Error from getUser : ", _context.t0);
          return _context.abrupt("return", null);
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 21]]);
  }));
  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
}();

// export const protectResolvers = (user) => {
//   if (!user) {
//     throw new Error("You need to login");
//   }
// };
exports.getUser = getUser;
var protectedResolver = function protectedResolver(ourResolver) {
  return function (root, args, context, info) {
    if (!context.loggedInUser) {
      var query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please, login to perform this action"
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
};
exports.protectedResolver = protectedResolver;