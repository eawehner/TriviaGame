// ESTABLISH ALL OUR VARIABLES
var questions = [
    {
        question: "What type of animal is Tom Nook?",
        answers: {
            a: "Bear",
            b: "Racoon",
            c: "Cat",
            d: "Dog"
        },
        correct: "b"
    },

    {
        question: "What instrument is K.K. Slider known for playing?",
        answers: {
            a: "Piano",
            b: "Ukelele",
            c: "Guitar",
            d: "Drums"
        },
        correct: "c"
    },

    {
        question: "Which Animal Crossing game lets you become the Mayor?",
        answers: {
            a: "Animal Crossing - GameCube",
            b: "Wild World - DS",
            c: "City Folk - Wii",
            d: "New Leaf - 3DS"
        },
        correct: "d"
    },

    {

        question: "Where does Blathers the Owl work?",
        answers: {
            a: "The coffee shop",
            b: "The retail store",
            c: "The museum",
            d: "The beach"
        },
        correct: "c"
    },

    {
        question: "What is the name of the seagull sailor you find washed up on the beach?",
        answers: {
            a: "Gulliver",
            b: "Beaks-McBee",
            c: "Joe",
            d: "Daffy Duck"
        },
        correct: "a"
    },

    {
        question: "What color is Bob the Cat?",
        answers: {
            a: "White",
            b: "Black",
            c: "Blue",
            d: "Purple"
        },
        correct: "d"
    }
];

var playerAnswers = [];

var timeNumber = 50;

var QA = 0;

var intervalID;

var correctAnswers = 0;


$(document).ready(function() {

// ALL OUR TIMER FUNCTIONS

function stop() {
    clearInterval(intervalID);
};

function timeDown() {
    timeNumber--;

    $("#timer").html("<h2>" + timeNumber + "</h2>");

    // IF TIMER REACHES ZERO, DISPLAY A TIME OUT PAGE AND THE CORRECT ANSWER
    if (timeNumber === 0) {
        $("#timer").html("<h2> TIME'S UP </h2>")
        $("#question").text("You better pay attention!");
        $("#answers").html("<img src='assets/images/Bobtime.gif' id='bobtime'>");
        stop();

        setTimeout(function() {
            stop();
            displayQA();
            resetTimer();
            timer();
        },6000);
    };
};

function timer() {
    clearInterval(intervalID);
    intervalID = setInterval(timeDown, 1000);
};

function resetTimer() {
    timeNumber = 51;
    clearInterval(intervalID);
};

// FUNCTION FOR DISPLAYING QUESTIONS AND ANSWERS

function displayQA() {
    
    // CONTINUE ASKING THE QUESTIONS AND DEMANDING THE ANSWERS AS LONG AS WE HAVE THEM!
    if (QA < questions.length) {
        var currentQuestion = questions[QA].question;

        var answerA = "<input type='radio' name='answers' value='a' class='radio-answer'>" + questions[QA].answers.a + "</input> <br>";
        var answerB = "<input type='radio' name='answers' value='b' class='radio-answer'>" + questions[QA].answers.b + "</input> <br>";
        var answerC = "<input type='radio' name='answers' value='c' class='radio-answer'>" + questions[QA].answers.c + "</input> <br>";
        var answerD = "<input type='radio' name='answers' value='d' class='radio-answer'>" + questions[QA].answers.d + "</input>";

        // SELECT THE QUESTION AND DISPLAY IT...
        $("#question").text(currentQuestion);

        // ...AND DISPLAY THE ANSWERS...
        $("#answers").html(answerA + answerB + answerC + answerD);

        // ...AND REMOVE START BUTTON AND PLACE A SUBMIT BUTTON...
        $("#button-holder").empty();

        var enter = $("<button>");
        enter.addClass("enter");
        enter.attr("name", "enter");
        enter.text("Enter");

        $("#button-holder").append(enter);

        QA++;
    } else {

        // AFTER LAST QUESTION, CHECK AND DISPLAY TOTAL CORRECT ANSWERS
        $("#question").text("YOU DID IT! You completed the Animal Crossing Quiz!");

        $("#answers").html("<center> You got " + correctAnswers + " questions right out of " + questions.length + "! Go you! </center>");
        $("#answers").append("<br> <img src='assets/images/Bobsing.gif' id='bobsing'>");

        $("#timer").empty();

        stop();
    };

};

// START THE QUIZ ONCE THE PLAYER HITS THE START BUTTON

$("#start").on("click", function() {

    timer(timeNumber);
    displayQA(QA, questions);

});

// FOR WHEN THE PLAYER HITS THE ENTER BUTTON

$("body").on("click", ".enter", function() {

    var radioSelect = document.querySelector("[name='answers']:checked").value;

    playerAnswers.push(radioSelect);

    var currentAnswer = QA - 1;

    // WHEN PLAYER SELECTS AN ANSWER AND HITS SUBMIT, CHECK TO SEE IF ANSWER IS CORRECT
    if (radioSelect == questions[currentAnswer].correct) {

        // DISPLAY IF ANSWER IS CORRECT AND ADD TO CORRECT ANSWER SCORE
        $("#question").text("You are correct!");
        $("#answers").html("<img src='assets/images/Bobdance.gif' id='bobdance'>");
        $("#button-holder").empty();
        correctAnswers++;

        setTimeout(function() {
            stop();
            displayQA();
            resetTimer();
            timer();
        },6000);

    } else {

        // DISPLAY IF ANSWER IS WRONG
        $("#question").text("You are wrong! The correct answer was: " + questions[currentAnswer].correct);
        $("#answers").html("<img src='assets/images/Bobcry.gif' id='bobcry'>");
        $("#button-holder").empty();

        setTimeout(function() {
            stop();
            displayQA();
            resetTimer();
            timer();
        },6000);
    };
});

});