/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Creates the game grid in DOM. Also is attaching event listeners
 * to all cells via StonesPuller.
 * 
 * @param {array} _startOrigin
 * @param {int} gridWidth
 * @param {int} gridHeight
 * @returns {GridInitializer}
 */
var GridInitializer = function(_startOrigin, gridWidth, gridHeight) {
    this.width = gridWidth;
    this.height = gridHeight;
    this.storeWidth = 8;
    this.storeHeight = 11;
    this.stonesPuller = null;
    this.startOrigin = [0, 0];
    this.startOrigin[0] = _startOrigin[0];
    this.startOrigin[1] = _startOrigin[1];
    this.startOrigin[1] -= 2;
};

GridInitializer.prototype.resizeViewport = function() {

    var element = document.getElementById('gameViewport');

    var height = 0;
    var body = window.document.body;
    if (window.innerHeight) {
	height = window.innerHeight;
    } else if (body.parentElement.clientHeight) {
	height = body.parentElement.clientHeight;
    } else if (body && body.clientHeight) {
	height = body.clientHeight;
    }


    element.style.height = ((488) + "px");
};

GridInitializer.prototype.createGamePlan = function() {

    var conteiner = document.querySelector('#gameGrid');
    for (var y = 1; y <= this.height; y++) {
	for (var x = 1; x <= this.width; x++) {
	    var cell = document.createElement('div');

	    cell.setAttribute('class', 'gameCell');


	    var wrap = document.createElement('div');
	    wrap.setAttribute('class', 'gameCellWrapper');
	    wrap.appendChild(cell);


	    conteiner.appendChild(wrap);
	    cell.setAttribute('data-x', x);
	    cell.setAttribute('data-y', y);

	    cell.addEventListener('drop', this.stonesPuller.drop.bind(this.stonesPuller), false);
	    cell.addEventListener('dragenter', this.stonesPuller.dragenter.bind(this.stonesPuller), false);
	    cell.addEventListener('dragover', this.stonesPuller.dragover, false);
	    cell.addEventListener('dragleave', this.stonesPuller.dragleave.bind(this.stonesPuller), false);
	}
    }
};

GridInitializer.prototype.createGameStore = function() {

    var conteiner = document.querySelector('#storeGrid');

    for (var i = 1; i <= this.storeHeight; i++) {
	for (var j = 1; j <= this.storeWidth; j++) {
	    var cell = document.createElement('div');
	    cell.setAttribute('class', 'gameCell');
	    conteiner.appendChild(cell);
	    cell.setAttribute('data-x', j);
	    cell.setAttribute('data-y', i);
	}
    }
};