"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var QuizResultFilter = function QuizResultFilter(_ref) {
  var filteredValue = _ref.filteredValue,
      handleChange = _ref.handleChange,
      appLocale = _ref.appLocale;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "quiz-result-filter"
  }, /*#__PURE__*/_react["default"].createElement("select", {
    value: filteredValue,
    onChange: handleChange
  }, /*#__PURE__*/_react["default"].createElement("option", {
    value: "all"
  }, appLocale.resultFilterAll), /*#__PURE__*/_react["default"].createElement("option", {
    value: "correct"
  }, appLocale.resultFilterCorrect), /*#__PURE__*/_react["default"].createElement("option", {
    value: "incorrect"
  }, appLocale.resultFilterIncorrect)));
};

var _default = QuizResultFilter;
exports["default"] = _default;