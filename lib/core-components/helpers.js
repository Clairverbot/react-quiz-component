"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectAnswer = exports.checkAnswer = exports.rawMarkup = void 0;

var _marked = _interopRequireDefault(require("marked"));

var _dompurify = _interopRequireDefault(require("dompurify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var rawMarkup = function rawMarkup(data) {
  var sanitizer = _dompurify.default.sanitize;
  return {
    __html: (0, _marked.default)(sanitizer(data))
  };
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
        return _objectSpread({}, prevState, disabledAll, _defineProperty({}, index - 1, {
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
          return _objectSpread({}, prevState, _defineProperty({}, index - 1, {
            disabled: !prevState[index - 1]
          }));
        });
      } else {
        setButtons(function (prevState) {
          return _objectSpread({}, prevState, disabledAll, _defineProperty({}, index - 1, {
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
            return _objectSpread({}, prevState, _defineProperty({}, index - 1, {
              disabled: !prevState[index - 1],
              className: correctAnswer.includes(index) ? 'correct' : 'incorrect'
            }));
          });
        }
      } else if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
        setButtons(function (prevState) {
          return _objectSpread({}, prevState, _defineProperty({}, index - 1, {
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

    if (userInput[currentQuestionIndex] === undefined) {
      userInput.push(index);
    }

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
      return _objectSpread({}, prevState, selectedButtons, _defineProperty({}, index - 1, {
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
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = userInput[currentQuestionIndex][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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
      return _objectSpread({}, prevState, _defineProperty({}, index - 1, {
        className: userInput[currentQuestionIndex].includes(index) ? 'selected' : undefined
      }));
    });

    if (userInput[currentQuestionIndex].length > 0) {
      setShowNextQuestionButton(true);
    }
  }
};

exports.selectAnswer = selectAnswer;