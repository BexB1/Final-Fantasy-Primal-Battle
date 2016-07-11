var bgm = new Audio();
bgm.src = "./sounds/bgm/Battle.mp3";
bgm.play();
bgm.loop = true;

var fanfare = new Audio();
fanfare.src = "./sounds/bgm/Fanfare.mp3";


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
  this.str = str;
  this.def = def;
  this.mag = mag;
  this.hp = hp;
  this.defaultHp = defaultHp;
  this.mp = mp;
  this.KO = false;
};

var partyMemberArray = [];

var current_character = fighter;

// the stats for the party members

var fighter = new PartyMember("FIGHTER", 55, 75, 25, 0, 1500, 1500, 0, false);
var blackMage = new PartyMember("BLACK MAGE", 55, 35, 10, 75, 1000, 1000, 500, false);
var whiteMage = new PartyMember("WHITE MAGE", 55, 35, 10, 75, 1250, 1250, 500, false);
var titan = new PartyMember("TITAN", 75, 90, 95, 75, 5000, 5000, 5000, false);

partyMemberArray.push(fighter);
partyMemberArray.push(whiteMage);
partyMemberArray.push(blackMage);
partyMemberArray.push(titan);

var titanMoves = [0, 0, 1, 0, 0];

var turn = partyMemberArray;
var token = 0, state;

readToken(token);

$('#attackButton').on('click', function() {
  if(current_character === blackMage || current_character === fighter) {
    attackCalc(current_character);

      $("#foeCounter").animate({
        opacity: '0.4'
      });

      $("#foeCounter").animate({
        opacity: '1'
      });
    }
  });

$('#waitBtn').on('click', function(){
  readNextToken();
});

$('.PC').on('click', function(){
  if (current_character === whiteMage){
    $(this).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
  };
  if(current_character === whiteMage) {
    if (this.id === "playerCharacter1") {
      if (fighter.hp > 0){
        castCure(fighter);
      }
    } else if (this.id === "playerCharacter2") {
      if (whiteMage.hp > 0) {
        castCure(whiteMage);
      }
    } else {
      if (blackMage.hp > 0) {
       castCure(blackMage);
      }
    }
  }
});

$('#fireBtn').on('click', function(){
  if(current_character === blackMage) {
    castFire(titan);
    $("#foeCounter").animate({
      opacity: '0.4'
    });

    $("#foeCounter").animate({
      opacity: '1'
  });
}
});



function healthBarsUpdate() {
  $('#fighterStats').html("FIGHTER: <span>" + fighter.hp + "/" + fighter.defaultHp + "</span><br>"
    + "WHITE MAGE: <span>" + whiteMage.hp + "/" + whiteMage.defaultHp + "</span><br>"
    + "BLACK MAGE: <span>" + blackMage.hp + "/" + blackMage.defaultHp + "</span><br>"
    );
  $('#foeSelect').html("Titan: <span>" + titan.hp + "/" + titan.defaultHp + "</span><br>");
};

$('#damageAnnouncer').html("Fight!");

healthBarsUpdate();


// The turn order =========

function readToken(token) { 
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

    break;


  case whiteMage:

    current_character = whiteMage;

    ko_check();

    break;


  case blackMage:

    current_character = blackMage;

    ko_check();

    break;

  case titan:

    current_character = titan;

    ko_check();

    setTimeout(function(){
      foeMoveRandom();
    }, 3000);

    break;

  default: 
    console.log("Turn ended.");
 
    break;

  }
}


  // Check if current_character KO. If so, skip turn.

function ko_check() {
  if (current_character.KO) {
    readNextToken();
  } else if (current_character === fighter) {
    $('#turnAnnouncer').html("It's <span>FIGHTER'S</span> turn!");
  } else if (current_character === whiteMage) {
    $('#turnAnnouncer').html("It's <span>WHITE MAGE'S</span> turn!");
    $('#damageAnnouncer').html("Select a party member to cure!");
  } else if (current_character === blackMage) {
    $('#turnAnnouncer').html("It's <span>BLACK MAGE'S</span> turn!");
  } else if (current_character === titan) {
    $('#turnAnnouncer').html("The enemy is going to attack!");
  }
}


// The player attack calculation

function attackCalc(attacker) {

  var physDiff = titan.def - attacker.str;

  var atkDiff = attacker.atk - physDiff;

  var multiplier = function (min,max){
      return Math.floor(Math.random(1)*(max-min+1)+min);
  };

  var defenderHpDown = titan.hp - (atkDiff * multiplier(3,4) + multiplier(25, 90));

  var damageDone = titan.hp - defenderHpDown;

  titan.hp = defenderHpDown;

  var hit = new Audio();
  hit.src = "./sounds/effects/hit.wav";
  hit.play();

  $('#damageAnnouncer').html(attacker.name + " did " + damageDone + " damage to the " + titan.name + ".");

  $('#foeBar').html("-" + damageDone);

  setTimeout(function(){
    $('#foeBar').html(" ");
  }, 2000);

  if (titan.hp < 1) {
    $('#damageAnnouncer').html(attacker.name + " has defeated the " + titan.name + "!");
    titan.KO = true;
  };

  healthCheck();

  healthBarsUpdate();

  if(!gameOver()) {
    readNextToken();
  }

};  



  //  ========= Cure spell ===============

function castCure(target) {

  var multiplier = function (min,max){
      return Math.floor(Math.random(1)*(max-min+1)+min);
  };

  var cureHpUp = (whiteMage.mag * multiplier(3,4) + multiplier(65, 135));

  var targetHealed = target.hp + cureHpUp;

  target.hp = targetHealed;

  var cure = new Audio();
  cure.src = "./sounds/effects/cure.wav";
  cure.play();

  $('#damageAnnouncer').html("WHITE MAGE healed " + target.name + " for " + cureHpUp + " HP!");

  if (target === fighter) {
    $('#fhtBar').html("+" + cureHpUp);
  } else if (target === whiteMage) {
    $('#whmBar').html("+" + cureHpUp);
  } else {
    $('#blmBar').html("+" + cureHpUp);
  }

  setTimeout(function(){
    $('#fhtBar').html(" ");
    $('#whmBar').html(" ");
    $('#blmBar').html(" ");
  }, 2000);

  if (target.hp > target.defaultHp) {
    target.hp = target.defaultHp;
  }

  healthCheck();

  healthBarsUpdate();

  if(!gameOver()) {
    readNextToken();
  }
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

  var fire = new Audio();
  fire.src = "./sounds/effects/fire.wav";
  fire.play();

  $('#damageAnnouncer').html("BLACK MAGE cast FIRE! " + target.name + " took " + fireDmg + " damage!");
  // $('#turnAnnouncer').html(target.name + "'s HP is now: " + target.hp + "/" + target.defaultHp);

  healthCheck();

  healthBarsUpdate();

  if(!gameOver()) {
    readNextToken();
  }
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
  var targets = partyMemberArray;
  var target = targets[Math.floor(Math.random() * 2)];

  while(target.KO) {
    target = targets[Math.floor(Math.random() * 2)];
  }

  foeAttack(target);
};


function foeAttack(target) {

  if (target === fighter) {
      $("#playerCharacter1").fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
  } else if (target === whiteMage) {
      $("#playerCharacter2").fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
  } else {
      $("#playerCharacter3").fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
    }
  

  var physDiff = target.def - titan.str;

  var atkDiff = titan.atk - physDiff;

  var multiplier = function (min,max) {
      return Math.floor(Math.random(1)*(max-min+1)+min);
  };

  var defenderHpDown = target.hp - (atkDiff * multiplier(3,4) + multiplier(25, 90));

  var damageDone = target.hp - defenderHpDown;

  target.hp = defenderHpDown;

  function shakeitallabout() {
    $("#wrapper").effect( "shake", {times:4}, 1000 );
  }

  var ouchiesIncoming = new Audio();
  ouchiesIncoming.src = "./sounds/effects/FoeAttack.wav";
  ouchiesIncoming.play();

  $('#damageAnnouncer').html("TITAN did " + damageDone + " damage to the " + target.name + ".");

  if (target.hp < 1) {
    $('#damageAnnouncer').html("TITAN has defeated the " + target.name + "!");

    target.KO = true;
  }

  healthCheck();

  healthBarsUpdate();

  if(!gameOver()) {
    readNextToken();
  }
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

  $("#playerCharacter1").fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
  $("#playerCharacter2").fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300);
  $("#playerCharacter3").fadeIn(300).fadeOut(300).fadeIn(300).fadeOut(300).fadeIn(300); 

  var ouchiesIncoming = new Audio();
  ouchiesIncoming.src = "./sounds/effects/FoeAttack.wav";
  ouchiesIncoming.play();

  function shakeitallabout() {
    $("#wrapper").effect( "shake", {times:4}, 1000 );
  }

  $('#damageAnnouncer').html("The party takes " + defenderHpDown + " damage!");

  healthCheck();

  healthBarsUpdate();
  if(!gameOver()) {
    readNextToken();
  }
};


// Check to see who's KO'd.

function healthCheck() {
  for (var i = 0; i < partyMemberArray.length; i++) {
    if (partyMemberArray[i].hp < 1) {
      partyMemberArray[i].KO = true;
      partyMemberArray[i].hp = 0;
      if (fighter.KO) {
        $("#playerCharacter1").animate({
              opacity: '0.5',
          });
      }
      if (whiteMage.KO) {
          $("#playerCharacter2").animate({
                opacity: '0.5',
          });
        }
      if (blackMage.KO) {
        $("#playerCharacter3").animate({
              opacity: '0.5',
          });
      }
    }
  }
};

// Win/lose conditions.

function gameOver() {
  // console.log(fighter.KO, whiteMage.KO, blackMage.KO, fighter.KO && whiteMage.KO && blackMage.KO);
  if (titan.KO) {

  console.log("Game over!");

  $('#foeCounter').fadeOut("slow");

  $('#turnAnnouncer').html('<span id="winorloss">Victory!</span>');

  bgm.pause();

  setTimeout(function(){
    fanfare.play();
  }, 2000);

  return ((fighter.KO && whiteMage.KO && blackMage.KO) || titan.KO);
  } else if (fighter.KO && whiteMage.KO && blackMage.KO) {

    $('#turnAnnouncer').html('<span id="winorloss">Defeated...</span>');

    bgm.pause();
    return ((fighter.KO && whiteMage.KO && blackMage.KO) || titan.KO);
  }
};

















