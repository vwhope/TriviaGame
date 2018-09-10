 // JavaScript/jQuery for go Nuts! Trivia Game

// ================================ BEGIN GLOBAL VARIABLE DEFINITIONS =======================================================
// set GLOBAL variables available to all functions - (generally don't want global- is better to make an encapsulated object)
var totCorrect = 0;
var totIncorrect = 0;
var totUnanswered = 0;
var intervalId = 0;
var countDownNbr = 30; // set countdown for each question to 30 seconds


var questionArr = ["Q1", "Q2", "Q3", "Q4", "Q5","Q6", "Q7", "Q8", "9", "Q10"];
var choicesArr = [];
var answerArr = [];
var answerPhotoArr = [];

// ================================ END GLOBAL VARIABLE DEFINITIONS =========================================================

// ================================ BEGIN FUNCTION DEFINITIONS  =============================================================
// 
// this function resets all game variables to zero
function restart() {
    totCorrect = 0;
    totIncorrect = 0;
    totUnanswered = 0;
    var intervalId = 0;
    var countDownNbr = 30;
}

// set the timer interval to run every second and count down by 1 second using decrement function
function startTimer() {
    intervalId = setInterval(decrement, 1000); // run this function every sec
  }// create an new interval and store a ref to it in this variable

// this function decrements countDownNbr by 1 until it reaches 0
  function decrement() {
    countDownNbr--;
    $("#show-countdown").html("<h2>" + countDownNbr + "</h2>");

    if (countDownNbr === 0) {
      stop();
      alert("time to move on to next question");
    }
  }

  // this function stops the countDownNbr by clearing the interval id
  // If you don't stop the it, it will continue to decrement until brwoser is refreshed
  function stop() {
    clearInterval(intervalId); 
  }
      
 function nextQuestion() {
     // start here tomorrow
 } 


// ================================ END FUNCTION DEFINITIONS  ===============================================================

// ================================ BEGIN GAME HERE =========================================================================
// HTML page loads FIRST, then this code runs 

restart(); // reset all counters, stop any timers, show start button and game directions 

// Register event listeners/handlers for ANY button click event, get which button clicked

$("#startBtn").on("click", startTimer);
$("radioBtn").on("click", nextQuestion);




// ================================ END GAME ================================================================================




///////////////////////  function CALLS

startTimer();
decrement();
  


  



  run();
