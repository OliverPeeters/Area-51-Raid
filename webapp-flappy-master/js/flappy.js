// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var text = "";
var label;
var startTime;
var score = 0;
var isHidden = true;
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var enter =0;
var gameGravity = 100;
var pipeInterval = 1.75;
var pipeGap = 100;
var player;
var block;
var pipes = [];
var playerSize = 100;
var marginb = 0;
var margint = 50 ;
var height = 400;
var gapSize = 100;
var blockHeight = 65;
var width = 790;




// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)

// let preload1 = () =>{
//   const blocks = document.querySelectorAll(".preloader .blocks .block1");
//   let interval = 0;
//   blocks.forEach((block1, i) => {
//    setTimeout(() => {
//      animate(block1, i);
//    }, interval);
//    interval += 500;
//  });
//  function animate(block1, index) {
//    let position = index
//   }
//  }
//  preload();
function preload() {
  game.load.spritesheet("playerImg", "../assets/Naruto Sprite Sheet.png", 64, 56, 6);
  game.load.audio("score", "../assets/point.ogg");
  game.load.audio("siren", "../assets/Siren.mp3");
  game.load.spritesheet("electricFence", "../assets/Sprite Sheet Fence (2).png", 128, 50, 3);
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
    .onDown.add(playerJump);
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
  var walk = player.animations.add('walk');
  player.animations.play('walk', 10, true);

  //game.input
//  .keyboard.addkey(Phaser.Keyboard.ENTER)
//  .onDown.add(enterPress)
var pipeInterval = 1.75 * Phaser.Timer.SECOND;
game.time.events.loop(pipeInterval, generatePipe);

  //game.add.sprite(event.x, event.y, "playerImg")
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump);


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
  if (player.body.y<0-playerSize){
    gameOver();
  }
  if (player.body.y >= 345) {
    player.body.gravity.y = 0;
    //    player.anchor.setTo(0.5, 0);
    player.body.y = 344;
  }
  else {
    player.body.gravity.y = 400;
    player.anchor.setTo(0.5, 0.5);
  }
  game.physics.arcade.overlap(player, pipes, gameOver);
};

function playerJump(){
  player.body.velocity.y = -180;
  game.sound.play("score");
}

function clickHandler(event) {
  game.sound.play("siren");
};

function generatePipe() {
  var gapStart = game.rnd.integerInRange(margint, height -  gapSize  - margint)
  var gapEnd = game.rnd.integerInRange(marginb, height -  gapSize  - marginb)
      for(var y = gapStart - 75; y > -50; y -= blockHeight) {
        addPipeBlock(width, y);
      }
      for(var y = gapStart + gapSize + 25; y < height; y += 50) {
        addPipeBlock(width, y);
 }
}

function addPipeBlock(x, y){
  var fix = game.add.sprite(x, 0, "electricFence")
  var block = game.add.sprite(x, y, "electricFence");
  var run = block.animations.add('run');
  block.animations.play('run', 10, true);
  pipes.push(block);
  game.physics.arcade.enable(block);
  block.body.velocity.x = -200;

}



/*function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 4);
  for (var count = 0; count < 8; count = count + 1){
    if(count != gapStart && count!= gapStart + 1 && count != gapStart + 2){
      addPipeBlock(750, count * 50);
    }
  }
}*/

function gameOver () {
  score = 0;
  game.state.restart();
}
/*while (enter = 0) {


}




while (enter == 1 || enter > 1) {



} */
