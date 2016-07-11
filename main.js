$(document).ready();

var bgm = new Audio;
bgm.src = "./sounds/bgm/Battle.mp3";
bgm.play();

// Title screen

$('#start').on('click', function (){

  $('#wrapper').append('<center><h2>select difficulty</h2>' 
    + '<button id="easyMode">easy</button>' 
    + '<button id="normalMode">normal</button>' 
    + '<button id="hardMode">hard</button></center>');

    $('#start').remove();

    $('#easyMode').on('click', function(){
      console.log("Easy mode selected!");
    });

    $('#normalMode').on('click', function(){
      console.log("Normal mode selected!");
    });

    $('#hardMode').on('click', function(){
      console.log("Hard mode selected!");
    });

    $('#wrapper').append('<button id="returnToStart">START MENU</button>');

  $('#returnToStart').on('click', function(){
    $('#easyMode').remove();
    $('#normalMode').remove();
    $('#hardMode').remove();


    $('#wrapper').append('<button id="start">START</button>');

  })
});



// ===== BASIC DAMAGE CALCULATION =====

//   STR is the variable for base PHYSICAL damage calcs

//   ATK is the variable for PHYS damage calc modification

//   MAG is the variable for MAGICAL damage/healing calcs

//   DEF is the variable for resistance to attacks

//   HP is the variable for the health bar

//   MP is the variable for the MP/mana bar


// The party members constructor object

function PartyMember(name, atk, str, def, mag, hp, defaultHp, mp, KO) {
  this.name = name;
  this.atk = atk;
  this.str = str,
  this.def = def;
  this.mag = mag;
  this.hp = hp;
  this.defaultHp = defaultHp;
  this.mp = mp;
  this.KO = false;
};

var partyMemberArray = [];

var current_character;
// the stats for the party members

var fighter = new PartyMember("FIGHTER", 55, 75, 25, 0, 2000, 2000, 0, false);
var blackMage = new PartyMember("BLACK MAGE", 55, 35, 10, 75, 1000, 1000, 500, false);
var whiteMage = new PartyMember("WHITE MAGE", 55, 35, 10, 75, 1000, 1000, 500, false);
var titan = new PartyMember("TITAN", 75, 100, 95, 75, 5000, 5000, 1000, false);

partyMemberArray.push(fighter);
partyMemberArray.push(whiteMage);
partyMemberArray.push(blackMage);
partyMemberArray.push(titan);

var turn = partyMemberArray;
var token = 0, state;

readToken(token); 
// Lose conditions

// Menu stats, etc.

// Menu stats, etc.

function healthBarsUpdate() {
$('#fighterStats').html("FIGHTER: <span>" + fighter.hp + "/" + fighter.defaultHp + "</span><br>"
  + "WHITE MAGE: <span>" + whiteMage.hp + "/" + whiteMage.defaultHp + "</span><br>"
  + "BLACK MAGE: <span>" + blackMage.hp + "/" + blackMage.defaultHp + "</span><br>"
  )
$('#foeSelect').html("Titan: <span>" + titan.hp + "/" + titan.defaultHp + "</span><br>")
};

$('#damageAnnouncer').html("Fight!");

healthBarsUpdate();

var titanMoves = [0, 0, 1, 0, 0];


// The turn order =========

// var turn = partyMemberArray;
// var token = 0, state;

function readToken(token) { 
  console.log("readToken triggered!"); 
  console.log(token);
  state = turn[token];
  nextAction(state);
};


function readNextToken() {
  token++;
  if (token === partyMemberArray.length) {
    console.log('end of turn');
    token = 0;
  }
  readToken(token);
};


function nextAction(val){
  switch (val) {

  case fighter:

    current_character = fighter;

    ko_check();

    // $('#turnAnnouncer').html("It's FIGHTER'S turn!");

    turnOptions(fighter);

    // $('#attackButton').on('click', function(){
    //   // unbind "click" handler
    //   $('#attackButton').off('click');
    //   // readNextToken();
    // });

  break;


  case whiteMage:

    current_character = whiteMage;

    ko_check();

    // $('#turnAnnouncer').html("It's WHITE MAGE'S turn!");

    turnOptions(whiteMage); // add eventListener

  break;


  case blackMage:

    current_character = blackMage;

    ko_check();
    // $('#turnAnnouncer').html("It's BLACK MAGE'S turn!");

    turnOptions(blackMage);

    break;

  case titan:

  current_character = titan;

  ko_check();
  // $('#turnAnnouncer').html("The enemy is going to attack!");

  setTimeout(function(){
    foeMoveRandom();
  }, 3000);

  setTimeout(function(){
    readNextToken();
  }, 4000);



  break;

  default: 
  console.log("Turn ended.");
 
  break;
  };
  }


  // Check if current_character KO. If so, skip turn.

  function ko_check() {
    if (current_character.KO === true) {
      readNextToken();
    } else if (current_character === fighter) {
      $('#turnAnnouncer').html("It's FIGHTER'S turn!");
    } else if (current_character === whiteMage) {
      $('#turnAnnouncer').html("It's WHITE MAGE'S turn!");
    } else if (current_character === blackMage) {
      $('#turnAnnouncer').html("It's BLACK MAGE'S turn!");
    } else if (current_character === titan) {
      $('#turnAnnouncer').html("The enemy is going to attack!");
    }
  }



// === Function for the menu options.

  function turnOptions(character) {

    if (character === whiteMage) {

      $('#cureBtn').on('click', function(){
        targetSelect();
        $(this).off("click");
      });
     }

    // will need a function for the using of items.
    else if (character === fighter || character === whiteMage || character === blackMage) {
      $('#attackButton').on('click', function(){
        attackCalc(character);
        $(this).off("click");
      });
    }

    // Magic menus


    else if (character === blackMage) {

      $('#fireBtn').on('click', function(){
        castFire(titan);
        $(this).off("click");
        // $('#attackButton').off('click');
      });
    };
};



function targetSelect() {
  $('#damageAnnouncer').html("Select a party member to cure!");

    $('.PC').off('click').on('click', function(){
      if (this.id === "playerCharacter1") {
      castCure(fighter);
    } else if (this.id === "playerCharacter2") {
      castCure(whiteMage);
    } else {
      castCure(blackMage);
    }

    // $('body').after('<img src="./images/sprites/Heal.gif" height="400px" id="HealGif" />');

    // setTimeout(function(){
    //   $('#HealGif').remove();
    // }, 2000);

    // setTimeout(function(){
    //   console.log("Reading next token in targetSelect");
    //   readNextToken();
    // }, 1000);

  });
  }


// Menu for items option

// function itemsMenu() {
//   $('#foeSelect').html("HI-POTS");
// };


// function ActionDefn
// (
//   name,
//   requiresTarget, 
//   perform,
//   toMenu
// )
// {
//   this.name = name;
//   this.requiresTarget = requiresTarget;
//   this.perform = perform;
//   this.toMenu = toMenu;
// }


function attackCalc(attacker) {

  var attacker = attacker;
  var defender = titan;

    var physDiff = defender.def - attacker.str;

    var atkDiff = attacker.atk - physDiff;

    var multiplier = function (min,max){
        return Math.floor(Math.random(1)*(max-min+1)+min);
    };

    var defenderHpDown = defender.hp - (atkDiff * multiplier(3,4) + multiplier(25, 90));

    var damageDone = defender.hp - defenderHpDown;

    defender.hp = defenderHpDown;

    var hit = new Audio;
    hit.src = "./sounds/effects/hit.wav";
    hit.play();

    $('#damageAnnouncer').html(attacker.name + " did " + damageDone + " damage to the " + defender.name + ".");
    // $('#turnAnnouncer').html(defender.name + "'s HP is now: " + defenderHpDown + "/" + defender.defaultHp);
    $('#foeBar').html("-" + damageDone);

    setTimeout(function(){
      $('#foeBar').html(" ");
    }, 2000);

    if (defender.hp < 1) {
      $('#damageAnnouncer').html(attacker.name + " has defeated the " + defender.name + "!");
      $('#foe').html("KO!");
    };

    healthCheck();
    gameOver();
    healthBarsUpdate();
    readNextToken();

  };

  //  ========= Cure spell ===============

function castCure(target) {

  if (current_character === whiteMage) {

    var multiplier = function (min,max){
        return Math.floor(Math.random(1)*(max-min+1)+min);
    };

    var cureHpUp = (whiteMage.mag * multiplier(3,4) + multiplier(65, 135));

    var targetHealed = target.hp + cureHpUp;

    target.hp = targetHealed;

    var cure = new Audio;
    cure.src = "./sounds/effects/cure.wav";
    cure.play();

    $('#damageAnnouncer').html("WHITE MAGE healed " + target.name + " for " + cureHpUp + " HP!");
    // $('#turnAnnouncer').html(target.name + "'s HP is now: " + target.hp + "/" +  target.defaultHp);


      if (target.hp > target.defaultHp) {
        target.hp = target.defaultHp;
      }
    }; 

    // $('#playerCharacter1').html("<p>" + target.hp + "/" + target.defaultHp + "</p>")

    healthCheck();
    gameOver();
    healthBarsUpdate();
    readNextToken();

};

// Black Mage's Fire Spell ==========

function castFire(target) {

    var multiplier = function (min,max){
        return Math.floor(Math.random(1)*(max-min+1)+min);
    };

    var fireDmg = (blackMage.mag * multiplier(4,5) + multiplier(65, 135));

    // var fireDmgDone = target.hp - fireDmg;

    target.hp = target.hp - fireDmg;

    $('.FireSprite').html('<img src="./images/sprites/FireSprite.gif" height="400px" id="fireGif" />');

    setTimeout(function(){
      $('#fireGif').remove();
    }, 2000);

    $('#foeBar').html("-" + fireDmg);

    setTimeout(function(){
      $('#foeBar').html(" ");
    }, 2000);

    var fire = new Audio;
    fire.src = "./sounds/effects/fire.wav";
    fire.play();

    $('#damageAnnouncer').html("BLACK MAGE cast FIRE! " + target.name + " took " + fireDmg + " damage!");
    // $('#turnAnnouncer').html(target.name + "'s HP is now: " + target.hp + "/" + target.defaultHp);

    healthCheck();
    gameOver();
    healthBarsUpdate();
    readNextToken();
};

// Foe attack round =====

var foeMoveRandom = function() {
  var randomMove = Math.floor(Math.random() * 5);
  var moves = titanMoves;

  this.move = moves[randomMove];

  if (this.move === 1) {
    foeBigAttack();
  } else {
    foeAttackTarget();
  }
};


foeAttackTarget = function() {
      var randomIndex = Math.floor(Math.random() * 3);
      var targets = partyMemberArray;
        this.target = targets[randomIndex];
        foeAttack(this.target);

        // if (this.targets.hp > 1) {
        //   this.target = targets[randomIndex];
        //   foeAttack(this.target);
        // } else {
        //   foeAttack(this.target+1);
        // }
      }


function foeAttack() {

  attacker = titan;
  defender = target;

    var physDiff = defender.def - attacker.str;

    var atkDiff = attacker.atk - physDiff;

    var multiplier = function (min,max) {
        return Math.floor(Math.random(1)*(max-min+1)+min);
    }

    var defenderHpDown = defender.hp - (atkDiff * multiplier(3,4) + multiplier(25, 90));

    var damageDone = defender.hp - defenderHpDown;

    defender.hp = defenderHpDown;

    var ouchiesIncoming = new Audio;
    ouchiesIncoming.src = "./sounds/effects/FoeAttack.wav";
    ouchiesIncoming.play();

    $('#damageAnnouncer').html(attacker.name + " did " + damageDone + " damage to the " + defender.name + ".");
    // $('#turnAnnouncer').html(defender.name + "'s HP is now: " + defenderHpDown + "/" + defender.defaultHp);
      // $('#playerCharacter1').html("<p>" + defenderHpDown + "/" + defender.defaultHp + "</p>");

    if (defender.hp < 1) {
      $('#damageAnnouncer').html(attacker.name + " has defeated the " + defender.name + "!");
      // $('#playerCharacter1').html("<p>KO!</p>");
      defender.KO = true;
      healthCheck();
      gameOver();
    }
    healthBarsUpdate();
  };

  // Big attack

  function foeBigAttack() {

    console.log("BIG ATTACK!");

      var multiplier = function (min,max) {
          return Math.floor(Math.random(1)*(max-min+1)+min);
      };

      var defenderHpDown = (65 * multiplier(3,4) + multiplier(25, 90));

      fighter.hp = fighter.hp - defenderHpDown;
      whiteMage.hp = whiteMage.hp - defenderHpDown;
      blackMage.hp = blackMage.hp - defenderHpDown;

      // defender.hp = defenderHpDown;

      var ouchiesIncoming = new Audio;
      ouchiesIncoming.src = "./sounds/effects/FoeAttack.wav";
      ouchiesIncoming.play();

      function shake() {
      $('#pcStack').effect("shake");
    };

      console.log("The party takes " + defenderHpDown + " damage!");

      // $('#damageAnnouncer').html(attacker.name + " did " + damageDone + " damage to the " + defender.name + ".");
      // $('#turnAnnouncer').html(defender.name + "'s HP is now: " + defenderHpDown + "/" + defender.defaultHp);
      //   // $('#playerCharacter1').html("<p>" + defenderHpDown + "/" + defender.defaultHp + "</p>");

      // if (defender.hp < 1) {
      //   $('#turnAnnouncer').html(attacker.name + " has defeated the " + defender.name + "!");
      //   // $('#playerCharacter1').html("<p>KO!</p>");
      //   gameOver();
      $('#damageAnnouncer').html("The party takes " + defenderHpDown + " damage!");
        // $('#playerCharacter1').html("<p>KO!</p>");
        healthCheck();
        gameOver();

      healthBarsUpdate();
    };

    function healthCheck() {
      for (var i = 0; i < partyMemberArray.length; i++) {
        if (partyMemberArray[i].Hp < 1) {
          partyMemberArray[i].KO = true;
          this.partyMemberArray.hp = 0;
         }
      }
    }

function gameOver() {
  if (fighter.KO === true && whiteMage.KO === true && blackMage.KO === true) {
    alert("Game over! You lose...");
  } else if (titan.KO === true) {
    alert("Game over. You win!");
  };
};

















