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
};

var partyMemberArray = [];
var actionsChosen = 0;

var current_character;
// the stats for the party members

var fighter = new PartyMember("FIGHTER", 55, 75, 25, 0, 2000, 2000, 0);

partyMemberArray.push(fighter);

var blackMage = new PartyMember("BLACK MAGE", 55, 35, 10, 75, 1000, 1000, 500);
var whiteMage = new PartyMember("WHITE MAGE", 55, 35, 10, 65, 1000, 1000, 500);

partyMemberArray.push(whiteMage);
partyMemberArray.push(blackMage);


// Menu stats, etc.

// Menu stats, etc.

function healthBarsUpdate() {
$('#fighterStats').html("FIGHTER: <span>" + fighter.hp + "/" + fighter.defaultHp + "</span><br>"
  + "WHITE MAGE: <span>" + whiteMage.hp + "/" + whiteMage.defaultHp + "</span><br>"
  + "BLACK MAGE: <span>" + blackMage.hp + "/" + blackMage.defaultHp + "</span><br>"
  );
}



// The monsters constructor object
function Enemy(name, atk, str, def, mag, hp, mp) {
  this.name = name;
  this.atk = atk;
  this.str = str,
  this.def = def;
  this.mag = mag;
  this.hp = hp;
  this.defaultHp = 2000;
  this.mp = mp;
};

// The stats for the monsters.
var ifrit = new Enemy("IFRIT", 75, 75, 95, 75, 2000, 2000);


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
      foeAttack();
      token = 0;
    }
  readToken(token);
};


function nextAction(val){
  switch (val) {

  case fighter:

    current_character = fighter;
    console.log("It's FIGHTER'S turn!");

    turnOptions(fighter);

    $('#attackButton').on('click', function(){
    // unbind "click" handler
    $('#attackButton').off('click');
    readNextToken();
    });

  break;


  case whiteMage:

    current_character = whiteMage;
    console.log("It's WHITE MAGE'S turn!");

    turnOptions(whiteMage);

    $('#cureBtn').on('click', function(){

    // unbind "click" handler
    $('#attackButton').off('click');
    $('#cureBtn').off('click');

    });

    $('#attackButton').on('click', function(){
    // unbind "click" handler
    $('#cureBtn').off('click');
    $('#attackButton').off('click');
    readNextToken();
    });

  break;

  case blackMage:

  current_character = blackMage;
  console.log("It's BLACK MAGE'S turn!");

  turnOptions(blackMage);


  $('#attackButton').on('click', function(){
  // unbind "click" handler
  turnOptions(blackMage);
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

// Function for the menu options.

  function turnOptions(character) {
    // options: Attack, Item
    thisCharacter = character
  // will need a function for the using of items.
    // Magic menus

    if (thisCharacter === whiteMage){
      $('#cureBtn').on('click', function(){
        targetSelect();
       });

      $('#attackButton').on('click', function(){
        attackCalc(thisCharacter);

      });
    }


    else if (character === blackMage) {

        $('#fireBtn').on('click', function(){
          castFire(ifrit);
        });
      }

    else {
      $('#attackButton').on('click', function(){
        attackCalc(thisCharacter);
      });
  }
};


function targetSelect() {
  console.log("Select a party member to cure!");

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

    console.log(attacker.name + " did " + damageDone + " damage to the " + defender.name + ".");
    console.log(defender.name + "'s HP is now: " + defenderHpDown + "/" + defender.defaultHp);
    $('#foe').html("<p>" + defenderHpDown + "/" + defender.defaultHp + "</p>");

    actionsChosen++;

    if (defender.hp < 1) {
      console.log(attacker.name + " has defeated the " + defender.name + "!");
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

    console.log("WHITE MAGE healed " + target.name + " for " + cureHpUp + " HP!");
    console.log(target.name + "'s HP is now: " + target.hp + "/" +  target.defaultHp);


      if (target.hp > target.defaultHp) {
        target.hp = target.defaultHp;
      };

    $('#playerCharacter1').html("<p>" + target.hp + "/" + target.defaultHp + "</p>");

    } 

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

    console.log("BLACK MAGE cast FIRE! " + target.name + " took " + fireDmg + " damage!");
    console.log(target.name + "'s HP is now: " + target.hp + "/" + target.defaultHp);
    $('#foe').html("<p>" + target.hp + "/" + target.defaultHp + "</p>");

    healthBarsUpdate();

};


// Foe attack round

function foeAttack() {

  attacker = ifrit;
  defender = fighter;

    var physDiff = defender.def - attacker.str;

    var atkDiff = attacker.atk - physDiff;

    var multiplier = function (min,max) {
        return Math.floor(Math.random(1)*(max-min+1)+min);
    }

    var defenderHpDown = defender.hp - (atkDiff * multiplier(3,4) + multiplier(25, 90));

    var damageDone = defender.hp - defenderHpDown;

    defender.hp = defenderHpDown;

    console.log(attacker.name + " did " + damageDone + " damage to the " + defender.name + ".");
    console.log(defender.name + "'s HP is now: " + defenderHpDown + "/" + defender.defaultHp);
      $('#playerCharacter1').html("<p>" + defenderHpDown + "/" + defender.defaultHp + "</p>");

    if (defender.hp < 1) {
      console.log(attacker.name + " has defeated the " + defender.name + "!");
      $('#playerCharacter1').html("<p>KO!</p>");
      gameOver();
    }
    healthBarsUpdate();
  };


function gameOver() {
  alert("Game over!");
};




















