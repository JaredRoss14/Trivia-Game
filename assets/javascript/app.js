// Variables

var position = 0, test, testStatus, question, choice, choices, chA, chB, chC, correct = 0;
var triviaQuestions = [
	["A man pushed his car past a hotel, only to realize he was bankrupt. How did he figure this out? (He does not have his wallet or phone on him)", "His pockets were empty", "He was mugged as he pushed the car into the parking lot", "He was playing a board game", "None of the above", "C"],
	["I'm tall when I'm young and I'm short when I'm old. What am I?", "A tree", "A person", "A candle", "An alarm clock", "C"],
	["Mary's father has 5 daughters - Nana, Nene, Nini, Nono. What is the fifth daughters name?", "Nunu", "Mary", "Nina", "Nyny", "B"],
	["What goes up but never comes down?", "Age", "A hot air balloon", "Birds", "Bubbles", "A"],
	["What travels around the world but stays in one spot?", "An airplane", "A stamp", "The Sun", "A cloud", "B"]
];

//functions

function _(x){
	return document.getElementById(x);
};

function renderQuestion(){
	test = _("test");
	if(position >= triviaQuestions.length){
		test.innerHTML = "<h2> You got " + correct + " of " + triviaQuestions.length + " riddles correct </h2>";
		_("test_status").innerHTML = "Test Completed";
	$("#time").hide;
		return false;
	};
	_("test_status").innerHTML = "Question " + (position + 1) + " of " + triviaQuestions.length;
	question = triviaQuestions[position][0];
	chA = triviaQuestions[position][1];
	chB = triviaQuestions[position][2];
	chC = triviaQuestions[position][3];
	chD = triviaQuestions[position][4];
	test.innerHTML = "<h3>" + question + "</h3>";
	test.innerHTML += "<input type='radio' name='choices' value='A'> " + chA + "<br>";
	test.innerHTML += "<input type='radio' name='choices' value='B'> " + chB + "<br>";
	test.innerHTML += "<input type='radio' name='choices' value='C'> " + chC + "<br>";
	test.innerHTML += "<input type='radio' name='choices' value='D'> " + chD + "<br><br>";
	test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
	// var secondsRemaining = 10,
 //      display = $('#time');
 //  startTimer(secondsRemaining, display);
};

function checkAnswer(){
	choices = document.getElementsByName("choices");
	for (var i = 0; i < choices.length; i++) {
		if(choices[i].checked) {
			choice = choices[i].value;
		};
	};
	if(choice == triviaQuestions[position][5]){
		correct++;
	};
		position++;
		renderQuestion();
};


// function startTimer(duration, display) {
//   var timer = duration, minutes, seconds;
//   setInterval(function () {
//     minutes = parseInt(timer / 60, 10);
//     seconds = parseInt(timer % 60, 10);

//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     seconds = seconds < 10 ? "0" + seconds : seconds;

//     display.text(minutes + ":" + seconds);

//   if (--timer == -2) {  //This is to correct for the timer-text loading two seconds after starting - What is the issue?
//     clearInterval(timer);
//     checkAnswer();
//   	}
//   }, 1000);
// }



$("#startButton").on("click", function(){
	$(this).hide();
	renderQuestion();
});