/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Handles most of the game logic, holds the state of
 * game grid stones, hero and overal game status.
 * 
 * @param {array} _startOrigin
 * @param {int} gridWidth
 * @param {int} gridHeight
 * @param {StonesGenerator} sg
 * @returns {Gameplay}
 */
var Gameplay = function(_startOrigin, gridWidth, gridHeight, sg, ll) {

    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.usedStones = [];
    this.storeStones = [];
    this.level = 1;
    this.stonesGen = sg;
    sg.gameplay = this;
    this.startOrigin = [0, 0];
    this.startOriginNotShifted = _startOrigin;
    this.startOrigin[0] = _startOrigin[0];
    this.startOrigin[1] = _startOrigin[1];
    this.startOrigin[1] -= 2;
    this.levelLocker = ll;
    this.timeouts = [];

    for (var y = 0; y < gridHeight; y++) {
	this.usedStones[y] = [];
    }

    for (var y = 0; y < 11; y++) {
	this.storeStones[y] = [];
    }

    this.finishCoords = [0, 0];
    
    this.compasNeedle = document.getElementById('needle');
};

Gameplay.prototype.initGame = function() {
    var typeId = getRandomInt(0, stoneTypes.length - 1);
    this.stonesGen.generateStone(typeId, this.startOriginNotShifted, true);
    this.putStone(typeId, this.startOriginNotShifted[1], this.startOriginNotShifted[0]);

    // Fill the store
    for (i = 0; i < 3; i++) {
	var typeId = getRandomInt(0, stoneTypes.length - 1);
	var x = getRandomInt(1, 8);
	var y = getRandomInt(1, 11);
	while (!this.canBeDroppedToStore(typeId, x, y)) {
	    typeId = getRandomInt(0, stoneTypes.length - 1);
	    x = getRandomInt(1, 7);
	    y = getRandomInt(1, 10);
	}
	this.stonesGen.generateStone(typeId, [x, y], false);
	this.putStoreStone(typeId, x, y);
    }
    
};

Gameplay.prototype.createNewStoreStone = function() {
    var typeId = getRandomInt(0, stoneTypes.length - 1);
    var x = getRandomInt(1, 8);
    var y = getRandomInt(1, 11);
    while (!this.canBeDroppedToStore(typeId, x, y)) {
	typeId = getRandomInt(0, stoneTypes.length - 1);
	x = getRandomInt(1, 7);
	y = getRandomInt(1, 10);
    }
    this.stonesGen.generateStone(typeId, [x, y], false);
    this.putStoreStone(typeId, x, y);
};


Gameplay.prototype.canBeDropped = function(typeId, _x, _y) {

    var canDrop = true;

    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var x = (_x + stoneTypes[typeId][i * 2]);
	var y = (_y + stoneTypes[typeId][i * 2 + 1]);
	if (this.usedStones[y][x]) {
	    canDrop = false;
	    break;
	}
    }

    return canDrop;
};


Gameplay.prototype.canBeDroppedToStore = function(typeId, _x, _y) {

    var canDrop = true;

    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var x = (_x + stoneTypes[typeId][i * 2]);
	var y = (_y + stoneTypes[typeId][i * 2 + 1]);

	if (x >= 1 && x < 8 && y >= 1 && y < 11) {
	    if (this.storeStones[y][x]) {
		canDrop = false;
		break;
	    }
	} else {
	    canDrop = false;
	    break;
	}
    }

    return canDrop;
};

Gameplay.prototype.putStone = function(typeId, _x, _y, ttl) {
    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var x = (_x + stoneTypes[typeId][i * 2]);
	var y = (_y + stoneTypes[typeId][i * 2 + 1]);
	this.usedStones[y][x] = true;
    }
    if (_x === this.startOriginNotShifted[0] && _y === this.startOriginNotShifted[1]) {
    } else {
	var t = new StoneTimeout(typeId, [_x, _y], ttl, this);
	t.run();
	this.timeouts.push(t);
    }
};

Gameplay.prototype.putStoreStone = function(typeId, _x, _y) {
    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var x = (_x + stoneTypes[typeId][i * 2]);
	var y = (_y + stoneTypes[typeId][i * 2 + 1]);
	this.storeStones[y][x] = true;
    }
};


Gameplay.prototype.removeStoreStone = function(typeId, _x, _y) {
    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var x = (_x + stoneTypes[typeId][i * 2]);
	var y = (_y + stoneTypes[typeId][i * 2 + 1]);
	this.storeStones[y][x] = false;
    }
};


Gameplay.prototype.removeStone = function(typeId, _x, _y) {
    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var x = (_x + stoneTypes[typeId][i * 2]);
	var y = (_y + stoneTypes[typeId][i * 2 + 1]);
	this.usedStones[y][x] = false;
    }
    this.stonesGen.removeGameStone(typeId, [_x, _y]);
};

Gameplay.prototype.canWalkToStone = function(_x, _y) {
    return this.usedStones[_y][_x];
};

Gameplay.prototype.updateCompas = function(_x, _y){
    var dir = [];
    dir[0] = this.finishCoords[0];
    dir[1] = this.finishCoords[1];
    dir[0] -= _x;
    dir[1] -= _y;
    
    var theta = Math.atan2(dir[1],dir[0])*180/Math.PI + 90;
    var transfromString = ("rotate(" + theta+ "deg )");

    this.compasNeedle.style.webkitTransform = transfromString;
    this.compasNeedle.style.MozTransform = transfromString;
    this.compasNeedle.style.msTransform = transfromString;
    this.compasNeedle.style.OTransform = transfromString;
    this.compasNeedle.style.transform = transfromString;
};

Gameplay.prototype.gameOver = function(status) {
    if (status === "WIN") {
	if(this.level < this.levelLocker.maxLevel) this.levelLocker.unlockLevel(this.level + 1);
	
	$('#gameOver').fadeIn(500);
	$('#gameOver .win').fadeIn(2000);
	for (i = 0; i < this.timeouts.length; i++) {
	    clearInterval(this.timeouts[i].timer);
	}
    } else if (status === "LOOSE") {
	$('#gameOver').fadeIn(500);
	$('#gameOver .loose').fadeIn(2000);
	for (i = 0; i < this.timeouts.length; i++) {
	    clearInterval(this.timeouts[i].timer);
	}
    }
};

