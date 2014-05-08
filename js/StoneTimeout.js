/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Set and handles timeouts - durability of stones
 * put to the game grid. It also generates events
 * when some stone ran out of time.
 * 
 * @param {int} typeId
 * @param {int} coords
 * @param {int} seconds
 * @param {Gameplay} gp
 * @returns {StoneTimeout}
 */
var StoneTimeout = function(typeId, coords, seconds, gp) { // 
    this.typeId = typeId;
    this.coords = coords;
    this.seconds = seconds;
    this.gameplay = gp;
    this.timerElement;
    this.timer;
};

StoneTimeout.prototype.run = function() {

    var i = 1;

    console.log((this.coords[0] + stoneTypes[this.typeId][i * 2]), (this.coords[1] + stoneTypes[this.typeId][i * 2 + 1]));

    var cell = document.querySelector("#gameGrid [data-x='" + (this.coords[0] + stoneTypes[this.typeId][i * 2]) + "'][data-y='" + (this.coords[1] + stoneTypes[this.typeId][i * 2 + 1]) + "']");
    this.timerElement = document.createElement('div');
    this.timerElement.setAttribute('class', 'timer');
    this.timerElement.innerHTML = this.seconds;
    $(cell).append(this.timerElement);

    this.timer = setInterval(this.oneRound.bind(this), 1000);

};


StoneTimeout.prototype.oneRound = function() {
    this.seconds--;
    if (this.seconds < 0) {
	clearInterval(this.timer);
	this.gameplay.removeStone(this.typeId, this.coords[0], this.coords[1]);
    } else {
	this.timerElement.innerHTML = this.seconds;
    }
};