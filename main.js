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


$('#attackButton').on('click', function(){
  attackCalc();
}); 








// ===== BASIC DAMAGE CALCULATION =====

//   STR is the v ariable for base PHYSICAL damage calcs

//   ATK is the variable for PHYS damage calc modification

//   MAG is the variable for MAGICAL damage/healing calcs

//   DEF is the variable for resistance to attacks

//   HP is the variable for the health bar

//   MP is the variable for the MP/mana bar


// The party members constructor object
function PartyMember(name, atk, str, def, mag, hp, mp) {
  this.name = name;
  this.atk = atk;
  this.str = str,
  this.def = def;
  this.mag = mag;
  this.hp = hp;
  this.defaultHp = 2000;
  this.mp = mp;
}

// the stats for the party members
var fighter = new PartyMember("FIGHTER", 55, 75, 25, 0, 2000, 0);

var blackMage = new PartyMember("BLACK MAGE", 25, 10, 10, 75, 1000, 500);
var whiteMage = new PartyMember("WHITE MAGE", 25, 10, 10, 55, 1000, 500);

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
}

// The stats for the monsters.
var ifrit = new Enemy("IFRIT", 75, 75, 95, 75, 2000, 2000);




function attackCalc() {

  attacker = fighter;
  defender = ifrit;

    var physDiff = defender.def - attacker.str;

    var atkDiff = attacker.atk - physDiff;

    var multiplier = function (min,max){
        return Math.floor(Math.random(1)*(max-min+1)+min);
    }

    var defenderHpDown = defender.hp - (atkDiff * multiplier(3,4) + multiplier(25, 90));

    var damageDone = defender.hp - defenderHpDown;

    defender.hp = defenderHpDown;

    console.log(attacker.name + " did " + damageDone + " damage to the " + defender.name + ".");
    console.log(defender.name + "'s HP is now: " + defenderHpDown + "/" + "2000");
    $('#foe').html("<p>" + defenderHpDown + "/" + defender.defaultHp + "</p>");

    if (defender.hp < 1) {
      console.log(attacker.name + " has defeated the " + defender.name + "!");
      $('#foe').html("KO!");
    };
    
    foeAttack();

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
    }
  };




















