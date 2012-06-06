/*
 * Copyright (c) 2012, Intel Corporation.
 *
 * This program is licensed under the terms and conditions of the 
 * Apache License, version 2.0.  The full text of the Apache License is at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 */

var sound_click; 
var sound_intro;
var soundoff;

function init(){
    license_init("license", "screen");
    document.getElementsByClassName("one-player")[0].innerHTML = getMessage("one_player");
    document.getElementsByClassName("two-player")[0].innerHTML = getMessage("two_player");
    document.getElementsByClassName("marble-count")[0].innerHTML = getMessage("marble_count");
    document.getElementsByClassName("sound")[0].innerHTML = getMessage("sound_fx");
    document.getElementById("on").innerHTML= getMessage("button_on");
    document.getElementById("off").innerHTML= getMessage("button_off");
    document.getElementsByClassName("start-button")[0].innerHTML= getMessage("start_button");
    
    document.getElementsByClassName("one-player")[0].style.cursor = "default";
    document.getElementsByClassName("two-player")[0].style.cursor = "default";
    document.getElementsByClassName("marble-count")[0].style.cursor = "default";
    document.getElementsByClassName("sound")[0].style.cursor = "default";
    
    sound_intro = new gamesound("sound-intro");
    sound_click = new gamesound("sound-buttonclick");

    var beadnumber = sessionStorage.getItem("com.intel.otc.mancala.beadnumber");
    if(!beadnumber)
	sessionStorage.setItem("com.intel.otc.mancala.beadnumber", 4);
    setBeadButtons(sessionStorage.getItem("com.intel.otc.mancala.beadnumber"));
    var sound = sessionStorage.getItem("com.intel.otc.mancala.sound");
    if(!sound)
	sessionStorage.setItem("com.intel.otc.mancala.sound", 1);
    setSoundButtons(sessionStorage.getItem("com.intel.otc.mancala.sound"));
    var playercount=sessionStorage.getItem("com.intel.otc.mancala.playercount");
    if(!playercount)
	sessionStorage.setItem("com.intel.otc.mancala.playercount", 1);
    if(sessionStorage.getItem("com.intel.otc.mancala.playercount")==2)
    {
	var toggle=document.getElementById("toggle_left");
	toggle.setAttribute("id", "toggle_right");
	var p1=document.getElementById("one-player_toggleleft");
	p1.setAttribute("id", "one-player_toggleright");
	var p2=document.getElementById("two-player_toggleleft");
	p2.setAttribute("id", "two-player_toggleright");
	var p1icon= document.getElementById("one-player-icon_toggleleft"); 
	p1icon.setAttribute("id", "one-player-icon_toggleright");
	var p2icon= document.getElementById("two-player-icon_toggleleft");
	p2icon.setAttribute("id", "two-player-icon_toggleright");
    }
}

function setBeadButtons(num){
    var button3 = (document.getElementById("three-marbles") ? document.getElementById("three-marbles")  : document.getElementById("three-marbles_active"));
    var button4 = (document.getElementById("four-marbles") ? document.getElementById("four-marbles")  : document.getElementById("four-marbles_active"));
    var button5 = (document.getElementById("five-marbles") ? document.getElementById("five-marbles")  : document.getElementById("five-marbles_active"));
    var button6 = (document.getElementById("six-marbles") ? document.getElementById("six-marbles")  : document.getElementById("six-marbles_active"));
    
    if(num == 3){
	button3.setAttribute("id", "three-marbles_active");
	button4.setAttribute("id", "four-marbles");
	button5.setAttribute("id", "five-marbles");
	button6.setAttribute("id", "six-marbles");
    }
    else if(num == 5)
    {
	button3.setAttribute("id", "three-marbles");
	button4.setAttribute("id", "four-marbles");
	button5.setAttribute("id", "five-marbles_active");
	button6.setAttribute("id", "six-marbles");
    }
    else if(num == 6)
    {
	button3.setAttribute("id", "three-marbles");
	button4.setAttribute("id", "four-marbles");
	button5.setAttribute("id", "five-marbles");
	button6.setAttribute("id", "six-marbles_active");
    }
    else
    {
	button3.setAttribute("id", "three-marbles");
	button4.setAttribute("id", "four-marbles_active");
	button5.setAttribute("id", "five-marbles");
	button6.setAttribute("id", "six-marbles");
    }
}

function setSoundButtons(toggle){
    var on = (document.getElementById("on") ? document.getElementById("on")  : document.getElementById("on_active"));
    var off = (document.getElementById("off") ? document.getElementById("off")  : document.getElementById("off_active"));
    
    if(toggle == 0){
	soundoff = true;
	on.setAttribute("id", "on");
	off.setAttribute("id", "off_active");
    }
    else
    {
	sound_intro.play();
	soundoff = false;
	on.setAttribute("id", "on_active");
	off.setAttribute("id", "off");
    }
}

function toggleNumberOfPlayers(){
    if(!soundoff) sound_click.play();
    
    var toggle=document.getElementById("toggle_left");
    if(toggle)
    {
	toggle.setAttribute("id", "toggle_right");
	var p1=document.getElementById("one-player_toggleleft");
	p1.setAttribute("id", "one-player_toggleright");
	var p2=document.getElementById("two-player_toggleleft");
	p2.setAttribute("id", "two-player_toggleright");
	var p1icon= document.getElementById("one-player-icon_toggleleft"); 
	p1icon.setAttribute("id", "one-player-icon_toggleright");
	var p2icon= document.getElementById("two-player-icon_toggleleft");
	p2icon.setAttribute("id", "two-player-icon_toggleright");
	sessionStorage.removeItem("com.intel.otc.mancala.playercount");
	sessionStorage.setItem("com.intel.otc.mancala.playercount", 2);	
    }
    else
    {
	toggle=document.getElementById("toggle_right");
	toggle.setAttribute("id", "toggle_left");
	var p1=document.getElementById("one-player_toggleright");
	p1.setAttribute("id", "one-player_toggleleft");
	var p2=document.getElementById("two-player_toggleright");
	p2.setAttribute("id", "two-player_toggleleft");
	var p1icon= document.getElementById("one-player-icon_toggleright"); 
	p1icon.setAttribute("id", "one-player-icon_toggleleft");
	var p2icon= document.getElementById("two-player-icon_toggleright");
	p2icon.setAttribute("id", "two-player-icon_toggleleft");
	sessionStorage.removeItem("com.intel.otc.mancala.playercount");
	sessionStorage.setItem("com.intel.otc.mancala.playercount", 1);
    }
}

function startGamePressed(){
    if(!soundoff) sound_click.play();

    document.getElementById("screen").style.display="none";
    initGame();
    document.getElementById("screen-game").style.display="inline";
}

function setMarbleCount(number){
    if(!soundoff) sound_click.play();

    sessionStorage.removeItem("com.intel.otc.mancala.beadnumber");
    sessionStorage.setItem("com.intel.otc.mancala.beadnumber", number);
    setBeadButtons(number);
}

function setSound(value){
    if(!soundoff) sound_click.play();

    sessionStorage.removeItem("com.intel.otc.mancala.sound");
    sessionStorage.setItem("com.intel.otc.mancala.sound", value);
    setSoundButtons(value);
}

var playerOneStore = 6;
var playerTwoStore = 13;
var player=0;
var pits; 
var keepThisPlayer;
var computerTry = 0;

var soundoff;
var sound_fillpit; 
var sound_bonus; 
var sound_button_click; 
var sound_gamewin; 
var sound_pickup; 
var sound_pointscore; 
var sound_singlepiecefullpit; 
var sound_singlepieceemptypit; 
var sound_singlepieceswoosh; 

var location;
location[0] = {x:750, y:35};
location[1] = {x:635, y:35};
location[2] = {x:515, y:35};
location[3] = {x:395, y:35};
location[4] = {x:275, y:35};
location[5] = {x:160, y:35};
location[6] = {x:25, y:35};
location[12] = {x:750, y:410};
location[11] = {x:635, y:410};
location[10] = {x:515, y:410};
location[9] = {x:395, y:410};
location[8] = {x:275, y:410};
location[7] = {x:160, y:410};
location[13] = {x:865, y:30};

WebFontConfig = {
    custom: { families: ['ChunkFive'],
              urls: [ '../css/font.css']},
    active: function() {
    }
};
(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();

//http://greengeckodesign.com/blog/2007/10/how-to-clear-all-timeouts-in-javascript.html
var timers= new Array();
var timerCount;
var gameinit = false;
function initGame(){
    if(!gameinit){
	document.getElementsByClassName("settings-title")[0].innerHTML = getMessage("settings_title");
	document.getElementsByClassName("settings-return_text")[0].innerHTML = getMessage("return_to_game");
	document.getElementsByClassName("settings-sound")[0].innerHTML = getMessage("sound_fx");
	document.getElementById("sound-on").innerHTML = getMessage("button_on");
	document.getElementById("sound-off").innerHTML = getMessage("button_off");
	document.getElementsByClassName("commentary")[0].innerHTML = getMessage("settings_commentary");
	document.getElementById("commentary_on").innerHTML = getMessage("button_on");
	document.getElementById("commentary_off").innerHTML = getMessage("button_off");
	document.getElementsByClassName("help-title")[0].innerHTML = getMessage("help_title");
	document.getElementsByClassName("help-return_text")[0].innerHTML = getMessage("return_to_game");
	document.getElementsByClassName("option-buttons no")[0].innerHTML = getMessage("no_button");
	document.getElementsByClassName("option-buttons yes")[0].innerHTML = getMessage("yes_button");
	document.getElementsByClassName("restart-buttons no")[0].innerHTML = getMessage("no_button");
	document.getElementsByClassName("restart-buttons yes")[0].innerHTML = getMessage("yes_button");
	document.getElementById("player1-score_text").innerHTML = getMessage("player_1_score")+" 0";
	document.getElementsByClassName("endgame-start-new")[0].innerHTML = getMessage("new_game");
	document.getElementsByClassName("restart-start-new")[0].innerHTML = getMessage("new_game");
	
	document.getElementsByClassName("settings-border-x")[0].style.cursor = "pointer";
	document.getElementsByClassName("help-border-x")[0].style.cursor = "pointer";
	document.getElementsByClassName("settings-title")[0].style.cursor = "default";
	document.getElementsByClassName("settings-return_text")[0].style.cursor = "default";
	document.getElementsByClassName("settings-sound")[0].style.cursor = "default";
	document.getElementsByClassName("commentary")[0].style.cursor = "default";
	document.getElementsByClassName("help-title")[0].style.cursor = "default";
	document.getElementsByClassName("help-return_text")[0].style.cursor = "default";
	document.getElementById("player1-score_text").style.cursor = "default";
	document.getElementsByClassName("endgame-start-new")[0].style.cursor = "default";
	document.getElementById("player1-score_text").style.cursor = "default";
	document.getElementById("player2-score_text").style.cursor = "default";
	document.getElementById("endgame-wintext").style.cursor = "default";
	document.getElementsByClassName("restart-start-new")[0].style.cursor = "default";
	document.getElementById("pit0_count").style.cursor = "default";
	document.getElementById("pit1_count").style.cursor = "default";
	document.getElementById("pit2_count").style.cursor = "default";
	document.getElementById("pit3_count").style.cursor = "default";
	document.getElementById("pit4_count").style.cursor = "default";
	document.getElementById("pit5_count").style.cursor = "default";
	document.getElementById("pit7_count").style.cursor = "default";
	document.getElementById("pit8_count").style.cursor = "default";
	document.getElementById("pit9_count").style.cursor = "default";
	document.getElementById("pit10_count").style.cursor = "default";
	document.getElementById("pit11_count").style.cursor = "default";
	document.getElementById("pit12_count").style.cursor = "default";
	document.getElementById("instructions").style.cursor = "default";

	sound_fillpit = new gamesound("sound-fillpit");
	sound_bonus = new gamesound('sound-bonus');
	sound_button_click = new gamesound('sound-buttonclick');
	sound_gamewin = new gamesound('sound-gamewin');
	sound_pickup = new gamesound('sound-pickup');
	sound_pointscore = new gamesound('sound-pointscore');
	sound_singlepiecefullpit = new gamesound('sound-singlepiecefullpit');
	sound_singlepieceemptypit = new gamesound('sound-singlepieceemptypit');
	sound_singlepieceswoosh = new gamesound('sound-singlepieceswoosh');
	gameinit = true;
    }
    resetBoard();
}

function settingsClicked(){
    if(!soundoff) sound_button_click.play();
    var dialog = document.getElementById("settings-dialog").style.opacity= 1;
    document.getElementById("settings-dialog").style.display="inline";
    document.getElementById("smoke-screen").style.display="inline";
}

function helpClicked(){
    if(!soundoff) sound_button_click.play();
    var dialog = document.getElementById("help-dialog").style.opacity= 1;
    document.getElementById("help-dialog").style.display="inline";
    document.getElementById("smoke-screen").style.display="inline";
}

function player1TabClicked(){
    if(!soundoff) sound_button_click.play();
}

function player2TabClicked(){
    if(!soundoff) sound_button_click.play();
}

function setSoundGame(value)
{
    sessionStorage.removeItem("com.intel.otc.mancala.sound");
    sessionStorage.setItem("com.intel.otc.mancala.sound", value);
    soundoff = (value == 0 ? true : false );
    if(!soundoff) sound_button_click.play();
    setSoundButtonsGame(value);
}

function getSound()
{
    var value = sessionStorage.getItem("com.intel.otc.mancala.sound");
    setSoundButtonsGame(value);
}

function setSoundButtonsGame(toggle){
    var on = (document.getElementById("sound-on") ? document.getElementById("sound-on")  : document.getElementById("sound-on_active"));
    var off = (document.getElementById("sound-off") ? document.getElementById("sound-off")  : document.getElementById("sound-off_active"));
    
    if(toggle == 0){
	on.setAttribute("id", "sound-on");
	off.setAttribute("id", "sound-off_active");
    }
    else
    {
	on.setAttribute("id", "sound-on_active");
	off.setAttribute("id", "sound-off");
    }
}

function setCommentaryButtons(toggle){
    var on = (document.getElementById("commentary_on") ? document.getElementById("commentary_on")  : document.getElementById("commentary_on_active"));
    var off = (document.getElementById("commentary_off") ? document.getElementById("commentary_off")  : document.getElementById("commentary_off_active"));
    
    if(toggle == 0){
	on.setAttribute("id", "commentary_on");
	off.setAttribute("id", "commentary_off_active");
	document.getElementById("logo").style.zIndex=3;
	document.getElementById("logo_blank").style.zIndex=1;
    }
    else
    {
	on.setAttribute("id", "commentary_on_active");
	off.setAttribute("id", "commentary_off");
	document.getElementById("logo").style.zIndex=1;
	document.getElementById("logo_blank").style.zIndex=2;
    }
}

function setCommentary(value)
{
    if(!soundoff) sound_button_click.play();
    sessionStorage.removeItem("com.intel.otc.mancala.commentary");
    sessionStorage.setItem("com.intel.otc.mancala.commentary", value);
    setCommentaryButtons(value);	
}

function getCommentary()
{
    var commentary = sessionStorage.getItem("com.intel.otc.mancala.commentary");
    setCommentaryButtons(commentary);
}

function drawText(pit, beadnumber)
{
    switch(pit)
    {
    case 0:
	document.getElementById("pit0_count").innerText=beadnumber;
	document.getElementById("pit0_count").style.opacity = 1;
	break;
    case 1:
	document.getElementById("pit1_count").innerText=beadnumber;
	document.getElementById("pit1_count").style.opacity = 1;
	break;
    case 2:
	document.getElementById("pit2_count").innerText=beadnumber;
	document.getElementById("pit2_count").style.opacity = 1;
	break;
    case 3:
	document.getElementById("pit3_count").innerText=beadnumber;
	document.getElementById("pit3_count").style.opacity = 1;
	break;
    case 4:
	document.getElementById("pit4_count").innerText=beadnumber;
	document.getElementById("pit4_count").style.opacity = 1;
	break;
    case 5:
	document.getElementById("pit5_count").innerText=beadnumber;
	document.getElementById("pit5_count").style.opacity = 1;
	break;
    case 6:
	document.getElementById("player1-score_text").innerHTML = getMessage("player_1_score")+" "+beadnumber;
	break;
    case 12:
	document.getElementById("pit7_count").innerText=beadnumber;
	document.getElementById("pit7_count").style.opacity = 1;
	break;
    case 11:
	document.getElementById("pit8_count").innerText=beadnumber;
	document.getElementById("pit8_count").style.opacity = 1;
	break;
    case 10:
	document.getElementById("pit9_count").innerText=beadnumber;
	document.getElementById("pit9_count").style.opacity = 1;
	break;
    case 9:
	document.getElementById("pit10_count").innerText=beadnumber;
	document.getElementById("pit10_count").style.opacity = 1;
	break;
    case 8:
	document.getElementById("pit11_count").innerText=beadnumber;
	document.getElementById("pit11_count").style.opacity = 1;
	break;
    case 7:
	document.getElementById("pit12_count").innerText=beadnumber;
	document.getElementById("pit12_count").style.opacity = 1;
	break;
    case 13:
	document.getElementById("player2-score_text").innerHTML = getMessage("player_2_score")+" "+beadnumber;
	break;
    }
} 

function drawBeads(pit, beads)
{
    var count = beads;
    var size = 34;
    for(var row=1; row<=3; row++)
    {
	for(var col=1; col<=2; col++ )
	{
	    if(count != 0)
	    {
		var phi = (Math.random()*2*3.14);
		var rho = Math.random();
		var x = Math.sqrt(rho)*Math.cos(phi)*15/2;
		var y = Math.sqrt(rho)*Math.sin(phi)*25/2;
		var beadImg = document.createElement("img");
 		beadImg.setAttribute('src', 'images/MANCALA-game_marble.png');
 		beadImg.setAttribute('alt', 'bead');
 		beadImg.setAttribute('height', 34);
 		beadImg.setAttribute('width', 34);
 		beadImg.setAttribute('class', ('beads beadsInPit'+pit));
		beadImg.style.left = ((location[pit].x+x+col*30)+"px");
		beadImg.style.top = ((location[pit].y+y+row*30)+"px");
		var container = document.getElementById("center");
		container.appendChild(beadImg);
		count--;
	    }
	}
    }
}

function clearBoard(){
    //clear beads
    var center = document.getElementById('center');
    var beads = document.getElementsByClassName('beads');
    while(beads.length > 0)
    {
	center.removeChild(beads[0]); 
	beads = document.getElementsByClassName('beads');
    }
    
    var beadNumber = parseInt(getBeadNumber());
    //clear text
    for(var holes = 0; holes < 14; holes++)
    {
		if(holes == 6)
		{	 
		    document.getElementById("player1-score_text").innerHTML = getMessage("player_1_score")+" 0";
		}
		else if(holes == 13)
		{
		    document.getElementById("player2-score_text").innerHTML = getMessage("player_2_score")+" 0";
		}
		else{
		    document.getElementById("pit"+holes+"_count").innerText= beadNumber;
		}
    }
}

function moveBead(fromPit, toPit){
    timerCount--;
    var beadsAtSelection = document.getElementsByClassName("beadsInPit"+fromPit);
    if(!beadsAtSelection)return;
    if((toPit == playerTwoStore) || (toPit == playerOneStore))
    {
		if(!soundoff) window.setTimeout('sound_pointscore.play()', 1000);
    }
    else if(pits[toPit] > 1)
    {
		if(!soundoff) window.setTimeout('sound_singlepiecefullpit.play()', 1000); //full pit
    }
    else
    {
		if(!soundoff) window.setTimeout('sound_singlepieceemptypit.play()', 1000); //single bead
    } 
    var beadImg = beadsAtSelection[0];
    beadImg.setAttribute('class', ('beads beadsInPit'+toPit));
    var phi = (Math.random()*2*3.14);
    var rho = Math.random();
    var x = Math.sqrt(rho)*Math.cos(phi)*20/2;
    var y = Math.sqrt(rho)*Math.sin(phi)*30/2;
    var col = Math.random()+1;
    var row;
    if(toPit == 6 || toPit == 13)
    	row = (Math.random()*12)+1;
    else
   		row = (Math.random()*2)+1;
    var xfinal = (location[toPit].x+x+col*34);
    var yfinal = (location[toPit].y+y+row*34);
    var xdiff = xfinal-beadImg.offsetLeft;
    var ydiff = yfinal-beadImg.offsetTop;
    beadImg.style.webkitTransform = 'translate('+xdiff+'px,'+ydiff+'px)';
    //http://www.the-art-of-web.com/css/css-animation/
    pits[fromPit]--;
    pits[toPit]++;
    window.setTimeout('drawText('+fromPit+', '+pits[fromPit]+')', 1000);
    window.setTimeout('drawText('+toPit+', '+pits[toPit]+')', 1000);
}

function drawPit(pitnumber, beadnumber)
{
    drawBeads(pitnumber, beadnumber);
    drawText(pitnumber, beadnumber);
}

function initBoard(){
    soundoff = (sessionStorage.getItem("com.intel.otc.mancala.sound") == 0 ? true : false);
    if(!soundoff) sound_fillpit.play();
    for(hole in pits)
    {
	drawPit(hole, pits[hole]);
    }
}

function isGameEnd()
{
    var isEmpty = true;
    var winner = -1;
    
    for(var cnt = 0; cnt < playerOneStore; cnt++)
    {
 	if(pits[cnt] > 0)
 	{
 	    isEmpty = false;
 	    break;
 	}
    }
    
    if(isEmpty)
    {
	var finalsteal = 0;
	for(var cnt = 7; cnt < playerTwoStore; cnt++)
	{
	    if(pits[cnt] > 0)
	    {
		finalsteal+=pits[cnt];
		while(pits[cnt] > 0)
		{
		    moveBead(cnt, playerTwoStore);
		}
		if(!soundoff) sound_bonus.play();
		drawText(cnt, 0);
	    }
	}
	
	pits[playerTwoStore]+= finalsteal;
	drawText(playerTwoStore, pits[playerTwoStore]);

	
	if(pits[playerOneStore] > pits[playerTwoStore])
	{
	    winner = 0;
	}
	else if(pits[playerOneStore] < pits[playerTwoStore])
	{
	    winner = 1;
	}
	else if(pits[playerOneStore] === pits[playerTwoStore])
	{
	    winner = 2;
	}
    }
    
    isEmpty = true;
    for(var cnt = (playerOneStore+1); cnt < playerTwoStore; cnt++)
    {
	if(pits[cnt] != 0)
	{
	    isEmpty = false;
	    break;
	}
    }
    
    if(isEmpty)
    {
	var finalsteal = 0;
	for(var cnt = 0; cnt < playerOneStore; cnt++)
	{
	    if(pits[cnt] > 0)
	    {
			finalsteal+=pits[cnt];
			while(pits[cnt] > 0)
			{
			    moveBead(cnt, 6);
			    if(!soundoff) sound_bonus.play();
			}
			drawText(cnt, 0);
	    }
	}
	
	pits[playerOneStore]+= finalsteal;
	drawText(playerOneStore, pits[playerOneStore]);

	if(pits[playerOneStore] > pits[playerTwoStore])
	{
	    winner = 0;
	}
	else if(pits[playerOneStore] < pits[playerTwoStore])
	{
	    winner = 1;
	}
	else if(pits[playerOneStore] === pits[playerTwoStore])
	{
	   winner = 2;
	}
    }
    
    return winner;
}

function isFreeTurn(num, stones)
{
    if(num == playerOneStore || num == playerTwoStore)
    {
	return false;
    }
    
    var mod = stones%13;
    var difference = 0;
    
    if(((player == 0) && (num < playerOneStore)) || (player == 1) && (num > 6 && num < playerTwoStore))
    {
	difference= ((6+7*player)-num);
	if(mod == difference)
	{
	    return true;
	}
    }
    
    return false;	
}

function isValidSteal(playerPit)
{
    if(((player == 0) && (playerPit < playerOneStore)) || ((player == 1) && (playerPit > playerOneStore && playerPit < playerTwoStore)))
    {
	var otherside = 12-playerPit;
	if((pits[otherside] > 0) && (pits[playerPit] == 1))
	{
	    return true;
	}
    }
    return false;
}

function stealStones(end)
{
    var otherside = 12-end;
    for(var x =0; x < pits[otherside]; x++){
	if(player == 0)
	{
	    var object = window.setTimeout('moveBead('+otherside+', '+playerOneStore+')', timerCount*400); 
	    timers[timerCount++]= object;
	}
	else
	{
	    var object = window.setTimeout('moveBead('+otherside+', '+playerTwoStore+')', timerCount*400); 
	    timers[timerCount++]= object;
	}
    }
    
    if(player == 0)
    {
	var object = window.setTimeout('moveBead('+end+', '+playerOneStore+')', timerCount*400); 
	timers[timerCount++]= object;
    }
    else
    {
	var object = window.setTimeout('moveBead('+end+', '+playerTwoStore+')', timerCount*400); 
	timers[timerCount++]= object;
    }
    
    var turndelay = pits[otherside]+1;
    
    if(!soundoff) sound_bonus.play();
    document.getElementById("instructions").innerHTML= getMessage("player_steal");
    
    window.setTimeout('changeTurns()', turndelay*500);
}

function checkStealState(end)
{
    var steal = 0;
    if(((player == 0) && (end < playerOneStore)) || (player == 1) && (end > playerOneStore && end < playerTwoStore))
    {
	if(isValidSteal(end))
	{
	    stealStones(end);
	    return;
	}
    }
    changeTurns();
}

function getBeadNumber()
{
    var beads = sessionStorage.getItem("com.intel.otc.mancala.beadnumber");

    if((beads != null) && (beads > 0 && beads < 10))
    {
	return beads;
    }
    sessionStorage.setItem("com.intel.otc.mancala.beadnumber", 6);
    return 6;
}

var inPlay = false;
function pitSelected(num, isHuman)
{
	if(inPlay && isHuman){
		return;
	}
	else if(isHuman && !inPlay){
		inPlay = true;
	}

		
		
	if(isHuman && (player==1) && (sessionStorage.getItem("com.intel.otc.mancala.playercount")==1))
	{
		return;
	}
    if(!soundoff) sound_button_click.play();   
	
	var start = num+1;
	var stones=pits[num];
	var origStones =pits[num];	
	var pitMoveFrom = num;
	
	if(stones == 0)
	{
		if((player==1) && (sessionStorage.getItem("com.intel.otc.mancala.playercount")==1)){
	   	    pitSelected(computerTry++, false);
		}
		else
		{
			document.getElementById("instructions").innerHTML= getMessage("empty_pit");
			inPlay = false;
		}
		return;
	}
	
	keepThisPlayer = isFreeTurn(num, stones);
	
	if((player == 0 && num >= playerOneStore) || (player == 1 && (num <= playerOneStore || num == playerTwoStore)))
	{
	    document.getElementById("instructions").innerHTML= getMessage("player_wrong_pit");
	    setHighlight();
	    inPlay = false;
	}
	else{
	    document.getElementById("instructions").innerHTML= getMessage("player_good_choice");
	    document.getElementById("pit5").style.opacity=0;
	    document.getElementById("pit4").style.opacity=0;
	    document.getElementById("pit3").style.opacity=0;
	    document.getElementById("pit2").style.opacity=0;
	    document.getElementById("pit1").style.opacity=0;
	    document.getElementById("pit0").style.opacity=0;
	    
	    document.getElementById("pit12").style.opacity=0;
	    document.getElementById("pit11").style.opacity=0;
	    document.getElementById("pit10").style.opacity=0;
	    document.getElementById("pit9").style.opacity=0;
	    document.getElementById("pit8").style.opacity=0;
	    document.getElementById("pit7").style.opacity=0;
	    if(!soundoff) sound_pickup.play();
	    for(stones; stones > 0; stones--)
	    {
 		if((player == 0) && (start == playerTwoStore)) 
 		{     
		 	start = 0;
 	    }
 	    else if ((player == 1) && (start == playerOneStore))
 	    {
 	    	start = 7;
 	    }

	 	    var object = window.setTimeout('moveBead('+pitMoveFrom+', '+start+')', timerCount*400); 
	 	    timers[timerCount++]= object;
 		
 		if(stones === 1)
 		{
 		    //check if steal state if on last stone before moving to next pit in loop
 		    window.setTimeout('checkStealState('+start+')', origStones*500);
 		}
 		
 		start++;
	 	if(start == 14)
	 	{
	 	    start = 0;
	 	}
 	    }	    
	}
}

function changeTurns(){
    var winner = isGameEnd();
    if(winner == 0 || winner == 1)
    {
	if(!soundoff) sound_gamewin.play();
	document.getElementById("instructions").innerHTML=getMessage("game_over");
	document.getElementById("endgame-wintext").innerHTML = (winner==0 ? getMessage("player_1_win") : getMessage("player_2_win"));
	document.getElementById("endgame-dialog").style.display="inline";
	document.getElementById("smoke-screen").style.display="inline";
	inPlay = false;
		return;
    }
    else if(winner == 2)
    {
	if(!soundoff) sound_gamewin.play();
	document.getElementById("endgame-wintext").innerHTML = getMessage("player_tie_win");
	document.getElementById("instructions").innerHTML=getMessage("game_over");
	document.getElementById("endgame-dialog").style.display="inline";
	document.getElementById("smoke-screen").style.display="inline";
	inPlay = false;
		return;
    }
    else
    {
	if(keepThisPlayer)
	{
	    document.getElementById("instructions").innerHTML=getMessage("second_turn");
	    setHighlight();
	    inPlay = false;
	}
	else
	{
	    if(player == 1)
	    {
		player=0;
		document.getElementById("turn-arrow_p1").style.opacity=1;
	   	document.getElementById("turn-arrow_p2").style.opacity=0;
		document.getElementById("instructions").innerHTML= getMessage("player_1_prompt");
	    }
	    else
	    {
		player=1;	
		document.getElementById("turn-arrow_p1").style.opacity=0;
   		document.getElementById("turn-arrow_p2").style.opacity=1;   
		document.getElementById("instructions").innerHTML=getMessage("player_2_prompt");
	    }
	    inPlay = false;
	    setHighlight();
	}
	if((player==1) && (sessionStorage.getItem("com.intel.otc.mancala.playercount")==1)){
   	    var computerChoice = Math.floor(Math.random()*5+7);
   	    computerTry = 7;
   	    setTimeout('pitSelected('+computerChoice+', false)', 500);
	}
    }
}

function restartClicked(){
     	document.getElementById("restart-dialog").style.display="inline";
     	document.getElementById("smoke-screen").style.display="inline";
}

function setRestart(value){
    if(!soundoff) sound_button_click.play();
    if(value === 0)
    {
 	document.getElementById("restart-dialog").style.display="none";
	document.getElementById("smoke-screen").style.display="none";
    }
    else if(value === 1)
    {
    	document.getElementById("restart-dialog").style.display="none";
    	document.getElementById("smoke-screen").style.display="none";
	resetBoard();
    }
}

function resetBoard()
{
    clearBoard();
    for(key in timers){  
	clearTimeout(timers[key]);  
    }  
    timers = [];
    timerCount = 0;
    var beadNumber = parseInt(getBeadNumber());
    getCommentary();
    getSound();
    pits = [beadNumber,beadNumber,beadNumber,beadNumber,beadNumber,beadNumber,0,beadNumber,beadNumber,beadNumber,beadNumber,beadNumber,beadNumber,0];
    player = 0;
    setHighlight();
    document.getElementById("turn-arrow_p1").style.opacity=1;
    document.getElementById("turn-arrow_p2").style.opacity=0;
    document.getElementById("instructions").innerHTML=getMessage("player_1_prompt");
    initBoard();
}

function setHighlight(){
    if(player == 0)
    {
	document.getElementById("pit5").style.opacity=1;
	document.getElementById("pit4").style.opacity=1;
	document.getElementById("pit3").style.opacity=1;
	document.getElementById("pit2").style.opacity=1;
	document.getElementById("pit1").style.opacity=1;
	document.getElementById("pit0").style.opacity=1;
	
	document.getElementById("pit12").style.opacity=0;
	document.getElementById("pit11").style.opacity=0;
	document.getElementById("pit10").style.opacity=0;
	document.getElementById("pit9").style.opacity=0;
	document.getElementById("pit8").style.opacity=0;
	document.getElementById("pit7").style.opacity=0;
	
	document.getElementById("pit5").style.cursor="pointer";
	document.getElementById("pit4").style.cursor="pointer";
	document.getElementById("pit3").style.cursor="pointer";
	document.getElementById("pit2").style.cursor="pointer";
	document.getElementById("pit1").style.cursor="pointer";
	document.getElementById("pit0").style.cursor="pointer";
	
	document.getElementById("pit12").style.cursor="default";
	document.getElementById("pit11").style.cursor="default";
	document.getElementById("pit10").style.cursor="default";
	document.getElementById("pit9").style.cursor="default";
	document.getElementById("pit8").style.cursor="default";
	document.getElementById("pit7").style.cursor="default";
    }
    else
    {
	document.getElementById("pit5").style.opacity=0;
	document.getElementById("pit4").style.opacity=0;
	document.getElementById("pit3").style.opacity=0;
	document.getElementById("pit2").style.opacity=0;
	document.getElementById("pit1").style.opacity=0;
	document.getElementById("pit0").style.opacity=0;
	document.getElementById("pit12").style.opacity=1;
	document.getElementById("pit11").style.opacity=1;
	document.getElementById("pit10").style.opacity=1;
	document.getElementById("pit9").style.opacity=1;
	document.getElementById("pit8").style.opacity=1;
	document.getElementById("pit7").style.opacity=1; 
	
	document.getElementById("pit5").style.cursor="default";
	document.getElementById("pit4").style.cursor="default";
	document.getElementById("pit3").style.cursor="default";
	document.getElementById("pit2").style.cursor="default";
	document.getElementById("pit1").style.cursor="default";
	document.getElementById("pit0").style.cursor="default";
	
	document.getElementById("pit12").style.cursor="pointer";
	document.getElementById("pit11").style.cursor="pointer";
	document.getElementById("pit10").style.cursor="pointer";
	document.getElementById("pit9").style.cursor="pointer";
	document.getElementById("pit8").style.cursor="pointer";
	document.getElementById("pit7").style.cursor="pointer";
    }
}

function setOption(value)
{   
    if(!soundoff) sound_button_click.play();
    if(value === 0)
    {
 	document.getElementById("endgame-dialog").style.display="none";
	document.getElementById("screen-game").style.display="none";
	document.getElementById("smoke-screen").style.display="none";
        document.getElementById("screen").style.display="inline";
    }
    else(value === 1)
    {
    	document.getElementById("endgame-dialog").style.display="none";
    	document.getElementById("smoke-screen").style.display="none";
	resetBoard();
    }
}

function closeSettings()
{
	if(!soundoff) sound_button_click.play();
    var dialog = document.getElementById("settings-dialog").style.opacity=0;
    document.getElementById("settings-dialog").style.display="none";
    document.getElementById("smoke-screen").style.display="none";
}

function closeHelp()
{
	if(!soundoff) sound_button_click.play();
    var dialog = document.getElementById("help-dialog").style.opacity= 0;
    document.getElementById("help-dialog").style.display="none";
    document.getElementById("smoke-screen").style.display="none";
} 

