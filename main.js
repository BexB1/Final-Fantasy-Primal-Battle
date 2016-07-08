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

//   // Variable for PHYSICAL damage calcs
//   var STR;

//   // Variable for MAGICAL damage calcs
//   var MAG;

//   // Variable for resistance to attacks
//   var DEF;

//   // Variable for health bar
//   var HP;

//   var PhysDmgDealt; 
//   var PhysdmgTaken;
// 


// Cruft code, for basic testing.
var fighter = {
  name: "FIGHTER",
  atk: 55,
  str: 75,
}

var ifrit = {
  name: "IFRIT",
  def: 95,
  hp: 2000,
}

// // The party members constructor object
// function PartyMember(atk, str, def, mag, hp, mp) {
//   this.ATK = atk;
//   this.STRSTR = str,
//   this.DEF = def;
//   this.MAG = mag;
//   this.HP = hp;
//   this.MP = mp;
// }

// // // the stats for the party members
// // // var fighter = new PartyMember(55, 75, 25, 0, 200, 0);
// // // var WhiteMage = new PartyMember(25, 10, 10, 55, 200, 500);


// // // The monsters constructor object
// function Enemy(atk, str, def, mag, hp, mp) {
//   this.ATK = atk;
//   this.STRSTR = str,
//   this.DEF = def;
//   this.MAG = mag;
//   this.HP = hp;
//   this.MP = mp;
// }

// // The stats for the monsters.
// var ifrit = new Enemy(75, 75, 95, 75, 2000, 2000);

// var attackMove = function (attacker, defender) {

//   var damageDealt = function() {
//     defender = Fighter;
//     attacker = Ifrit;

//     var physDiff = defender.def - attacker.str;
//     console.log(physDiff);

//     var atkDiff = attacker.atk - physDiff;

//     console.log(atkDiff);

//     var multiplier = function (min,max)
//     {
//         return Math.floor(Math.random(1)*(max-min+1)+min);
//     }

//     var defenderHpDown = defender.hp - (atkDiff * multiplier(3,4) + multiplier(25, 90));

//     var damageDone = defender.hp - defenderHpDown;
//     console.log(defenderHpDown);

//     console.log("Damage done:" + damageDone);
//   }

// };
// var attacker;
// var defender;

// var ifrit = new Enemy(75, 75, 95, 75, 2000, 2000);
// var fighter = new PartyMember(55, 75, 25, 0, 200, 0);


// function attackFoe() {

//     attacker = fighter;
//     defender = ifrit;

//     attackCalc();
//     // foeAttack;

//   };

  // var foeAttack = function() {

  //   attacker = monster;
  //   defender = fighter;

  //   attackCalc;
  // };

function attackCalc() {

  attacker = fighter;
  defender = ifrit;

    var physDiff = defender.def - attacker.str;

    var atkDiff = attacker.atk - physDiff;

    var multiplier = function (min,max)
    {
        return Math.floor(Math.random(1)*(max-min+1)+min);
    }

    var defenderHpDown = defender.hp - (atkDiff * multiplier(3,4) + multiplier(25, 90));

    var damageDone = defender.hp - defenderHpDown;

    defender.hp = defenderHpDown;

    console.log(attacker.name + " did " + damageDone + " damage to the " + defender.name + ".");
    console.log(defender.name + "'s HP is now: " + defenderHpDown + "/" + "2000");

    if (defender.hp < 1) {
      console.log(attacker.name + " has defeated the " + defender.name + "!");
    }
  };





















