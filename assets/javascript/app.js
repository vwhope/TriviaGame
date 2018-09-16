 // JavaScript/jQuery for go Nuts! Trivia Game
 
 // important lessons learned with this game:
 // 1. the difference between using hide/show versus using empty and then manually re-creating elements on the DOM
 //    when you hide/show html the event listeners/handlers remain attached/active
 //    if you use empty - you have deleted those elements from the DOM and the listeners/handlers are gone as well!
 //    it takes more resources to empty, recreate, re-add events than to just hide/show existing HTML
 // 2. experience using the HTML DOM Window object 'Timing Events'
 //    the difference between using setTimeout() and setInterval() 
 //    the importance of using clearTimeout() to stop timer and prevent from running into negative time
 //    understanding the unit of measure for timing event functions (1000 milliseconds = 1 second)
 // 3. understanding the difference in how the .prop vs .attr work in jQuery (http://api.jquery.com/prop/)
 //    .prop allows setting property on a DOM element which affects the running state of HTML page
 //    .attr allows setting of an attribute value, can show the state, but does not affect the running state
 
 
 // ================================ BEGIN GLOBAL VARIABLE DEFINITIONS =======================================================
 // set GLOBAL variables available to all functions - (generally don't want global- is better to make an encapsulated object)
 
 var totCorrect = 0;
 var totIncorrect = 0;
 var totUnanswered = 0;
 var intervalId = 0;
 var countDownNbr = 10; // countdown for each question = 30 seconds, for answer and result: 15 seconds, shorter now for testing purposes
 var questionCounter = 0;
 
 var questionsArr = ['1. Which nut listed can NOT be purchased in its shell?',
 '2. Which nut listed is a TRUE nut?',
 '3. Which nut listed is NOT a TREE nut?',
 '4. Shells of which nut are frequently used as an abrasive in cleaning, polishing and body/bath products?',
 '5. Which US state produces the most pecans annually?',
 '6. Per one ounce serving, which nut has the highest fat content?',
 '7. Which nuts can be harvested from the forests of the Southwestern United States?',
 '8. Per one ounce serving, which tree nut contains the most protein, fiber and calcium?',
 '9. Which tree nut requires a specific bee to pollinate it and has triangular seeds?',
 '10. Which tree nut is native to the Middle East, is one of the oldest flowering nut trees, and dates back as far as 7,000 B.C.?'];
 
 var choicesArr = ['Brazil nut,Walnut,Hazelnut,Pine nut,Macadamia Nut,Cashew',
 'Peanut,Hazelnut,Almond,Pistachio,Cashew,Pine nut',
 'Pecan,Pistachio,Pine nut,Brazil Nut,Peanut,Walnut',
 'Pine nut,Brazil nut,Walnut,Pistachio,Peanut,Almond',
 'California,Texas,New Mexico,Arizona,Georgia,Florida',
 'Almond,Cashew,Hazelnut,Macadamia nut,Pine nut,Walnut',
 'Brazil nut,Walnut,Cashew,Almond,Pine nut,Hazelnut',
 'Almond,Brazil nut,Cashew,Pecan,Walnut,Pistachio',
 'Almond,Brazil nut Hazelnut,Cashew,Pecan,Pistachio',
 'Pistachio,Hazelnut,Pecan,Walnut,Brazil Nut,Cashew'];
 
 var subChoiceArr;

 var answersArr = ['Cashew', 'Hazelnut', 'Peanut', 'Walnut', 'Georgia', 'Macadamia nut', 'Pine nut', 'Almond', 'Brazil nut', 'Pistachio']
 
 var answersTextArr = ['A1: Cashew is the correct answer. Cashew shells are toxic and come from the same plant family as poison ivy.',
 'A2: Hazelnut is the correct answer. TRUE nuts have a hard wall around the seed. Both hazel nuts and pecans are TRUE nuts.',
 'A3: Peanut is the correct answer. Peanuts are actually a type of pea or legume and grows underground.',
 'A4: Walnut is the correct answer. Pulverized walnut shells are frequently used when a natural abrasive is required.',
 'A5: Georgia is the correct answer. In most years, Georgia produces the most pecans. Texas is a close second and will occasionally exceed Georgia.',
 'A6: Macadamia nut is the correct answer. Macadamia nuts, grown in Hawaii, contain the most fat of any tree nut.',
 'A7: Pine nut is the correct answer. Many pine nuts come from pine cones of pinyon trees of the American Southwest.',
 'A8: Almond is the correct answer. Almonds also contain more vitamin B2, vitamin B3, and vitamin E than other tree nuts.',
 'A9: Brazil Nut is the correct answer. The tree produces fruit that contain triangular seeds packed like orange segments. Those seeds are the Brazil nuts.',
 'A10: Pistachio is the correct answer. Pistachios are also known as the "smiling nut" in Iran.'];
 
 var answersPhotoArr = ['assets/images/cashew-LauraLartigue.jpg',
 'assets/images/food-hazelnuts-nuts-68483_cropped.jpg',
 'assets/images/peanutPlant-2259271_640.jpg',
 'assets/images/walnuts-tom-hermans-642305-unsplash.jpg',
 'assets/images/pecans-deryn-macey-508336-unsplash.jpg ',
 'assets/images/macadamia-nuts-1098170_1920.jpg',
 'assets/images/pine-nuts-1732073_1920.jpg',
 'assets/images/almonds-tetiana-bykovets-422966-unsplash.jpg',
 'assets/images/brazil-nut-638972_1920.jpg',
 'assets/images/pistachios-1540123_1920.jpg'];
 
 // this is pageDivs object as demonstrated by Keith to easily identify which divs to hide or show
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
// reset all score variables to zero, reset timer variables to default settings
function initializeGame() {
  totCorrect = 0;
  totIncorrect = 0;
  totUnanswered = 0;
  intervalId = 0;
  countDownNbr = 10; // number of seconds player has to: answer questions
  showStart();
}

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
// note: a call back is a function to be executed after another function has finished executing
// in js: functions are objects so functions can take functions as arguments and can be returned by other functions
// functions that use callbacks are called higher-order functions
// any function passed as an argument is called a callback function
// call backs are a way to be sure specific code doesn't execute until other specific code has already finished

// to show answerDiv only
function showAnswers (callback) {
  $pageDivs.all.hide();
  $pageDivs.answers.show();
  setTimeout(callback, 10000);
}

// to show resultDiv only
function showResults () {
  $pageDivs.all.hide();
  $pageDivs.results.show();
  // setTimeout(callback, 10000);
  
}
///////////////////////////////////////////////////////////
// set the timer interval to run every second and count down by 1 second using decrement function
function startTimer() {
  intervalId = setInterval(decrement, 1000); // run this function every sec
}// create an new interval and store a ref to it in this variable

// decrement countDownNbr by 1 until it reaches 0, then stop timer
function decrement() {
  // if out of time...
  if (countDownNbr === 0) {
    stopTimer();
    showNextAnswer();
  } else {
    countDownNbr--;
    $('.showCountdown').html('<h2>' + countDownNbr + '</h2>');
  }
} //end decrement function

// stop timer by clearing intervalId - unless stop, decrement will continue to repeat until browser is refreshed
function stopTimer() {
  clearInterval(intervalId); 
}
////////////////////////////////////////////////////////////

// this function only runs if user CLICKS an answer  
function getUserChoice() {
  stopTimer();
  var i = questionCounter;

 ////////////////// there has got to be a better way ////////////
  console.log(choicesArr[i]); // these are the possible choices for THIS question (i)
  
  var getChoiceArr = []; // build new array with the choices for this question
  getChoiceArr = choicesArr[i].split(',');

  var userChoice = $('input:radio:checked').val(); // this gets which radio button was clicked
    console.log('userChoice = ' + userChoice);
    
  var j = 0;
  j =  userChoice.substring(13,14); // this gets the index nbr that matches the user choice clicked
    console.log('j = ' + j);
  
  userChoice = getChoiceArr[j];
  console.log(userChoice);
 /////////////////////////////////////////////////////////////////

 // now see if the userChoice matches the correct answer
  
  
  console.log('answersArr: ' + i );
  console.log('answersArrdata: ' + answersArr[i]);
  
  if (userChoice === answersArr[i]) {
    $('#statusMsg').html('CORRECT!');
    totCorrect = totCorrect + 1;
    console.log('total correct: ' + totCorrect);
  } else {
    $('#statusMsg').html('Sorry, your answer is incorrect'); 
    totIncorrect = totIncorrect + 1;
    console.log('total Incorrect: ' + totIncorrect);
  }
   // be sure all radio buttons are UNchecked
   $('input[name=choice]').attr('checked', false);
  
   showNextAnswer();
  
} // end function getUserChoice



function showNextQuestion() {
  stopTimer();
  countDownNbr = 10;
  startTimer();
  
  // +1 for next question - this is the only place you should increment the question counter!
  questionCounter = questionCounter + 1;
  // putting questionCounter in i variable for ease of reading the array index code
  var i = questionCounter;
  console.log('showNextQuestion var i = ' + i);
  
  if (i < questionsArr.length) {
    showQuestions();
    $( '.titleCountdown').html('Time Remaining:');
    $( '.showCountdown').html(countDownNbr);
    // show next question
    $( '#question' ).html(questionsArr[i]);
    
    // be sure all radio buttons are UNchecked
    $('input[name=choice]').prop('checked', false); // impt: .prop updates the DOM, but .attr did NOT - 

    // show choices (labels for radio buttons) each question has 6 choices (substrings of choicesArr which is incremented so do not need to increment the substring) 
    subChoiceArr = choicesArr[i].split(',');

    console.log(subChoiceArr[0]);

    $('label[for=radioLabel1]').html(subChoiceArr[0]);
    $('label[for=radioLabel2]').html(subChoiceArr[1]);
    $('label[for=radioLabel3]').html(subChoiceArr[2]);
    $('label[for=radioLabel4]').html(subChoiceArr[3]);
    $('label[for=radioLabel5]').html(subChoiceArr[4]);
    $('label[for=radioLabel6]').html(subChoiceArr[5]);

    
    
  } else {
    showEndResults();
  };
} //end showNextQuestion



function showEndResults() {
  stopTimer();
  countDownNbr = 0;
  showResults();
  $( '#totCorrect').html(totCorrect); 
  $( '#totIncorrect').html(totIncorrect); 
  $( '#totUnanswered').html(totUnanswered); 
} // end showResults - is end of game unless user clicks restart



function showNextAnswer(callback) {
  var i = questionCounter;
 // if user ran out of time, add 1 to totUnaswered
  if(countDownNbr === 0) {
    totUnanswered = totUnanswered + 1;
    $('#statusMsg').html('Out of Time!');
  };
 
  stopTimer();
  showAnswers(showNextQuestion);
  $('.titleCountdown').html('Time Remaining:');
  $('.showCountdown').html(countDownNbr);
 
  $('#answer').html(answersTextArr[i]);
  $('#answerImg').attr('src', answersPhotoArr[i]);
  setTimeout(callback, 10000);
  } // end showNextAnswer - should call back to showNextQuestion until out of questions


function playGame() {
  // user has pressed the start or restart button, you only go through this function once per game!
  // startTimer function is called and countDownNbr displays each second until 0 time
  // the FIRST question in questionsArr should be visible
      
  totCorrect = 0;
  totIncorrect = 0;
  totUnanswered = 0;
  intervalId = 0;
  countDownNbr = 10; // number of seconds player has to: answer questions
    
  questionCounter = 0; // start question counter at first question in array
  var i = questionCounter; // get first array element
  
  // show countdownTimer, first question and its choices
  startTimer();
  showQuestions();
  
  $( '.titleCountdown').html('Time Remaining:');
  $( '.showCountdown').html(countDownNbr);
  ////// display question - show next questions
  $( '#question' ).html(questionsArr[i]);
  
  // show choices (labels for radio buttons) each question has 6 choices (substrings of choicesArr which is incremented so do not need to increment the substring) 
  var subChoiceArr = choicesArr[i].split(',');
  
  $('label[for=radioLabel1]').html(subChoiceArr[0]);
  $('label[for=radioLabel2]').html(subChoiceArr[1]);
  $('label[for=radioLabel3]').html(subChoiceArr[2]);
  $('label[for=radioLabel4]').html(subChoiceArr[3]);
  $('label[for=radioLabel5]').html(subChoiceArr[4]);
  $('label[for=radioLabel6]').html(subChoiceArr[5]);
  
  // control passes to decrement function (called in the startTimer function)  
}; // end playGame function

// ================================ END FUNCTION DEFINITIONS  ===============================================================

// ================================ BEGIN GAME HERE =========================================================================
// HTML page loads FIRST, then this code runs 

initializeGame(); // reset all counters, stop any timers, show start button and game directions 

// Register event listeners/handlers for ANY button click event, get which button clicked
$('.playBtn').on('click', playGame); 
$('.radioBtn').on('click', getUserChoice);



// ================================ END GAME ================================================================================
// my pseudo code for the game
// 0.  wait until doc is ready before running any JavaScript 
// 1.  initialize all variables, show START screen with directions and start button (DONE)
// 2.  register event listeners/handlers for all click events (these need to be global? so outside of any function) (DONE)
// 3.  click start button to advance to FIRST QUESTION in question array (this option does not auto advance based on timer) (Done - but is hard-coded)
// 4.  show QUESTION, possible answers for that question and timer ticking down (done but hard-coded)
// 5.  to advance to ANSWER screen - two possibilities exist:
//       user clicks a choice ('.radioBtn'): function called should stop timer , get user choice ('input:radio:checked'), add 1 to either correct or incorrect
//       user lets time run out (time=0): add 1 to unanswered, automatically show ANSWER screen 
// 6.  display ANSWER screen with timer stopped, showing left over time (if any), whether correct, incorrect or out of time, show correct answer and photo 
// 7.  ANSWER screen is shown for specific # seconds, with no user input (are there 2 timing events? setTimer for function vs setInterval for countDownNbr?)
// 8.  once ANSWER screen display time is 0, determine if out of questions (i < questionsArr.length false)
// 9.    if out of questions show RESULTS screen with stats and button to restart game - this is END GAME unless user restarts it
// 10.   if not out of questions, increment 'i' to move to next question (is this the correct place to check this?)
// 11.   repeat steps beginning at step 4