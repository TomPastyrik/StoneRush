/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Object generates stones to the store
 * grid. It depends on Gameplay object
 * which needs to be injected to StonesGenerator
 * after it's creation.
 * 
 * @returns {StonesGenerator}
 */
var StonesGenerator = function() {
    this.stonesCounter = 0;
    this.stonePartsCounter = 0;
    this.stonesPuller = null;
    this.gameplay = null;
};

StonesGenerator.prototype.generateStone = function(type, coords, initial) {
    var randColorIndex = getRandomInt(0, 9);
    if (!initial) {
	this.putStone(type, coords, this.stonesCounter, stoneColors[randColorIndex]);
    } else {
	this.putInitialStone(type, coords, this.stonesCounter, stoneColors[randColorIndex]);
    }
    this.stonesCounter++;
};

StonesGenerator.prototype.putInitialStone = function(typeId, coords, stoneId, color) {

    var x = coords[0];
    var y = coords[1];
    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var cell = document.querySelector("#gameGrid [data-x='" + (x + stoneTypes[typeId][i * 2]) + "'][data-y='" + (y + stoneTypes[typeId][i * 2 + 1]) + "']");
	cell.setAttribute('class', 'gameCell stoned ' + color);
    }

};

StonesGenerator.prototype.putStone = function(typeId, coords, stoneId, color) {

    var ttl = getRandomInt(5, 5 + 40/this.gameplay.level);
    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var cell = document.querySelector("#storeGrid [data-x='" + (coords[0] + stoneTypes[typeId][i * 2]) + "'][data-y='" + (coords[1] + stoneTypes[typeId][i * 2 + 1]) + "']");
	var stone = document.createElement('div');
	stone.setAttribute('class', 'gameStone ' + color);
	stone.setAttribute('data-stoneId', 's' + stoneId);
	stone.setAttribute('data-ttl', ttl);
	stone.setAttribute('id', 'sp' + this.stonePartsCounter);
	cell.appendChild(stone);
	if (i === 1) {
	    var timerElement = document.createElement('div');
	    timerElement.setAttribute('class', 'timer');
	    timerElement.innerHTML = ttl;
	    $(stone).append(timerElement);
	}
	if (i === 0) {
	    this.registerStone(stone);
	}

	this.stonePartsCounter++;
    }

    this.stonesPuller.stonesInStore['s' + stoneId] = typeId;
    this.stonesPuller.stonesInStoreColors['s' + stoneId] = color;

};

StonesGenerator.prototype.removeGameStone = function(typeId, coords) {

    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var cell = document.querySelector("#gameGrid [data-x='" + (coords[0] + stoneTypes[typeId][i * 2]) + "'][data-y='" + (coords[1] + stoneTypes[typeId][i * 2 + 1]) + "']");
	cell.setAttribute('class', 'gameCell');
	while (cell.firstChild) {
	    cell.removeChild(cell.firstChild);
	}
    }

};

StonesGenerator.prototype.registerStone = function(stone) {
    stone.addEventListener('dragstart', this.stonesPuller.dragstart.bind(this.stonesPuller), false);
    stone.addEventListener('dragend', this.stonesPuller.dragend, false);
    stone.setAttribute('draggable', true);
};
