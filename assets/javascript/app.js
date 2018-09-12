 // JavaScript/jQuery for go Nuts! Trivia Game

 // important lessons learned with this game:
 // 1. the difference between using hide/show versus using empty and then manually re-creating elements on the DOM
 //    when you hide/show html the event listeners/handlers remain attached/active
 //    if you use empty - you have deleted those elements from the DOM and the listeners/handlers are gone as well!
 //    it takes more resources to empty, recreate, re-add events than to just hide/show existing HTML
 // 2. experience using the HTML DOM Window object "Timing Events"
 //    the difference between using setTimeout() and setInterval() 
 //    the importance of using clearTimeout() to stop timer and prevent from running into negative time
 //    understanding the unit of measure for timing event functions (1000 milliseconds = 1 second)

 
 // ================================ BEGIN GLOBAL VARIABLE DEFINITIONS =======================================================
 // set GLOBAL variables available to all functions - (generally don't want global- is better to make an encapsulated object)
 var totCorrect = 0;
 var totIncorrect = 0;
 var totUnanswered = 0;
 var intervalId = 0;
 var countDownNbr = 15; // set countdown for each question to 30 seconds, shorter now for testing purposes
 // may not need these three variables
 var questionNbr = 0;
 var choicesNbr = 0;
 var answserNbr = 0;
 
 
 var questionArr = ["1. Which nut listed can NOT be purchased in its shell?",
 "2. Which nut listed is a TRUE nut?",
 "3. Which nut listed is NOT a TREE nut?",
 "4. Shells of which nut are frequently used as an abrasive in cleaning, polishing and body/bath products?",
 "5. Which US state produces the most pecans annually?",
 "6. Per one ounce serving, which nut has the highest fat content?",
 "7. Which nuts can be harvested from the forests of the Southwestern United States?",
 "8. Per one ounce serving, which tree nut contains the most protein, fiber and calcium?",
 "9. Which tree nut requires a specific bee to pollinate it and has triangular seeds?",
 "10.Which tree nut is native to the Middle East, is one of the oldest flowering nut trees, and dates back as far as 7,000 B.C.?"];
 var choicesArr = ["Brazil nut,Walnut,Hazelnut,Pine nut,Macadamia Nut,Cashew",
 "Peanut,Hazelnut,Almond,Pistachio,Cashew,Pine nut",
 "Pecan,Pistachio,Pine nut,Brazil Nut,Peanut,Walnut",
 "Pine nut,Brazil nut,Walnut,Pistachio,Peanut,Almond",
 "California,Texas,New Mexico,Arizona,Georgia,Florida",
 "Almond,Cashew,Hazelnut,Macadamia nut,Pine nut,Walnut",
 "Brazil nut,Walnut,Cashew,Almond,Pine nut,Hazelnut",
 "Almond,Brazil nut,Cashew,Pecan,Walnut,Pistachio",
 "Almond,Brazil nut Hazelnut,Cashew,Pecan,Pistachio",
 "Pistachio,Hazelnut,Pecan,Walnut,Brazil Nut,Cashew"];
 var answerArr = ["A1: Cashew is correct!  - Cashew shells are toxic. Cashews come from the same plant family as poison ivy.",
 "A2: Hazel nut is correct! TRUE nuts have a hard wall around the seed. Both hazel nuts and pecans are TRUE nuts.",
 "A3: Peanut is correct! Peanuts are actually a type of pea or legume and grows underground.",
 "A4: Walnut is correct! Pulverized walnut shells are frequently used when a natural abrasive is required.",
 "A5: Georgia is correct! In most years, Georgia produces the most pecans. Texas is a close second and will occasionally exceed Georgia.",
 "A6: Macadamia nut is correct! Macadamia nuts, grown in Hawaii, contain the most fat of any tree nut.",
 "A7: Pine nut is correct! Many pine nuts come from pine cones of pinyon trees of the American Southwest.",
 "A8: Almond is correct! Almonds also contain more vitamin B2, vitamin B3, and vitamin E than other tree nuts.",
 "A9: Brazil Nut is correct! The tree produces fruit that contain triangular seeds packed like orange segments. Those seeds are the Brazil nuts.",
 "A10: Pistachio is Correct! Pistachios are also known as the \"smiling nut\" in Iran."];
 var answerPhotoArr = ["assets/images/cashew-LauraLartigue.jpg",
 "assets/images/food-hazelnuts-nuts-68483_cropped.jpg",
 "assets/images/peanutPlant-2259271_640.jpg",
 "assets/images/walnuts-tom-hermans-642305-unsplash.jpg",
 "assets/images/pecans-deryn-macey-508336-unsplash.jpg ",
 "assets/images/macadamia-nuts-1098170_1920.jpg",
 "assets/images/pine-nuts-1732073_1920.jpg",
 "assets/images/almonds-tetiana-bykovets-422966-unsplash.jpg",
 "assets/images/brazil-nut-638972_1920.jpg",
 "assets/images/pistachios-1540123_1920.jpg"];

 // this is my pageDivs object so I can easily identify which divs to hide or show
var $pageDivs = {
    all: $('.page'),
    startGame: $('#startDiv'),
    questions: $('#questionDiv'),
    answers: $('#answerDiv'),
    results: $('#resultDiv')
};



 // ================================ END GLOBAL VARIABLE DEFINITIONS =========================================================
 
 // ================================ BEGIN FUNCTION DEFINITIONS  =============================================================
 // 
 // this function resets all game variables to zero, and sets timer to starting countdown number (# seconds player has to answer each question)
 
// to show startDiv only 
function showStart () {
  $pageDivs.all.hide();
  $pageDivs.startGame.show();
 }
 
 // to show questionDiv only
 function showQuestions () {
  $pageDivs.all.hide();
  $pageDivs.questions.show();
 }
 
 // to show answerDiv only
 function showAnswers () {
  $pageDivs.all.hide();
  $pageDivs.answers.show();
 }
 
 // to show resultDiv only
 function showResults () {
  $pageDivs.all.hide();
  $pageDivs.results.show();
 }
 
 function initializeGame() {
  totCorrect = 0;
  totIncorrect = 0;
  totUnanswered = 0;
  intervalId = 0;
  countDownNbr = 15;
  
  showStart();
}

// set the timer interval to run every second and count down by 1 second using decrement function
function startTimer() {
  intervalId = setInterval(decrement, 1000); // run this function every sec
}// create an new interval and store a ref to it in this variable

// this function decrements countDownNbr by 1 until it reaches 0
function decrement() {
  
  if (countDownNbr === 0) {
    stopTimer();
  } else {
    countDownNbr--;
    $("#showCountdown").html("<h2>" + countDownNbr + "</h2>");
  }
} //end decrement function

// this function stops the countDownNbr by clearing the interval id
// If you don't stop the it, it will continue to decrement until brwoser is refreshed
function stopTimer() {
  clearInterval(intervalId); 
}

function showQuestions() {
  // at this point, the user has pressed the start button, now I want to "change" the screen for the first question
  // 1. remove direction text and button from initial starting screen 
  $( '#question' ).add(choicesArr[0]);
  var subChoiceArr = choicesArr[i].split(',');
  console.log(subChoiceArr);
  
  $( '#startDiv').empty();
  $( '.titleCountdown').html("Time Remaining:");
  $( '.showCountdown').html(countDownNbr);
  $( '#question' ).html(questionArr[0]);
  
  $('label[for=radioLabel1]').html(subChoiceArr[0]);
  $('label[for=radioLabel2]').html(subChoiceArr[1]);
  $('label[for=radioLabel3]').html(subChoiceArr[2]);
  $('label[for=radioLabel4]').html(subChoiceArr[3]);
  $('label[for=radioLabel5]').html(subChoiceArr[4]);
  $('label[for=radioLabel6]').html(subChoiceArr[5]);
  
  $(function(){
    $(".radioBtn").on("click", function cb (){   
      stopTimer();   
      var selectedAnswer = $('input:radio:checked').val();
      // the issue here is that I need that actual value of subChoiceArr[i] not the literal value of "subChoiceArray[i]"
      console.log(selectedAnswer);   
    });
  });
  
  
  
} 


// ================================ END FUNCTION DEFINITIONS  ===============================================================

// ================================ BEGIN GAME HERE =========================================================================
// HTML page loads FIRST, then this code runs 

setGame(); // reset all counters, stop any timers, show start button and game directions 

// Register event listeners/handlers for ANY button click event, get which button clicked
// you will need a for loop and use i for array so will work for each question

$( '#startBtn').on("click", startTimer); // change to go to start game first - setup up for loops for q & a



// ================================ END GAME ================================================================================

///////////////////////  NOTES: possible function CALLS
// restart();
// startTimer();
// decrement();
// stopTimer();
// showQuestion();

// user clicks start button and handler starts the timer startTimer
// 
// remove #startDiv from html page          $( "#startDiv" ).remove();
// add: Time remaining text, countDownNbr, first question and choices for first question
// $('body').html($('<div))