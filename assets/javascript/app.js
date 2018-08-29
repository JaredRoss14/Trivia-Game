// Global Variables
var position = 0;
var question = "";
var correct = 0;
var secondsRemaining = 80;
var triviaQuestions = [
	["A man pushed his car past a hotel, only to realize he was bankrupt. How did he figure this out? (He does not have his wallet or phone on him)", "His pockets were empty", "He was mugged as he pushed the car into the parking lot", "He was playing a board game", "None of the above", "C"],
	["I'm tall when I'm young and I'm short when I'm old. What am I?", "A tree", "A person", "A candle", "An alarm clock", "C"],
	["Mary's father has 5 daughters - Nana, Nene, Nini, Nono. What is the fifth daughters name?", "Nunu", "Mary", "Nina", "Nyny", "B"],
	["What goes up but never comes down?", "Age", "A hot air balloon", "Birds", "Bubbles", "A"],
	["What travels around the world but stays in one spot?", "An airplane", "A stamp", "The Sun", "A cloud", "B"]
];

// Shortcut for Get Element By ID
function _(x){
	return document.getElementById(x);
};

// Function to render the question within the div or end the game
function renderQuestion(questions) {
	var test = _("test");

// If the user has been displayed all of the questions, display results
	if (position >= questions.length) {
		console.log("this works");
		test.innerHTML = `<h2> You got ${correct} of ${questions.length} riddles correct</h2>`;
		_("test_status").innerHTML = "Test Completed";
		$("#time").hide();
	}
	else // Else display question and start timer
	{
		// Declare and define variables
		$("#time").text("01:20");
		question = questions[position][0];
		let chA = questions[position][1];
		let chB = questions[position][2];
		let chC = questions[position][3];
		let chD = questions[position][4];

		// Display question and data to user
		_("test_status").innerHTML = `Question ${position + 1} of ${questions.length}`;
		test.innerHTML = `<h3>${question}</h3>`;
		test.innerHTML += `<input type='radio' name='choices' value='A'> ${chA}<br>`;
		test.innerHTML += `<input type='radio' name='choices' value='B'> ${chB}<br>`;
		test.innerHTML += `<input type='radio' name='choices' value='C'> ${chC}<br>`;
		test.innerHTML += `<input type='radio' name='choices' value='D'> ${chD}<br><br>`;
		test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
	};
}

// Function to check the answer submitted
function checkAnswer() {
	// Take in choices
	let choices = document.getElementsByName("choices");

	// Loop through choices looking for the selected choice
	for (var i = 0; i < choices.length; i++) {
		if (choices[i].checked) {

			// Once the selected choice is found, compare to correct answer
			let choice = choices[i].value;
			if (choice === triviaQuestions[position][5]) {
				correct++; // If correct add to score
			};
			break; // End for loop on the iteration where the checked answer is found
		};
	};
	position++; // Increase position in array
	secondsRemaining = 80; // Reset time
	renderQuestion(triviaQuestions); // Render next question
}

// Function that controls the timer
function startTimer() {

	// Set interval for clock method at 1 second
	var timer = setInterval(clock, 1000);

	function clock() {

		// If questions still remain start the timer
		if (position < triviaQuestions.length) {
			
			// Reduce seconds remaining by 1
			--secondsRemaining;

			// Take in time and convert to minutes and seconds
			var minutes = parseInt(secondsRemaining / 60, 10);
			var seconds = parseInt(secondsRemaining % 60, 10);

			// Use Ternary Operator to display 0 in front of minutes and seconds if less than 10
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;

			// Set time to update as each interval passes
			$("#time").text(minutes + ":" + seconds);

			// If seconds remaining hits 0 check the answer (Setting to negative -1 lets timer actually hit 0)
			if (secondsRemaining === -1) {
				checkAnswer();
			}

		}
		else // If no questions remain stop the countdown timer
		{
			clearInterval(timer);
		}
	}
}

// Start game on button click
$("#startButton").on("click", function(){
	$(this).hide(); // Hides the button
	startTimer();
	renderQuestion(triviaQuestions);
});