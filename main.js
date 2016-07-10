$(document).ready();

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

function PartyMember(name, atk, str, def, mag, hp, defaultHp, mp) {
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

partyMemberArray.push(fighter);
partyMemberArray.push(whiteMage);
partyMemberArray.push(blackMage);

// Lose conditions

// Menu stats, etc.

// Menu stats, etc.

function healthBarsUpdate() {
$('#fighterStats').html("FIGHTER: <span>" + fighter.hp + "/" + fighter.defaultHp + "</span><br>"
  + "WHITE MAGE: <span>" + whiteMage.hp + "/" + whiteMage.defaultHp + "</span><br>"
  + "BLACK MAGE: <span>" + blackMage.hp + "/" + blackMage.defaultHp + "</span><br>"
  );
}

healthBarsUpdate();

// The monsters constructor object
function Enemy(name, atk, str, def, mag, hp, mp) {
  this.name = name;
  this.atk = atk;
  this.str = str,
  this.def = def;
  this.mag = mag;
  this.hp = hp;
  this.defaultHp = 5000;
  this.mp = mp;
};

// The stats for the monsters.
var ifrit = new Enemy("IFRIT", 75, 75, 95, 75, 5000, 2000);


// Monster special moves

var ifritMoves = [0, 0, 1, 0, 0];




var turn = partyMemberArray;
var token = 0, state;

function readToken(token) {  
  state = turn[token];
  nextAction(state);
};

readToken(token); 

function readNextToken() {
  token++;
    if (token === partyMemberArray.length) {
      console.log('end of turn');
      token = 0;
      setTimeout(foeMoveRandom(), 5000);
    }
  readToken(token);
};


function nextAction(val){
  switch (val) {

  case fighter:

    current_character = fighter;
    $('#turnAnnouncer').html("It's FIGHTER'S turn!");

    turnOptions(fighter);

    $('#attackButton').on('click', function(){
    // unbind "click" handler
    $('#attackButton').off('click');
    readNextToken();
    });

  break;


  case whiteMage:

    current_character = whiteMage;
    $('#turnAnnouncer').html("It's WHITE MAGE'S turn!");

    turnOptions(whiteMage);


    $('#attackButton').on('click', function(){
    // unbind "click" handler
    $('#cureBtn').off('click');
    $('#attackButton').off('click');
    readNextToken();
    });

    $('#cureBtn').on('click', function(){
    // unbind "click" handler
    $('#cureBtn').off('click');
    $('#attackButton').off('click');
    });

  break;

  case blackMage:

  current_character = blackMage;
  $('#turnAnnouncer').html("It's BLACK MAGE'S turn!");

  turnOptions(blackMage);


  $('#attackButton').on('click', function(){
  // unbind "click" handler
  // turnOptions(blackMage);
  $('#attackButton').off('click');
  readNextToken();
  });

  $('#fireBtn').on('click', function(){
  // unbind "click" handler
  $('#fireBtn').off('click');
  $('#attackButton').off('click');
  readNextToken();
  });

  break;

  default: 
  console.log("Turn ended.");
 
  break;
  };
  }



// === Function for the menu options.

  function turnOptions(character) {

  // will need a function for the using of items.
if (character === fighter || character === whiteMage || character === blackMage) {
  $('#attackButton').on('click', function(){
      attackCalc(character);
    });
}

    // Magic menus

    if (character === whiteMage) {

      $('#cureBtn').on('click', function(){
        targetSelect();
       });
     }


    else if (character === blackMage) {

        $('#fireBtn').on('click', function(){
          castFire(ifrit);
        });
      };
}



function targetSelect() {
  $('#turnAnnouncer').html("Select a party member to cure!");

    $('.PC').on('click', function(){
      if (this.id === "playerCharacter1") {
      castCure(fighter);
    } else if (this.id === "playerCharacter2") {
      castCure(whiteMage);
    } else {
      castCure(blackMage);
    }
    })



  };


// Menu for items option

function itemsMenu() {
  $('#foeSelect').html("HI-POTS");
};


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
  var defender = ifrit;

    var physDiff = defender.def - attacker.str;

    var atkDiff = attacker.atk - physDiff;

    var multiplier = function (min,max){
        return Math.floor(Math.random(1)*(max-min+1)+min);
    };

    var defenderHpDown = defender.hp - (atkDiff * multiplier(3,4) + multiplier(25, 90));

    var damageDone = defender.hp - defenderHpDown;

    defender.hp = defenderHpDown;

    $('#damageAnnouncer').html(attacker.name + " did " + damageDone + " damage to the " + defender.name + ".");
    $('#turnAnnouncer').html(defender.name + "'s HP is now: " + defenderHpDown + "/" + defender.defaultHp);
    $('#foeBar').html(defenderHpDown + "/" + defender.defaultHp);

    if (defender.hp < 1) {
      $('#turnAnnouncer').html(attacker.name + " has defeated the " + defender.name + "!");
      $('#foe').html("KO!");
      gameOver();
    };

    healthBarsUpdate();


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

    $('#damageAnnouncer').html("WHITE MAGE healed " + target.name + " for " + cureHpUp + " HP!");
    $('#turnAnnouncer').html(target.name + "'s HP is now: " + target.hp + "/" +  target.defaultHp);


      if (target.hp > target.defaultHp) {
        target.hp = target.defaultHp;
      }
    }; 

    // $('#playerCharacter1').html("<p>" + target.hp + "/" + target.defaultHp + "</p>");
    healthBarsUpdate();
    readNextToken();

};

// Black Mage's Fire Spell ==========

function castFire(target) {

  target = ifrit;

    var multiplier = function (min,max){
        return Math.floor(Math.random(1)*(max-min+1)+min);
    };

    var fireDmg = (blackMage.mag * multiplier(4,5) + multiplier(65, 135));

    // var fireDmgDone = target.hp - fireDmg;

    target.hp = target.hp - fireDmg;

    $('#damageAnnouncer').html("BLACK MAGE cast FIRE! " + target.name + " took " + fireDmg + " damage!");
    $('#turnAnnouncer').html(target.name + "'s HP is now: " + target.hp + "/" + target.defaultHp);
    $('#foeBar').html(target.hp + "/" + target.defaultHp);

    healthBarsUpdate();

};

// Foe attack round =====

var foeMoveRandom = function() {
  var randomMove = Math.floor(Math.random() * 5);
  var moves = ifritMoves;

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
  };


function foeAttack() {

  attacker = ifrit;
  defender = target;

    var physDiff = defender.def - attacker.str;

    var atkDiff = attacker.atk - physDiff;

    var multiplier = function (min,max) {
        return Math.floor(Math.random(1)*(max-min+1)+min);
    }

    var defenderHpDown = defender.hp - (atkDiff * multiplier(3,4) + multiplier(25, 90));

    var damageDone = defender.hp - defenderHpDown;

    defender.hp = defenderHpDown;

    $('#damageAnnouncer').html(attacker.name + " did " + damageDone + " damage to the " + defender.name + ".");
    $('#turnAnnouncer').html(defender.name + "'s HP is now: " + defenderHpDown + "/" + defender.defaultHp);
      // $('#playerCharacter1').html("<p>" + defenderHpDown + "/" + defender.defaultHp + "</p>");

    if (defender.hp < 1) {
      $('#turnAnnouncer').html(attacker.name + " has defeated the " + defender.name + "!");
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

      var defenderHpDown = (35 * multiplier(3,4) + multiplier(25, 90));

      fighter.hp = fighter.hp - defenderHpDown;
      whiteMage.hp = whiteMage.hp - defenderHpDown;
      blackMage.hp = blackMage.hp - defenderHpDown;

      // defender.hp = defenderHpDown;

      console.log("The party takes " + defenderHpDown + " damage!");

      // $('#damageAnnouncer').html(attacker.name + " did " + damageDone + " damage to the " + defender.name + ".");
      // $('#turnAnnouncer').html(defender.name + "'s HP is now: " + defenderHpDown + "/" + defender.defaultHp);
      //   // $('#playerCharacter1').html("<p>" + defenderHpDown + "/" + defender.defaultHp + "</p>");

      // if (defender.hp < 1) {
      //   $('#turnAnnouncer').html(attacker.name + " has defeated the " + defender.name + "!");
      //   // $('#playerCharacter1').html("<p>KO!</p>");
      //   gameOver();
      $('#turnAnnouncer').html("The party takes " + defenderHpDown + " damage!");
        // $('#playerCharacter1').html("<p>KO!</p>");
        healthCheck();
        gameOver();
      healthBarsUpdate();
    };


function gameOver() {
  if (fighter.KO === true && whiteMage.KO === true && blackMage.KO === true) {
    alert("Game over!");
  }
};

function healthCheck() {
  for (var i = 0; i < partyMemberArray.length; i++) {
    if (partyMemberArray[i].Hp < 1) {
      this.PartyMember.KO = true;
  }
}
};
















