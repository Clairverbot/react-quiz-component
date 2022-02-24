"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Core = _interopRequireDefault(require("./Core"));

var _Locale = _interopRequireDefault(require("./Locale"));

require("./styles.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Quiz = function Quiz(_ref) {
  var quiz = _ref.quiz,
      shuffle = _ref.shuffle,
      showDefaultResult = _ref.showDefaultResult,
      onComplete = _ref.onComplete,
      customResultPage = _ref.customResultPage,
      showInstantFeedback = _ref.showInstantFeedback,
      continueTillCorrect = _ref.continueTillCorrect,
      revealAnswerOnSubmit = _ref.revealAnswerOnSubmit,
      allowNavigation = _ref.allowNavigation;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      start = _useState2[0],
      setStart = _useState2[1];

  var _useState3 = (0, _react.useState)(quiz.questions),
      _useState4 = _slicedToArray(_useState3, 2),
      questions = _useState4[0],
      setQuestions = _useState4[1];

  var nrOfQuestions = quiz.nrOfQuestions && quiz.nrOfQuestions < quiz.questions.length ? quiz.nrOfQuestions : quiz.questions.length;
  var shuffleQuestions = (0, _react.useCallback)(function (q) {
    for (var i = nrOfQuestions - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var _ref2 = [q[j], q[i]];
      q[i] = _ref2[0];
      q[j] = _ref2[1];
    }

    q.length = nrOfQuestions;
    return q;
  }, []);
  (0, _react.useEffect)(function () {
    if (shuffle) {
      setQuestions(shuffleQuestions(quiz.questions));
    } else {
      quiz.questions.length = nrOfQuestions;
      setQuestions(quiz.questions);
    }

    setQuestions(questions.map(function (question, index) {
      return _objectSpread(_objectSpread({}, question), {}, {
        questionIndex: index + 1
      });
    }));
  }, [start]);

  var validateQuiz = function validateQuiz(q) {
    if (!q) {
      console.error('Quiz object is required.');
      return false;
    }

    for (var i = 0; i < questions.length; i += 1) {
      var _questions$i = questions[i],
          question = _questions$i.question,
          questionType = _questions$i.questionType,
          answerSelectionType = _questions$i.answerSelectionType,
          answers = _questions$i.answers,
          correctAnswer = _questions$i.correctAnswer;

      if (!question) {
        console.error("Field 'question' is required.");
        return false;
      }

      if (!questionType) {
        console.error("Field 'questionType' is required.");
        return false;
      }

      if (questionType !== 'text' && questionType !== 'photo') {
        console.error("The value of 'questionType' is either 'text' or 'photo'.");
        return false;
      }

      if (!answers) {
        console.error("Field 'answers' is required.");
        return false;
      }

      if (!Array.isArray(answers)) {
        console.error("Field 'answers' has to be an Array");
        return false;
      }

      if (!correctAnswer) {
        console.error("Field 'correctAnswer' is required.");
        return false;
      }

      var selectType = answerSelectionType;

      if (!answerSelectionType) {
        // Default single to avoid code breaking due to automatic version upgrade
        console.warn('Field answerSelectionType should be defined since v0.3.0. Use single by default.');
        selectType = answerSelectionType || 'single';
      }

      if (selectType === 'single' && !(typeof selectType === 'string' || selectType instanceof String)) {
        console.error('answerSelectionType is single but expecting String in the field correctAnswer');
        return false;
      }

      if (selectType === 'multiple' && !Array.isArray(correctAnswer)) {
        console.error('answerSelectionType is multiple but expecting Array in the field correctAnswer');
        return false;
      }
    }

    return true;
  };

  if (!validateQuiz(quiz)) {
    return null;
  }

  var appLocale = _objectSpread(_objectSpread({}, _Locale["default"]), quiz.appLocale);

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "react-quiz-container"
  }, !start && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h2", null, quiz.quizTitle), /*#__PURE__*/_react["default"].createElement("div", null, appLocale.landingHeaderText.replace('<questionLength>', nrOfQuestions)), quiz.quizSynopsis && /*#__PURE__*/_react["default"].createElement("div", {
    className: "quiz-synopsis"
  }, quiz.quizSynopsis), /*#__PURE__*/_react["default"].createElement("div", {
    className: "startQuizWrapper"
  }, /*#__PURE__*/_react["default"].createElement("button", {
    onClick: function onClick() {
      return setStart(true);
    },
    className: "startQuizBtn btn"
  }, appLocale.startQuizBtn))), start && /*#__PURE__*/_react["default"].createElement(_Core["default"], {
    questions: questions,
    showDefaultResult: showDefaultResult,
    onComplete: onComplete,
    customResultPage: customResultPage,
    showInstantFeedback: showInstantFeedback,
    continueTillCorrect: continueTillCorrect,
    revealAnswerOnSubmit: revealAnswerOnSubmit,
    allowNavigation: allowNavigation,
    appLocale: appLocale
  }));
};

var _default = Quiz;
exports["default"] = _default;