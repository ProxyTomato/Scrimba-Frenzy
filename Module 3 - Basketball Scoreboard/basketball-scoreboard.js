const homeScoreDisplay = document.getElementById("home-score-display");
const guestScoreDisplay = document.getElementById("guest-score-display");
const add1PointBtnHome = document.getElementById("add-1-point-btn-home");
const add2PointsBtnHome = document.getElementById("add-2-points-btn-home");
const add3PointsBtnHome = document.getElementById("add-3-points-btn-home");
const add1PointBtnGuest = document.getElementById("add-1-point-btn-guest");
const add2PointsBtnGuest = document.getElementById("add-2-points-btn-guest");
const add3PointsBtnGuest = document.getElementById("add-3-points-btn-guest");

let homeScore = 0;
let guestScore = 0;

function render(Display, Score){
	Display.innerText = Score
}

add1PointBtnHome.addEventListener("click", function(){
	homeScore += 1;
	render(homeScoreDisplay, homeScore);
})

add2PointsBtnHome.addEventListener("click", function(){
	homeScore += 2;
	render(homeScoreDisplay, homeScore);
})

add3PointsBtnHome.addEventListener("click", function(){
	homeScore += 3;
	render(homeScoreDisplay, homeScore);
})

add1PointBtnGuest.addEventListener("click", function(){
	guestScore += 1;
	render(guestScoreDisplay, guestScore);
})

add2PointsBtnGuest.addEventListener("click", function(){
	guestScore += 2;
	render(guestScoreDisplay, guestScore);
})

add3PointsBtnGuest.addEventListener("click", function(){
	guestScore += 3;
	render(guestScoreDisplay, guestScore);
})
