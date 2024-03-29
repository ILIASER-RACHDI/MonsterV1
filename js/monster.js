// BELLOUCH CHOUAIB ET ER-RACHDI ILIAS
var name;
var life;
var money;
var awake = true;
var run, fight, work, sleep, eat, show;

const tableauauditeurs = [courir, sebattre, travailler, manger, dormir];
const timerandom = 7000; 

function initMonstre(nom, vie, argent){
    name = nom;
    life = vie;
    money = argent;
}

function afficheMonstre(){
  message = "Name :" + name + "\nlife :" + life + "\nmoney :" + money;
  console.log(message);
  logBoite(message);
} 

run = document.getElementById("run");
fight = document.getElementById("fight");
work = document.getElementById("work");
sleep = document.getElementById("sleep");
eat = document.getElementById("eat");
show = document.getElementById("show");
new_life = document.getElementById("new");
kill = document.getElementById("kill");

var messagebox = document.getElementById("actionbox");

function go(){
  initMonstre("monstre", 20, 20);
  show.addEventListener("click", afficheMonstre);
  run.addEventListener("click", courir);
  fight.addEventListener("click",sebattre);
  work.addEventListener("click",travailler);
  eat.addEventListener("click",manger);
  sleep.addEventListener("click",dormir);
  kill.addEventListener("click",tuer);
  new_life.addEventListener("click",nouvellevie);
  updateStatus();
}

function logBoite(message){
  var p = document.createElement("p");
  p.textContent = message;
  messagebox.prepend(p);
}

function updateStatus() {
  var statut = document.getElementById("statut");
  statut.innerHTML = ""; 

  var vie = document.createElement("li");
  vie.textContent = "Vie : " + life;
  statut.appendChild(vie);

  var argent = document.createElement("li");
  argent.textContent = "Argent : " + money;
  statut.appendChild(argent);

  var eveille = document.createElement("li");
  if (awake) {
    eveille.textContent = "Éveillé";
  } 
  else {
    eveille.textContent = "Endormi";
  }
  statut.appendChild(eveille);
}

function courir(){
  if (life >= 1 && awake){
    life-=1;
    logBoite(name +" a couru 🏃");
  }
  else {
    if(!awake)
      logBoite("Impossible de courir car il est endormi 😴.");
    else
      logBoite( "n'a pas suffisamment de points de vie 🙂.");
  }
  updateStatus();
}

function sebattre(){
  if (life >= 3 && awake) {
      life -= 3;
      logBoite(name + " a combattu 🤼");
  } 
  else {
    if(!awake)
      logBoite("Impossible de sebattre car il est endormi 😴.");
    else
      logBoite( "n'a pas suffisamment de points de vie 🙂.");
  }
  updateStatus();
}

function travailler(){
  if (life >= 1 && awake) {
      life -= 1;
      money +=2;
      logBoite(name + " a travaillé 👷🏼‍♂️");
  } 
  else {
    if(!awake)
      logBoite("Impossible de travailler car il est endormi 😴.");
    else
      logBoite( "n'a pas suffisamment de points de vie 🙂.");
  }
  updateStatus();
}

function manger(){
  if (money >= 3 && awake) {
      life += 2;
      money -=3;
      logBoite(name + " a mangé 🤤");
  } 
  else {
    if(!awake)
      logBoite("Impossible de manger car il est endormi 😴.");
    else
      logBoite( "n'a pas suffisamment d'argent 🙂.");
  }
  updateStatus();
}

function dormir(){
  if (awake) {
      awake = false;
      logBoite(name + " est maintenant endormi 😴");
      updateStatus();
      eat.disabled = true;
      setTimeout(function(){
          awake = true;
          life += 1;
          logBoite(name + " s'est réveillé 🙌");
          updateStatus();
      }, 5000);
  } 
  else {
      logBoite(name + " est déjà endormi 😴");
  }
}

function actionauhasard(){
    var i = Math.floor(Math.random() * 5);
    var r = tableauauditeurs[i];
    r();
}

function tuer() {
  if (life <= 0) {
    logBox(name+" est déjà mort ☠️.");
  } 
  else {
    life = 0;
    money = 0;
    awake = false;
    updateStatus();
    logBox(name+" est mort 😓.");
    kill.disabled = true;
    eat.disabled = true;
  }
}

function nouvellevie() {
  if (life > 0) {
    logBox(name+" est encore vivant 👻");
  } else {
    life = 20;
    money = 20;
    awake = true;
    logBox(name+" est ressuscité ⏰");
    updateStatus();
  }
}

window.addEventListener("load", ()=> {
    setInterval(actionauhasard, timerandom);
});
window.addEventListener("load", go);

