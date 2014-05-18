/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Object maintains data stored in localStorage containing
 * unlocked levels per user.
 * @returns {Boolean} false if localStorage is not supported
 */
var LevelLocker = function() {
    if (!this.detectLocalStorage())
	return false;


    this.highestUnlockedLevel = 1;
    this.lastWinTime = 0;
    this.initialize();
    this.registerResetLink();
};

LevelLocker.prototype.detectLocalStorage = function() {
    try {
	return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
	return false;
    }
};

LevelLocker.prototype.registerResetLink = function() {
    $('#resetStats').click(this.resetStats.bind(this));
};

LevelLocker.prototype.initialize = function() {
    var game = JSON.parse(localStorage.getItem("StoneRush"));
    if (game === null) {
	var data = {'highestUnlockedLevel': 1, 'lastWinTime': 0};
	localStorage.setItem("StoneRush", JSON.stringify(data));
	game = JSON.parse(localStorage.getItem("StoneRush"));
    }
    this.highestUnlockedLevel = game.highestUnlockedLevel;
    this.lastWinTime = game.lastWinTime;
    this.updateNewGameOptions();
};

LevelLocker.prototype.unlockLevel = function(level) {
    var data = {'highestUnlockedLevel': level, 'lastWinTime': Date.now()};
    localStorage.setItem("StoneRush", JSON.stringify(data));
    this.updateNewGameOptions();
};

LevelLocker.prototype.resetStats = function(e) {
    e.preventDefault();
    localStorage.removeItem("StoneRush");
    this.initialize();
};

LevelLocker.prototype.updateNewGameOptions = function() {
    $(".unlockedLevel").remove();

    var cheater = document.querySelector("#cheater");
    var newGame = document.querySelector("#newGame");

    for (var i = 1; i <= this.highestUnlockedLevel; i++) {
	var btn = document.createElement("button");
	btn.innerHTML = "Level " + i;
	var link = document.createElement("a");
	link.setAttribute("href", "?level=" + i);
	link.setAttribute("class", "unlockedLevel");
	link.appendChild(btn);

	cheater.appendChild(link);
	newGame.appendChild(link.cloneNode(true));
    }
};