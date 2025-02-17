import { marked } from 'marked';
import dompurify from 'dompurify';

export const rawMarkup = (data) => {
  const sanitizer = dompurify.sanitize;
  return { __html: marked(sanitizer(data)) };
};

export const checkAnswer = (index, correctAnswer, answerSelectionType, {
  userInput,
  userAttempt,
  currentQuestionIndex,
  continueTillCorrect,
  showNextQuestionButton,
  incorrect,
  correct,
  setButtons,
  setCorrectAnswer,
  setIncorrectAnswer,
  setCorrect,
  setIncorrect,
  setShowNextQuestionButton,
  setUserInput,
  setUserAttempt,
}) => {
  const indexStr = `${index}`;
  const disabledAll = {
    0: { disabled: true },
    1: { disabled: true },
    2: { disabled: true },
    3: { disabled: true },
  };
  if (answerSelectionType === 'single') {
    if (userInput[currentQuestionIndex] === undefined) {
      userInput[currentQuestionIndex] = index;
    }

    if (indexStr === correctAnswer) {
      if (incorrect.indexOf(currentQuestionIndex) < 0 && correct.indexOf(currentQuestionIndex) < 0) {
        correct.push(currentQuestionIndex);
      }

      setButtons((prevState) => ({
        ...prevState,
        ...disabledAll,
        [index - 1]: {
          className: (indexStr === correctAnswer) ? 'correct' : 'incorrect',
        },
      }));

      setCorrectAnswer(true);
      setIncorrectAnswer(false);
      setCorrect(correct);
      setShowNextQuestionButton(true);
    } else {
      if (correct.indexOf(currentQuestionIndex) < 0 && incorrect.indexOf(currentQuestionIndex) < 0) {
        incorrect.push(currentQuestionIndex);
      }

      if (continueTillCorrect) {
        setButtons((prevState) => (
          {

            ...prevState,
            [index - 1]: {
              disabled: !prevState[index - 1],
            },
          }
        ));
      } else {
        setButtons((prevState) => (
          {

            ...prevState,
            ...disabledAll,
            [index - 1]: {
              className: (indexStr === correctAnswer) ? 'correct' : 'incorrect',
            },
          }
        ));

        setShowNextQuestionButton(true);
      }

      setIncorrectAnswer(true);
      setCorrectAnswer(false);
      setIncorrect(incorrect);
    }
  } else {
    const maxNumberOfMultipleSelection = correctAnswer.length;

    if (userInput[currentQuestionIndex] === undefined) {
      userInput[currentQuestionIndex] = [];
    }

    if (userInput[currentQuestionIndex].length < maxNumberOfMultipleSelection) {
      userInput[currentQuestionIndex].push(index);

      if (correctAnswer.includes(index)) {
        if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
          setButtons((prevState) => ({
            ...prevState,
            [index - 1]: {
              disabled: !prevState[index - 1],
              className: (correctAnswer.includes(index)) ? 'correct' : 'incorrect',
            },
          }));
        }
      } else if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
        setButtons((prevState) => ({
          ...prevState,
          [index - 1]: {
            className: (correctAnswer.includes(index)) ? 'correct' : 'incorrect',
          },
        }));
      }
    }

    if (maxNumberOfMultipleSelection === userAttempt) {
      let cnt = 0;
      for (let i = 0; i < correctAnswer.length; i += 1) {
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

export const selectAnswer = (index, correctAnswer, answerSelectionType, {
  userInput,
  currentQuestionIndex,
  setButtons,
  setShowNextQuestionButton,
  incorrect,
  correct,
  setCorrect,
  setIncorrect,
}) => {
  const selectedButtons = {
    0: { selected: false },
    1: { selected: false },
    2: { selected: false },
    3: { selected: false },
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

    setButtons((prevState) => ({
      ...prevState,
      ...selectedButtons,
      [index - 1]: {
        className: 'selected',
      },
    }));

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
      let exactMatch = true;
      for (const input of userInput[currentQuestionIndex]) {
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
    setButtons((prevState) => ({
      ...prevState,
      [index - 1]: {
        className: userInput[currentQuestionIndex].includes(index) ? 'selected' : undefined,
      },
    }));

    if (userInput[currentQuestionIndex].length > 0) {
      setShowNextQuestionButton(true);
    }
  }
};
