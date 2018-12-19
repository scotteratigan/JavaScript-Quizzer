const questionDiv = document.querySelector('#question-div');
const userAnswerElement = document.querySelector('#user-code');
const resultsDiv = document.querySelector('#results-div');
const moreInfoDiv = document.querySelector('#more-info');
const hiddenDiv = document.querySelector('#hidden-element-area');
let qIndex = -1;
document.querySelector("#check-answer").addEventListener('click', checkAnswer);
document.querySelector("#next-question").addEventListener('click', displayNextQuestion);
function showError(err) {
	resultsDiv.style.color = 'red';
	resultsDiv.textContent = 'Could not run code. Error is:' + err;
	displayInfoLink();
}

function answerIsCorrect() {
	resultsDiv.style.color = 'white';
	resultsDiv.textContent = 'Correct!';
	displayInfoLink();
}

function answerIsIncorrect() {
	resultsDiv.style.color = 'yellow';
	resultsDiv.textContent = 'Incorrect. Code did not produce any runtime errors, but did not solve the prompt either.';
	displayInfoLink();
}

function displayInfoLink() {
	moreInfoDiv.innerHTML = `<a href = "${questionArray[qIndex].r}" target="_blank">See here for more info.</a>`;
}

function checkAnswer() {
	if (!userAnswerElement.value.trim()) {
		resultsDiv.style.color = 'yellow';
		resultsDiv.textContent = "You must enter code in the box above.";
		return;
	}
	eval(`try {
		${questionArray[qIndex].preCode}
		${userAnswerElement.value}
		${questionArray[qIndex].postCode}
		${questionArray[qIndex].conditional} ? answerIsCorrect() : answerIsIncorrect; // ternary operator is nice and concise here.
	} catch (err) {
		showError(err);
	}
	`);
}

const questionArray = [ // I can't decide how I want to space this out.
	{q: `Enter code that will declare a variable named foo to the value bar.`, preCode: ``, postCode: ``, conditional: `foo == 'bar'`, r: `https://www.w3schools.com/js/js_variables.asp`},
	{q: `Given a variable named 'userName', create a variable 'greeting' that has the value: 'Hi userName'. Spacing is important.`, preCode: `const userName = 'Bob';`, postCode: ``, conditional: `greeting == 'Hi Bob'`, r: `http://2ality.com/2011/10/string-concatenation.html`},
	{q: `Given a string variable named 'val', convert it to a number (integer) and save the result back in the variable 'val'.`, preCode: `let val = '123';`, postCode: ``, conditional: `val === 123`, r: `https://www.w3schools.com/jsref/jsref_parseint.asp`},
	{q: `Given an HTML element with the id of 'my-element', create code that will set the width to 300 pixels.`, preCode: `hiddenDiv.innerHTML = '<div id="my-element"></div>'`, postCode: ``, conditional: `document.querySelector('#my-element').style.width == "300px"`, r: `https://www.w3schools.com/jsref/prop_style_width.asp`},
	{q: `Given an HTML element with the id of 'my-element', create code that will set the background 'red'.`, preCode: `hiddenDiv.innerHTML = '<div id="my-element"></div>'`, postCode: ``, conditional: `document.querySelector('#my-element').style.backgroundColor == "red"`, r: `https://www.w3schools.com/jsref/prop_style_width.asp`}
];

function displayNextQuestion() {
	clearDisplay();
	qIndex++;
	if (qIndex >= questionArray.length) {
		endOfQuiz();
	}
	questionDiv.textContent = questionArray[qIndex].q;
};

function endOfQuiz() {
	clearDisplay();
	questionDiv.textContent = 'You have reached the end of the quiz.';
}

function clearDisplay() {
	questionDiv.textContent = '';
	resultsDiv.textContent = '';
	moreInfoDiv.innerHTML = '';
	hiddenDiv.innerHTML = '';
}

displayNextQuestion();