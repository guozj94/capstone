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
  constructor(props, amount) {
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
    this.amount = amount;
    this.slider.getElementsByClassName("slider-moneytag")[0].innerHTML = '$' + amount;
  }
  handleDragStart(event) {
    console.log("drag start");
    //this.initPos = event.clientX;
    this.position = event.clientX;
  }
  handleDrag(event) {
    console.log(event.clientX, this.position);
    event.preventDefault();
    let move = event.clientX - this.position;

    //console.log("ondrag",move,this.position);
    this.left = this.left + move;
    if(this.left > 220) {this.left = 220; return;}
    else if(this.left < 20) {this.left = 20; return;}
    this.slider.style.left = this.left + 'px';
    this.position = event.clientX;
    this.slider.getElementsByClassName("slider-moneytag")[0].innerHTML = '$' + parseInt(this.amount * (this.left - 20) / 200);
    this.slider.getElementsByClassName("slider-percentage")[0].innerHTML = parseInt((this.left - 20) / 2) + '%';
  }
  handleDragEnd(event) {
    console.log("onrelease");
    event.preventDefault();
    this.position = 0;
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

  var s1 = document.getElementsByClassName("phone-screen")[0];
  var s2 = document.getElementsByClassName("slider")[0];
  console.log(s1);
  console.log(s2);
  var iphone = new Iphone(s1);
  var slider = new PaymentSlider(s2, 100);
  iphone.changeText();

});
