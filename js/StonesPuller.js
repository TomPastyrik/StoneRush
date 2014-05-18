/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Handles avery Drag&Drop event of related JS API.
 * It manipulets the grid to create hover effects
 * and passes important events to Gameplay object.
 * 
 * @param {Gameplay} _gameplay
 * @returns {StonesPuller}
 */
var StonesPuller = function(_gameplay) {
    this.dragged = null;
    this.canBeDropped = true;
    this.gameplay = _gameplay;
    // stoneId:typeId
    this.stonesInStore = [];
    // stoneId:colorClass
    this.stonesInStoreColors = [];

    this.activeX;
    this.activeY;
    this.activeTTL = 10;
};

StonesPuller.prototype.dragstart = function(event) {
    this.dragged = event.target;
    event.dataTransfer.setData("Text", event.target.getAttribute('data-stoneId'));
    var stoneId = event.target.getAttribute('data-stoneId');
    this.activeX = event.target.parentNode.getAttribute('data-x');
    this.activeY = event.target.parentNode.getAttribute('data-y');
    this.activeTTL = event.target.getAttribute('data-ttl');
    var stoneParts = document.querySelectorAll('[data-stoneId=' + stoneId + ']');
    for (var i = 0; i < stoneParts.length; i++) {
	stoneParts[i].style.opacity = 0.3;
    }
    ;
};

StonesPuller.prototype.dragend = function(event) {
    // reset the transparency    
    var stoneId = event.target.getAttribute('data-stoneId');
    var stoneParts = document.querySelectorAll('[data-stoneId=' + stoneId + ']');
    for (var i = 0; i < stoneParts.length; i++) {
	stoneParts[i].style.opacity = 1.0;
    }
    ;
};

StonesPuller.prototype.dragover = function(event) {
    // prevent default to allow drop
    event.preventDefault();
};

StonesPuller.prototype.dragenter = function(event) {

    var x = parseInt(event.target.getAttribute('data-x'));
    var y = parseInt(event.target.getAttribute('data-y'));

    var typeId = this.stonesInStore[this.dragged.getAttribute('data-stoneId')];
    this.canBeDropped = this.gameplay.canBeDropped(typeId, x, y);
    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var cell = document.querySelector("#gameGrid [data-x='" + (x + stoneTypes[typeId][i * 2]) + "'][data-y='" + (y + stoneTypes[typeId][i * 2 + 1]) + "']");
	if (cell !== null) {
	    if (this.canBeDropped) {
		cell.style.background = "rgba(255,255,255,0.7)";
	    } else {
		cell.style.background = "rgba(255,0,0,1.0)";
	    }
	    cell.setAttribute('data-hoveredBy', 'c' + x + y);
	}
    }
};


StonesPuller.prototype.dragleave = function(event) {
    var x = parseInt(event.target.getAttribute('data-x'));
    var y = parseInt(event.target.getAttribute('data-y'));

    var typeId = this.stonesInStore[this.dragged.getAttribute('data-stoneId')];
    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var cell = document.querySelector("#gameGrid [data-x='" + (x + stoneTypes[typeId][i * 2]) + "'][data-y='" + (y + stoneTypes[typeId][i * 2 + 1]) + "']");
	if (cell !== null) {
	    if (cell.getAttribute('data-hoveredBy') === 'c' + x + y) {
		cell.style.background = "";
	    }
	}
    }
};

StonesPuller.prototype.drop = function(event) {
    event.preventDefault();



    var stoneId = event.dataTransfer.getData("Text");
    var stoneParts = document.querySelectorAll('[data-stoneId=' + stoneId + ']');

    if (this.canBeDropped) {
	for (var i = 0; i < stoneParts.length; i++) {
	    stoneParts[i].parentNode.removeChild(stoneParts[i]);
	}
    }
    var x = parseInt(event.target.getAttribute('data-x'));
    var y = parseInt(event.target.getAttribute('data-y'));

    var typeId = this.stonesInStore[this.dragged.getAttribute('data-stoneId')];
    for (var i = 0; i < stoneTypes[typeId].length / 2; i++) {
	var cell = document.querySelector("#gameGrid [data-x='" + (x + stoneTypes[typeId][i * 2]) + "'][data-y='" + (y + stoneTypes[typeId][i * 2 + 1]) + "']");
	if (this.canBeDropped) {
	    cell.setAttribute('class', 'gameCell stoned ' + this.stonesInStoreColors[stoneId]);
	}
	cell.style.background = "";

    }
    if (this.canBeDropped === false) {
	return false;
    } else {
	this.gameplay.putStone(typeId, x, y, this.activeTTL);
	this.gameplay.removeStoreStone(typeId, parseInt(this.activeX), parseInt(this.activeY));
	this.gameplay.createNewStoreStone();
    }
};
