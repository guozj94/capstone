//var screen2HTML = '<div class="animated slideInUp" id="screen2" style="height: 522px; width: 295px; background-color: green;"></div>';
class Iphone {
  constructor(props) {
    this.self = props;
    this.textElement = props.getElementsByTagName("p")[0];
    this.screen2 = document.getElementById("screen2");
    this.button = props.getElementsByTagName("button")[0];
    this.button.addEventListener("click", (event) => {this.clickHandler(event)});
  }
  clickHandler(event) {
    //this.textElement.innerHTML = "Button Clicked!";
    console.log("button clicked!");
    //this.self.innerHTML = screen2HTML;
    this.screen2.classList.remove("nodisplay");
  }
  changeText() {
    this.textElement.innerHTML = "change text";
  }
}
class PaymentSlider {
  constructor(props, minimum, full) {
    this.self = props;
    this.ball = props.getElementsByClassName("slidingball")[0];
    this.slider = props.getElementsByClassName("slidingbar")[0];
    this.ball.addEventListener("dragstart", (event) => {this.handleDragStart(event)}, false);
    this.ball.addEventListener("drag", (event) => {this.handleDrag(event)}, false);
    this.ball.addEventListener("dragend", (event) => {this.handleDragEnd(event)}, false);
    this.ball.addEventListener("dragenter", (event) => {event.preventDefault();}, false);
    this.ball.addEventListener("dragover", (event) => {event.preventDefault();}, false);
    this.left = 220; //position in the css
    this.position = 0; //last event position
    this.amount = full - minimum;
    this.full = full;
    this.minimum = minimum;
    this.youpay = props.getElementsByTagName("input")[0];
    //console.log(this.youpay);
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
    //console.log(event.clientX, this.position);
    event.preventDefault();
    let move = event.clientX - this.position;

    //console.log("ondrag",move,this.position);
    this.left = this.left + move;
    if(this.left > 130) {this.left = 130; return;}
    else if(this.left < 0) {this.left = 0; return;}
    this.slider.style.left = this.left + 'px';
    this.position = event.clientX;
    //this.slider.getElementsByClassName("slider-moneytag")[0].innerHTML = '$' + parseInt((this.full - this.minimum) * (this.left - 20) / 200 + this.minimum);
    //this.slider.getElementsByClassName("slider-percentage")[0].innerHTML = parseInt((this.left - 20) / 2) + '%';
    //change slider color
    document.styleSheets[0].addRule('.sliding:after', 'width: '+parseInt(this.left / 130 * 100)+'%;');
    //change input text
    this.youpay.value = parseInt((this.full - this.minimum) * (this.left) / 130 + this.minimum);
  }
  handleDragEnd(event) {
    //console.log("onrelease");
    event.preventDefault();
    this.position = 0;
  }
  handleKeyPress(event) {
    let inputNum = event.target.value;
    if(inputNum < this.minimum || inputNum > this.full) return;
    let percentage = (inputNum - this.minimum) * 1.0 / (this.full - this.minimum);
    console.log(percentage);
    this.slider.style.left = percentage * 130 + 'px';
    //this.slider.getElementsByClassName("slider-moneytag")[0].innerHTML = '$' + parseInt(inputNum);
    //this.slider.getElementsByClassName("slider-percentage")[0].innerHTML = parseInt(percentage * 100) + '%';
    document.styleSheets[0].addRule('.sliding:after', 'width: '+parseInt(percentage * 100)+'%;');
  }
}
class QuizDrag {
  constructor(props, array, answer) {
    this.self = this;
    this.array = array;
    this.answer = answer;
    this.choices = props.getElementsByClassName("items")[0].getElementsByTagName("img");
    this.initPosition = [];
    this.choicePositions = [];
    this.answersPositions = [];
    this.answers = props.getElementsByClassName("answerspot");
    this.result = props.getElementsByClassName("result")[0];
    for(let i = 0; i < this.choices.length; i++) {
      //this.choices[i].addEventListener("click", (event) => {this.handleClick(event);}, false);
      this.choices[i].addEventListener("dragstart", (event) => {this.handleDragStart(event)}, false);
      this.choices[i].addEventListener("drag", (event) => {this.handleDrag(event)}, false);
      this.choices[i].addEventListener("dragend", (event) => {this.handleDragEnd(event)}, false);
      this.choices[i].addEventListener("dragenter", (event) => {event.preventDefault();}, false);
      this.choices[i].addEventListener("dragover", (event) => {event.preventDefault();}, false);
      this.answers[i].addEventListener("click", (event) => {this.handleClick(event)}, false);
    }
  }
  handleClick(event) {
    if(event.target.src == "quiz-questionmark.png") return;
    for(let i = 0; i < this.choices.length; i++) {
      if(this.choices[i].src == event.target.src) {
        event.target.src = "quiz-questionmark.png";
        event.target.dataset.is_answer = "no";
        this.choices[i].dataset.is_selected = "no";
        this.choices[i].style.visibility = "";
      }
    }
  }
  handleDragStart(event) {
    //get all items positions dynamically
    this.choicesPositions = [];
    this.answersPositions = [];
    for(let j = 0; j < this.answers.length; j++) {
      this.choicePositions.push({left: this.choices[j].getBoundingClientRect().left, top: this.choices[j].getBoundingClientRect().top});
      this.answersPositions.push({left: this.answers[j].getBoundingClientRect().left, top: this.answers[j].getBoundingClientRect().top});
      //console.log(this.answersPositions[j]);
    }

  }
  //handle event.client == {0, 0}
  handleDrag(event) {
    if(event.clientX == 0 || event.clientY == 0) return;
    //console.log(event.clientX, event.clientY);
  }
  handleDragEnd(event) {
    event.preventDefault();
    for(let i = 0; i < this.answersPositions.length; i++) {
      // if drag ends in answer area
      if(this.answersPositions[i].left < event.clientX && 
         this.answersPositions[i].left + 126 > event.clientX &&
         this.answersPositions[i].top < event.clientY &&
         this.answersPositions[i].top + 38 > event.clientY) {
        //change answer attribute
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
      this.result.innerHTML = "Correct";
    }
  }
}
$(document).ready(() => {
						   
  // $(window).resize(function(){

  //   $('.iphone-container').css({
  //     position:'absolute',
  //     left: ($('.light').width() - $('.iphone-container').outerWidth())/2,
  //     top: ($('.light').height() - $('.iphone-container').outerHeight())/2
  //   });

  //   $('.iphone-container').css({
  //     position:'absolute',
  //     left: ($('.dark').width() - $('.iphone-container').outerWidth())/2,
  //     top: ($('.dark').height() - $('.iphone-container').outerHeight())/2
  //   });

  // });
 
  // $(window).resize();
  const s1 = document.getElementsByClassName("phone-screen")[0];
  const s2 = document.getElementsByClassName("slider")[0];
  const s3 = document.getElementsByClassName("quiz")[0];
  console.log(s1);
  console.log(s2);
  const iphone = new Iphone(s1);
  const slider = new PaymentSlider(s2, 15, 100);
  const quiz = new QuizDrag(s3, [], null);
  iphone.changeText();

});
