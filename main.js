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

function PartyMember(name, atk, str, def, mag, hp, defaultHp, mp, turnTaken) {
  this.name = name;
  this.atk = atk;
  this.str = str,
  this.def = def;
  this.mag = mag;
  this.hp = hp;
  this.defaultHp = defaultHp;
  this.mp = mp;
  this.turnTaken = false;
};

var partyMemberArray = [];
var actionsChosen = 0;


// the stats for the party members

var fighter = new PartyMember("FIGHTER", 55, 75, 25, 0, 2000, 2000, 0);

partyMemberArray.push(fighter);

var blackMage = new PartyMember("BLACK MAGE", 25, 10, 10, 75, 1000, 1000, 500);
var whiteMage = new PartyMember("WHITE MAGE", 25, 10, 10, 55, 1000, 1000, 500);

partyMemberArray.push(whiteMage);


// Menu stats, etc.

$('#fighterStats').html("FIGHTER: " + fighter.hp + "/" + fighter.defaultHp);



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

// Cycling through player characters; loop and array from instances of partyMember?

// So we've got an array of playerCharacter objects...

// Each turn, I want to cycle through the characters and choose their actions before the turn is over.

playerTurn();

function playerTurn() {

  // for (var i = 0; i < partyMemberArray.length; i++) {

    //   if (partyMemberArray[i].turnTaken === false) {
    //     if (partyMemberArray[i] === fighter) {
    //       fighterTurn();
    //     }
    //     else if (partyMemberArray === whiteMage) {
    //       console.log("White Mage triggering?");
    //       whiteMageTurn();
    //     };
    //   };
    // }

    if (actionsChosen === 0) {
        fighterTurn();
      }
    else if (actionsChosen === 1) {
      whiteMageTurn();
    }
    else {
      blackMageTurn();
    }
    // else if (actionsChosen === 1) {
    //     console.log("White Mage triggering?");
    //     whiteMageTurn();
    //   };


  function fighterTurn() {
    turnOptions(fighter);
    console.log("It's FIGHTER'S turn!");
    fighter.turnTaken = true;
    // whiteMageTurn(whiteMage);
  }; 

  function whiteMageTurn() {
    turnOptions(whiteMage);
    console.log("It's WHITE MAGE'S turn!");
    whiteMage.turnTaken = true;
    blackMageTurn(blackMage);
  };

  function blackMageTurn() {
    turnOptions(blackMage);
    console.log("It's BLACK MAGE'S turn!");
    blackMage.turnTaken = true;
  };

  function turnOptions(character) {

    // options: Attack, Item
    thisCharacter = character

    $('#attackButton').on('click', function(){
      attackCalc(thisCharacter);

    });

    $('#itemsButton').on('click', function(){
      itemsMenu();

      // will need a function for the using of items.

    actionsChosen++;
    });


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
    console.log(defender.name + "'s HP is now: " + defenderHpDown + "/" + "2000");
    $('#foe').html("<p>" + defenderHpDown + "/" + defender.defaultHp + "</p>");

    actionsChosen++;

    if (defender.hp < 1) {
      console.log(attacker.name + " has defeated the " + defender.name + "!");
      $('#foe').html("KO!");
      gameOver();
    };
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
    console.log(defender.name + "'s HP is now: " + defenderHpDown + "/" + "2000");
      $('#playerCharacter1').html("<p>" + defenderHpDown + "/" + defender.defaultHp + "</p>");

    if (defender.hp < 1) {
      console.log(attacker.name + " has defeated the " + defender.name + "!");
      $('#playerCharacter1').html("<p>KO!</p>");
      gameOver();
    }
    return "Turn over";
  };


function gameOver() {
  alert("Game over!");
};

};
















