const PAYMENT1_TEEN = 0;
const PAYMENT2_TEEN = 1;
const PAYMENT3_TEEN = 2;
const PAYMENT4_TEEN = 3;
const PAYMENT5_TEEN = 4;
const PAYMENT6_TEEN = 5;
const PAYMENT7_TEEN = 6;
const PAYMENT0_MOM = 0;
const PAYMENT1_MOM = 1;
const PAYMENT2_MOM = 2;
const PAYMENT3_MOM = 3;

function addClickThroughListeners(allTeenScreens, allMomScreens) {
	document.getElementById("to-payment2").addEventListener("click", function() {
		allTeenScreens[PAYMENT1_TEEN].classList.add("nodisplay");
		allTeenScreens[PAYMENT2_TEEN].classList.remove("nodisplay");
		allMomScreens[PAYMENT0_MOM].classList.add("nodisplay");
		allMomScreens[PAYMENT1_MOM].classList.remove("nodisplay");
		document.getElementById("teen-btmbar").classList.add("nodisplay");
	});
	document.getElementById("to-payment2-mom").addEventListener("click", function() {
		allMomScreens[PAYMENT1_MOM].classList.add("nodisplay");
		allMomScreens[PAYMENT2_MOM].classList.remove("nodisplay");
	});
	document.getElementById("to-payment3-mom").addEventListener("click", function() {
		allTeenScreens[PAYMENT2_TEEN].classList.add("nodisplay");
		console.log(allTeenScreens[PAYMENT3_TEEN]);
		allTeenScreens[PAYMENT3_TEEN].classList.remove("nodisplay");
		allMomScreens[PAYMENT2_MOM].classList.add("nodisplay");
		allMomScreens[PAYMENT3_MOM].classList.remove("nodisplay");
	});
	document.getElementById("to-payment4-mom").addEventListener("click", function() {
		allMomScreens[PAYMENT3_MOM].classList.add("nodisplay");
		allMomScreens[PAYMENT0_MOM].classList.remove("nodisplay");
	});
	document.getElementById("to-payment4").addEventListener("click", function() {
		allTeenScreens[PAYMENT3_TEEN].classList.add("nodisplay");
		allTeenScreens[PAYMENT4_TEEN].classList.remove("nodisplay");
		//document.getElementById("teen-btmbar").classList.remove("nodisplay");
	});
	document.getElementById("payment4-box").addEventListener("click", function() {
		let quizElement = document.getElementById("statement-quiz");
		document.getElementById("teen-statusbar-hover").classList.remove("nodisplay");
		document.getElementById("teen-btmbar").classList.add("nodisplay");
		document.getElementById("payment4-hover").classList.remove("nodisplay");
		document.getElementById("payment4").style.overflow = "hidden";
		quizElement.classList.remove("nodisplay");
		let quiz = new QuizDrag(quizElement, [], null);
	});
	document.getElementById("to-payment5").addEventListener("click", function() {
		allTeenScreens[PAYMENT4_TEEN].classList.add("nodisplay");
		allTeenScreens[PAYMENT5_TEEN].classList.remove("nodisplay");
    let dragElement = document.getElementById("payment5-slider");
    let drag = new PaymentSlider(dragElement, 15, 47.78);
	});
  document.getElementById("to-payment6").addEventListener("click", function() {
    allTeenScreens[PAYMENT5_TEEN].classList.add("nodisplay");
    allTeenScreens[PAYMENT6_TEEN].classList.remove("nodisplay");
    payment6();
  });
  document.getElementById("to-payment7").addEventListener("click", function() {
    if(this.dataset.isactive == "no") return;
    allTeenScreens[PAYMENT6_TEEN].classList.add("nodisplay");
    allTeenScreens[PAYMENT7_TEEN].classList.remove("nodisplay");
    payment7();
  });
  document.getElementById("to-payment8").addEventListener("click", function() {
    window.location.reload(false); 
  });
}
function payment6() {
  //show balance number
  console.log(document);
  let amount = document.getElementById("payment5-amount").value;
  console.log(amount);
  document.getElementById("payment6-amount1").innerHTML = "$" + amount;
  document.getElementById("payment6-amount2").innerHTML = "$" + amount;
  //check the terms and conditions
  document.getElementById("payment6-check").addEventListener("click", function() {
    //console.log(this);
    if(this.dataset.ischecked == "no") {
      this.dataset.ischecked = "yes";
      this.src = "screens/payment6-checked.svg";
      document.getElementById("to-payment7").dataset.isactive = "yes";
      document.getElementById("to-payment7").src = "screens/payment6-blue.svg";
      document.getElementById("payment6-text").classList.remove("nodisplay");
    }
    else {
      this.dataset.ischecked = "no";
      this.src = "screens/payment6-check.svg";
      document.getElementById("to-payment7").dataset.isactive = "no";
      document.getElementById("to-payment7").src = "screens/payment6-gray.svg";
      document.getElementById("payment6-text").classList.add("nodisplay");
    }
  });
}
function payment7() {
  let amount = document.getElementById("payment5-amount").value;
  console.log(amount);
  document.getElementById("payment7-amount1").innerHTML = '$' + amount.toFixed(2);
  document.getElementById("payment7-amount2").innerHTML = '$' + (47.78 - amount).toFixed(2);
  if(amount == "47.78") {
    document.getElementById("payment7-reward").classList.remove("nodisplay");
  }
}
class PaymentSlider {
  constructor(props, minimum, full) {
    this.self = props;
    this.ball = props.getElementsByClassName("slidingball")[0];
    this.slider = props.getElementsByClassName("slidingbar")[0];
    this.slidingProgress = props.getElementsByClassName("sliding")[0];
    this.badgood = document.getElementById("payment5-badgood");
    this.ball.addEventListener("dragstart", (event) => {this.handleDragStart(event)}, false);
    this.ball.addEventListener("drag", (event) => {this.handleDrag(event)}, false);
    this.ball.addEventListener("dragend", (event) => {this.handleDragEnd(event)}, false);
    this.ball.addEventListener("dragenter", (event) => {event.preventDefault();}, false);
    this.ball.addEventListener("dragover", (event) => {event.preventDefault();}, false);
    this.left = 130; //position in the css
    this.position = 0; //last event position
    this.amount = full - minimum;
    this.full = full;
    this.minimum = minimum;
    this.youpay = props.getElementsByTagName("input")[0];
    this.amount = full;
    this.youpay.addEventListener("keyup", (event) => {this.handleKeyPress(event)}, false);
    //this.slider.getElementsByClassName("slider-moneytag")[0].innerHTML = '$' + full;
  }
  handleDragStart(event) {
    //console.log("drag start");
    //this.initPos = event.clientX;
    this.position = event.clientX;
  }
  handleDrag(event) {
    if(event.clientX == 0) return;
    event.preventDefault();
    let move = event.clientX - this.position;
    this.left = this.left + move;
    if(this.left > 130) {this.left = 130; return;}
    else if(this.left < 0) {this.left = 0; return;}
    this.slider.style.left = this.left + 'px';
    this.position = event.clientX;
    let percentage = (this.left) * 1.0 / 130;
    //change slider color in terms of width (fixed left)
    this.slidingProgress.style.width = 142 * (this.left) / 130 + 'px';
    //change input text
    this.amount = ((this.full - this.minimum) * (this.left) / 130 + this.minimum).toFixed(2);
    this.youpay.value = this.amount;
    //change behavior indicator
    if(percentage <= 0.33) {
      document.getElementById("payment5-hurt").classList.add("hurt-active");
      document.getElementById("payment5-nothing").classList.remove("nothing-active");
      document.getElementById("payment5-good").classList.remove("good-active");
      document.getElementById("payment5-slider").getElementsByTagName("img")[0].src = "screens/payment5-hurt.svg";
    }
    else if(percentage > 0.66) {
      document.getElementById("payment5-hurt").classList.remove("hurt-active");
      document.getElementById("payment5-nothing").classList.remove("nothing-active");
      document.getElementById("payment5-good").classList.add("good-active");
      document.getElementById("payment5-slider").getElementsByTagName("img")[0].src = "screens/payment5-good.svg";
    }
    else {
      document.getElementById("payment5-hurt").classList.remove("hurt-active");
      document.getElementById("payment5-nothing").classList.add("nothing-active");
      document.getElementById("payment5-good").classList.remove("good-active");
      document.getElementById("payment5-slider").getElementsByTagName("img")[0].src = "screens/payment5-nothing.svg";
    }
  }
  handleDragEnd(event) {
    //console.log("onrelease");
    event.preventDefault();
    this.position = 0;
    document.getElementById("payment5-amount").value = this.amount;
  }
  handleKeyPress(event) {
    let inputNum = event.target.value;
    if(inputNum < this.minimum || inputNum > this.full) return;
    let percentage = (inputNum - this.minimum) * 1.0 / (this.full - this.minimum);
    console.log(percentage);
    this.slider.style.left = percentage * 130 + 'px';
    //this.slider.getElementsByClassName("slider-moneytag")[0].innerHTML = '$' + parseInt(inputNum);
    //this.slider.getElementsByClassName("slider-percentage")[0].innerHTML = parseInt(percentage * 100) + '%';
    //document.styleSheets[0].addRule('.sliding:after', 'width: '+parseInt(percentage * 100)+'%;');
    this.slidingProgress.style.width = 142 * (this.left) / 130 + 'px';
    document.getElementById("payment5-amount").value = this.amount;
  }
}
class QuizDrag {
  constructor(props, array, answer) {
    this.self = props;
    this.array = array;
    this.answer = answer;
    this.choices = props.getElementsByClassName("items")[0].getElementsByTagName("img");
    this.initPosition = [];
    this.choicePositions = [];
    this.answersPositions = [];
    this.answers = props.getElementsByClassName("answerspot");
    this.result = props.getElementsByClassName("result")[0];
    this.savePosition = [0, 0];
    this.done = document.getElementById("quiz-done");
    this.done.addEventListener("click", (event) => {this.quizDone(event)}, false);
    for(let i = 0; i < this.choices.length; i++) {
      //this.choices[i].addEventListener("click", (event) => {this.handleClick(event);}, false);
      this.choices[i].addEventListener("dragstart", (event) => {this.handleDragStart(event)}, false);
      this.choices[i].addEventListener("drag", (event) => {this.handleDrag(event)}, false);
      this.choices[i].addEventListener("dragend", (event) => {this.handleDragEnd(event)}, false);
      this.choices[i].addEventListener("dragenter", (event) => {event.preventDefault();}, false);
      this.choices[i].addEventListener("dragover", (event) => {event.preventDefault();}, false);
      this.answers[i].addEventListener("click", (event) => {this.handleClick(event)}, false);
    }
    console.log("constructor done");
  }
  quizDone(event) {
  	console.log(this.done.src);
  	if(this.done.dataset.clickable == "yes") {
  		this.self.classList.remove("slideInUp");
  		this.self.classList.add("slideOutDown");
  		//this.self.classList.add("nodisplay");
  		document.getElementById("teen-statusbar-hover").classList.add("nodisplay");
		  document.getElementById("payment4-hover").classList.add("nodisplay");
		  document.getElementById("payment4").style.overflow = "scroll";
  	}
  }
  handleClick(event) {
    if(event.target.src == "screens/quiz-answerspot.svg") return;
    for(let i = 0; i < this.choices.length; i++) {
      if(this.choices[i].src == event.target.src) {
        event.target.src = "screens/quiz-answerspot.svg";
        event.target.dataset.is_answer = "no";
        this.choices[i].dataset.is_selected = "no";
        this.choices[i].style.visibility = "";
      }
    }
    this.result.getElementsByTagName("img")[1].classList.add("nodisplay");
    this.result.getElementsByTagName("img")[0].classList.add("nodisplay");
    this.done.src = "screens/quiz-done-gray.svg";

  }
  handleDragStart(event) {
    //get all items positions dynamically
    this.choicesPositions = [];
    this.answersPositions = [];
    for(let j = 0; j < this.answers.length; j++) {
      this.choicePositions.push({left: this.choices[j].getBoundingClientRect().left, top: this.choices[j].getBoundingClientRect().top});
      this.answersPositions.push({left: this.answers[j].getBoundingClientRect().left, top: this.answers[j].getBoundingClientRect().top});
      console.log(this.answersPositions[j]);
    }

  }
  //handle event.client == {0, 0}
  handleDrag(event) {
    if(event.clientX == 0 || event.clientY == 0) return;
    this.savePosition[0] = event.clientX;
    this.savePosition[1] = event.clientY;
    //console.log(event.clientX, event.clientY);
  }
  handleDragEnd(event) {
    event.preventDefault();
    console.log("drag end");
    for(let i = 0; i < this.answersPositions.length; i++) {
      // if drag ends in answer area
      console.log(event.clientX, event.clientY);
      if(this.answersPositions[i].left < this.savePosition[0] && 
         this.answersPositions[i].left + 126 > this.savePosition[0] &&
         this.answersPositions[i].top < this.savePosition[1] &&
         this.answersPositions[i].top + 38 > this.savePosition[1]) {
        //change answer attribute
    	console.log("in");
        this.answers[i].src = event.target.src;
        this.answers[i].dataset.is_answer = event.target.dataset.is_answer;

        //reset event.target attributes
        event.target.dataset.is_selected = "yes";
        event.target.style.visibility = "hidden";
      }
    }
    //see if all choices are selected
    for(let j = 0; j < this.choices.length; j++) {
      if(this.choices[j].dataset.is_selected == "no") return;
    }
    //see if the answer is correct
    if(this.answers[this.answers.length - 1].dataset.is_answer == "yes") {
      //this.result.innerHTML = "Correct";
      this.result.getElementsByTagName("img")[0].classList.remove("nodisplay");
      this.done.src = "screens/quiz-done-blue.svg";
      this.done.dataset.clickable = "yes";
      return;
    }
    this.result.getElementsByTagName("img")[1].classList.remove("nodisplay");
    this.done.dataset.clickable = "no";
  }
}
function floatLootbox() {
  let floatLootboxPosition = 150;
  document.getElementById("payment4").addEventListener("scroll", function() {
    document.getElementById("payment4-box").style.top = floatLootboxPosition + this.scrollTop + 'px';
    document.getElementById("statement-quiz").style.bottom = -this.scrollTop + 'px';
  });
}
$(document).ready(() => {
	let allTeenScreens = document.getElementsByClassName("teen");
	let allMomScreens = document.getElementsByClassName("mom");
	//console.log(allTeenScreens[PAYMENT2]);
	let currentTeenPage = PAYMENT1_TEEN;
	addClickThroughListeners(allTeenScreens, allMomScreens);
  floatLootbox();
});