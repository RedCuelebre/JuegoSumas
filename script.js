const operators = ["+", "-", "*"];
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;

const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const generateQuestion = () => {
  const num1 = randomValue(1, 20);
  const num2 = randomValue(1, 20);
  const randomOperator = operators[randomValue(0, operators.length)];

  const [adjustedNum1, adjustedNum2] = (randomOperator === "-" && num2 > num1) ? [num2, num1] : [num1, num2];
  const solution = eval(`${adjustedNum1}${randomOperator}${adjustedNum2}`);
  const randomVar = randomValue(1, 5);

  switch(randomVar) {
    case 1:
      answerValue = adjustedNum1;
      question.innerHTML = `<input type="number" id="inputValue" placeholder="?" /> ${randomOperator} ${adjustedNum2} = ${solution}`;
      break;
    case 2:
      answerValue = adjustedNum2;
      question.innerHTML = `${adjustedNum1} ${randomOperator} <input type="number" id="inputValue" placeholder="?" /> = ${solution}`;
      break;
    case 3:
      answerValue = randomOperator;
      operatorQuestion = true;
      question.innerHTML = `${adjustedNum1} <input type="text" id="inputValue" placeholder="?" /> ${adjustedNum2} = ${solution}`;
      break;
    default:
      answerValue = solution;
      question.innerHTML = `${adjustedNum1} ${randomOperator} ${adjustedNum2} = <input type="number" id="inputValue" placeholder="?" />`;
  }

  submitBtn.addEventListener("click", checkAnswer);
};

const checkAnswer = () => {
  errorMessage.classList.add("hide");
  const userInput = document.getElementById("inputValue").value;

  if (userInput) {
    if (userInput == answerValue) {
      endGame("BIEEENNN!!! Respuesta <span>Correcta</span>");
    } else if (operatorQuestion && !operators.includes(userInput)) {
      showError("Por favor, inserta un operador matemático correcto (+, -, *)");
    } else {
      endGame("OOOHHH!!! Respuesta <span>Incorrecta</span>");
    }
  } else {
    showError("No puedes dejar el hueco vácio");
  }
};

const showError = (message) => {
  errorMessage.classList.remove("hide");
  errorMessage.innerHTML = message;
};

const startGame = () => {
  operatorQuestion = false;
  answerValue = "";
  errorMessage.classList.add("hide");
  controls.classList.add("hide");
  startBtn.classList.add("hide");
  generateQuestion();
};

const endGame = (resultText) => {
  result.innerHTML = resultText;
  startBtn.innerText = "Reiniciar el juego";
  controls.classList.remove("hide");
  startBtn.classList.remove("hide");
};

startBtn.addEventListener("click", startGame);
