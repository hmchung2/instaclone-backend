"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _client = _interopRequireDefault(require("../../client"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _default = {
  Mutation: {
    createAccount: function () {
      var _createAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref) {
        var firstName, lastName, username, email, password, existingUser, uglyPassword;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              firstName = _ref.firstName, lastName = _ref.lastName, username = _ref.username, email = _ref.email, password = _ref.password;
              _context.prev = 1;
              _context.next = 4;
              return _client["default"].user.findFirst({
                where: {
                  OR: [{
                    username: username
                  }, {
                    email: email
                  }]
                }
              });
            case 4:
              existingUser = _context.sent;
              if (!existingUser) {
                _context.next = 7;
                break;
              }
              throw new Error("This username/password is already taken.");
            case 7:
              _context.next = 9;
              return _bcrypt["default"].hash(password, 10);
            case 9:
              uglyPassword = _context.sent;
              _context.next = 12;
              return _client["default"].user.create({
                data: {
                  username: username,
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  password: uglyPassword
                }
              });
            case 12:
              return _context.abrupt("return", {
                ok: true
              });
            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](1);
              console.log(_context.t0);
              return _context.abrupt("return", {
                ok: false,
                error: "Cant create account."
              });
            case 19:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 15]]);
      }));
      function createAccount(_x, _x2) {
        return _createAccount.apply(this, arguments);
      }
      return createAccount;
    }()
  }
};
exports["default"] = _default;