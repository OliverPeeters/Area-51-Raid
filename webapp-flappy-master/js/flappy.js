// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var text = "";
var label;
var startTime;
var score = 0;
var isHidden = true;
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var enter =0;
var gameGravity = + 200;
var pipeInterval = 1.75;
var pipeGap = 100;
var player;
var jump = 250;
// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)


/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg", "../assets/Naruto runner.gif");
  game.load.audio("score", "../assets/point.ogg");
  game.load.audio("siren", "../assets/Siren.mp3");
}

function create() {
  game.stage.setBackgroundColor("#ecdc77");
  /*game.add.text(225, 150, "Area 51 simulator: \nOur plan of attack!",
   {font: "40px Comic Sans"});
  game.add.text(650, 360, "TM:Code.io",
  {font: "20px Arial"});
  game.add.sprite(20, 20, "playerImg")
  game.add.sprite(20, 270, "playerImg")
  game.add.sprite(650, 20, "playerImg")
  game.add.sprite(650, 270, "playerImg");*/
  label = game.add.text(225, 70, text, { font: "30px arial"});
  game.input.onDown.add(clickHandler);
  game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);
  var interval = Phaser.Timer.SECOND * 1;
  game.time.events.loop(interval, updateLabel);
  game.add.text(20, 10, "score: ",  {font: "20px Comic Sans"});
  labelScore = game.add.text(70, 11, "0", {font: "20px Comic Sans"});
  player = game.add.sprite(50, 150, "playerImg");
  player.anchor.setTo(0.5, 0.5);
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.enable(player);
  player.body.gravity.y= 400;
  generatePipe();
  //game.input
//  .keyboard.addkey(Phaser.Keyboard.ENTER)
//  .onDown.add(enterPress)
var pipeInterval = 1.75 * Phaser.Timer.SECOND;
game.time.events.loop(pipeInterval, generatePipe);

  //game.add.sprite(event.x, event.y, "playerImg")
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);


}
function playerJump(){
  player.body.velocity.y = -jump;
}

function spaceHandler() {
  game.sound.play("score");
}
function updateLabel() {
  if (isHidden) {
    changeScore();
  }
}
function enterPress() {
  enter ++;
}

function changeScore() {
  score++;
  labelScore.setText(score.toString());
};

function spaceHandler() {
 game.sound.play("score");
};


/*function updateLabel() {
  if (isHidden) {
    label.setText("*Alarm* September 20th:\n    time to raid! *Alarm* \n \n \n \n \n Press \"enter\" to Start");
    isHidden = false;
  }
  else {
    label.setText("");
    isHidden = true;

  }
}*/

function update () {

};

function clickHandler(event) {
  game.sound.play("siren");

};





















function addPipeBlock(x, y){
  var block = game.add.sprite(x,y, "pipeBlock")
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;}





  function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 5);
  for (var count = 0; count < 8; count = count + 1){
  if(count != gapStart && count!= gapStart + 1){
    addPipeBlock(750, count * 50);
  }
}
/*while (enter = 0) {


}




while (enter == 1 || enter > 1) {



} */
