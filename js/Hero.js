/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Object encapsulates hero inner status such as
 * how much in which direction he needs to go,
 * his current position and behaviour on
 * key input handled by InputHandler.
 * 
 * @param {Gameplay} _gp
 * @param {array} startCoords
 * @returns {Hero}
 */
var Hero = function(_gp,startCoords) {
    this.isWalking = false;
    this.justStopped = true;
    this.justStarted = false;
    this.toBeWalkedUP = 0;
    this.toBeWalkedDOWN = 0;
    this.toBeWalkedLEFT = 0;
    this.toBeWalkedRIGHT = 0;

    this.noDirFollows = true;
    //u,d,l,r
    this.currentDir = [0, 0, 0, 0];

    this.gameplay = _gp;
    this.coords = startCoords;
};

Hero.prototype.resetWalking = function() {
    this.toBeWalkedUP = 0;
    this.toBeWalkedDOWN = 0;
    this.toBeWalkedLEFT = 0;
    this.toBeWalkedRIGHT = 0;
};

Hero.prototype.move = function(direction) {
    
    if(this.coords[0] === this.gameplay.finishCoords[0] &&
	    this.coords[1] === this.gameplay.finishCoords[1]){
	this.gameplay.gameOver("WIN");
    }
    
    
    if (!this.isWalking) {
	switch (direction) {
	    case 'up':
		if (this.gameplay.canWalkToStone(this.coords[0], this.coords[1] - 1)) {
		    this.isWalking = true;
		    this.toBeWalkedUP = 40;
		    this.coords[1]--;
		    this.justStarted = !this.currentDir[0];
		    this.currentDir[0] = 1;
		}
		break;
	    case 'down':
		if (this.gameplay.canWalkToStone(this.coords[0], this.coords[1] + 1)) {
		    this.isWalking = true;
		    this.toBeWalkedDOWN = 40;
		    this.justStarted = !this.currentDir[1];
		    this.currentDir[1] = 1;
		    this.coords[1]++;
		}
		break;
	    case 'left':
		if (this.gameplay.canWalkToStone(this.coords[0] - 1, this.coords[1])) {
		    this.isWalking = true;
		    this.toBeWalkedLEFT = 44;
		    this.justStarted = !this.currentDir[2];
		    this.currentDir[2] = 1;
		    this.coords[0]--;
		}
		break;
	    case 'right':
		if (this.gameplay.canWalkToStone(this.coords[0] + 1, this.coords[1])) {
		    this.isWalking = true;
		    this.toBeWalkedRIGHT = 44;
		    this.justStarted = !this.currentDir[3];
		    this.currentDir[3] = 1;
		    this.coords[0]++;
		}
		break;
	}
	this.justStopped = false;
	this.gameplay.updateCompas(this.coords[0],this.coords[1]);
    }
};

Hero.prototype.stop = function(direction) {
    switch (direction) {
	case 'up':
	    this.currentDir[0] = 0;
	case 'down':
	    this.currentDir[1] = 0;
	case 'left':
	    this.currentDir[2] = 0;
	case 'right':
	    this.currentDir[3] = 0;
    }

    if ((this.currentDir[0] + this.currentDir[1] + this.currentDir[2] + this.currentDir[3]) === 0) {
	this.noDirFollows = true;
	this.justStopped = false;
    } else {
	this.noDirFollows = false;
    }
};