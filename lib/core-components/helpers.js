"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectAnswer = exports.rawMarkup = exports.checkAnswer = void 0;

import { marked } from 'marked';

var _dompurify = _interopRequireDefault(require("dompurify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rawMarkup = function rawMarkup(data) {
  var sanitizer = _dompurify["default"].sanitize;
  return { __html: marked(sanitizer(data)) };
};

exports.rawMarkup = rawMarkup;

var checkAnswer = function checkAnswer(index, correctAnswer, answerSelectionType, _ref) {
  var userInput = _ref.userInput,
      userAttempt = _ref.userAttempt,
      currentQuestionIndex = _ref.currentQuestionIndex,
      continueTillCorrect = _ref.continueTillCorrect,
      showNextQuestionButton = _ref.showNextQuestionButton,
      incorrect = _ref.incorrect,
      correct = _ref.correct,
      setButtons = _ref.setButtons,
      setCorrectAnswer = _ref.setCorrectAnswer,
      setIncorrectAnswer = _ref.setIncorrectAnswer,
      setCorrect = _ref.setCorrect,
      setIncorrect = _ref.setIncorrect,
      setShowNextQuestionButton = _ref.setShowNextQuestionButton,
      setUserInput = _ref.setUserInput,
      setUserAttempt = _ref.setUserAttempt;
  var indexStr = "".concat(index);
  var disabledAll = {
    0: {
      disabled: true
    },
    1: {
      disabled: true
    },
    2: {
      disabled: true
    },
    3: {
      disabled: true
    }
  };

  if (answerSelectionType === 'single') {
    if (userInput[currentQuestionIndex] === undefined) {
      userInput[currentQuestionIndex] = index;
    }

    if (indexStr === correctAnswer) {
      if (incorrect.indexOf(currentQuestionIndex) < 0 && correct.indexOf(currentQuestionIndex) < 0) {
        correct.push(currentQuestionIndex);
      }

      setButtons(function (prevState) {
        return _objectSpread(_objectSpread(_objectSpread({}, prevState), disabledAll), {}, _defineProperty({}, index - 1, {
          className: indexStr === correctAnswer ? 'correct' : 'incorrect'
        }));
      });
      setCorrectAnswer(true);
      setIncorrectAnswer(false);
      setCorrect(correct);
      setShowNextQuestionButton(true);
    } else {
      if (correct.indexOf(currentQuestionIndex) < 0 && incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }

      if (continueTillCorrect) {
        setButtons(function (prevState) {
          return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, index - 1, {
            disabled: !prevState[index - 1]
          }));
        });
      } else {
        setButtons(function (prevState) {
          return _objectSpread(_objectSpread(_objectSpread({}, prevState), disabledAll), {}, _defineProperty({}, index - 1, {
            className: indexStr === correctAnswer ? 'correct' : 'incorrect'
          }));
        });
        setShowNextQuestionButton(true);
      }

      setIncorrectAnswer(true);
      setCorrectAnswer(false);
      setIncorrect(incorrect);
    }
  } else {
    var maxNumberOfMultipleSelection = correctAnswer.length;

    if (userInput[currentQuestionIndex] === undefined) {
      userInput[currentQuestionIndex] = [];
    }

    if (userInput[currentQuestionIndex].length < maxNumberOfMultipleSelection) {
      userInput[currentQuestionIndex].push(index);

      if (correctAnswer.includes(index)) {
        if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
          setButtons(function (prevState) {
            return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, index - 1, {
              disabled: !prevState[index - 1],
              className: correctAnswer.includes(index) ? 'correct' : 'incorrect'
            }));
          });
        }
      } else if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
        setButtons(function (prevState) {
          return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, index - 1, {
            className: correctAnswer.includes(index) ? 'correct' : 'incorrect'
          }));
        });
      }
    }

    if (maxNumberOfMultipleSelection === userAttempt) {
      var cnt = 0;

      for (var i = 0; i < correctAnswer.length; i += 1) {
        if (userInput[currentQuestionIndex].includes(correctAnswer[i])) {
          cnt += 1;
        }
      }

      if (cnt === maxNumberOfMultipleSelection) {
        correct.push(currentQuestionIndex);
        setCorrectAnswer(true);
        setIncorrectAnswer(false);
        setCorrect(correct);
        setShowNextQuestionButton(true);
        setUserAttempt(1);
      } else {
        incorrect.push(currentQuestionIndex);
        setIncorrectAnswer(true);
        setCorrectAnswer(false);
        setIncorrect(incorrect);
        setShowNextQuestionButton(true);
        setUserAttempt(1);
      }
    } else if (!showNextQuestionButton) {
      setUserInput(userInput);
      setUserAttempt(userAttempt + 1);
    }
  }
};

exports.checkAnswer = checkAnswer;

var selectAnswer = function selectAnswer(index, correctAnswer, answerSelectionType, _ref2) {
  var userInput = _ref2.userInput,
      currentQuestionIndex = _ref2.currentQuestionIndex,
      setButtons = _ref2.setButtons,
      setShowNextQuestionButton = _ref2.setShowNextQuestionButton,
      incorrect = _ref2.incorrect,
      correct = _ref2.correct,
      setCorrect = _ref2.setCorrect,
      setIncorrect = _ref2.setIncorrect;
  var selectedButtons = {
    0: {
      selected: false
    },
    1: {
      selected: false
    },
    2: {
      selected: false
    },
    3: {
      selected: false
    }
  };

  if (answerSelectionType === 'single') {
    correctAnswer = Number(correctAnswer);
    userInput[currentQuestionIndex] = index;

    if (index === correctAnswer) {
      if (correct.indexOf(currentQuestionIndex) < 0) {
        correct.push(currentQuestionIndex);
      }

      if (incorrect.indexOf(currentQuestionIndex) >= 0) {
        incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1);
      }
    } else {
      if (incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }

      if (correct.indexOf(currentQuestionIndex) >= 0) {
        correct.splice(correct.indexOf(currentQuestionIndex), 1);
      }
    }

    setCorrect(correct);
    setIncorrect(incorrect);
    setButtons(function (prevState) {
      return _objectSpread(_objectSpread(_objectSpread({}, prevState), selectedButtons), {}, _defineProperty({}, index - 1, {
        className: 'selected'
      }));
    });
    setShowNextQuestionButton(true);
  } else {
    if (userInput[currentQuestionIndex] === undefined) {
      userInput[currentQuestionIndex] = [];
    }

    if (userInput[currentQuestionIndex].includes(index)) {
      userInput[currentQuestionIndex].splice(userInput[currentQuestionIndex].indexOf(index), 1);
    } else {
      userInput[currentQuestionIndex].push(index);
    }

    if (userInput[currentQuestionIndex].length === correctAnswer.length) {
      var exactMatch = true;

      var _iterator = _createForOfIteratorHelper(userInput[currentQuestionIndex]),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var input = _step.value;

          if (!correctAnswer.includes(input)) {
            exactMatch = false;

            if (incorrect.indexOf(currentQuestionIndex) < 0) {
              incorrect.push(currentQuestionIndex);
            }

            if (correct.indexOf(currentQuestionIndex) >= 0) {
              correct.splice(correct.indexOf(currentQuestionIndex), 1);
            }

            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (exactMatch) {
        if (correct.indexOf(currentQuestionIndex) < 0) {
          correct.push(currentQuestionIndex);
        }

        if (incorrect.indexOf(currentQuestionIndex) >= 0) {
          incorrect.splice(incorrect.indexOf(currentQuestionIndex), 1);
        }
      }
    } else {
      if (incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }

      if (correct.indexOf(currentQuestionIndex) >= 0) {
        correct.splice(correct.indexOf(currentQuestionIndex), 1);
      }
    }

    setCorrect(correct);
    setIncorrect(incorrect);
    setButtons(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, index - 1, {
        className: userInput[currentQuestionIndex].includes(index) ? 'selected' : undefined
      }));
    });

    if (userInput[currentQuestionIndex].length > 0) {
      setShowNextQuestionButton(true);
    }
  }
};

exports.selectAnswer = selectAnswer;