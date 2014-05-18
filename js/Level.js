/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Creates Level design, generates stone timeouts
 * and finish coordinates acording to the difficulty
 * 
 * @param {int} _difficulty
 * @param {array} _gameCenter
 * @param {Gameplay} _gamePlay
 * @returns {Level}
 */
var Level = function(_difficulty, _gameCenter, _gamePlay) {

    if (_difficulty !== 1 && _difficulty !== 2 && _difficulty !== 3 && _difficulty !== 4) {
	_difficulty = 1;
    }

    this.difficulty = _difficulty;
    this.gameCenter = _gameCenter;
    this.gamePlay = _gamePlay;
    this.finishCoords = this.generateFinishStone();

    this.gamePlay.finishCoords = this.finishCoords;
    this.gamePlay.level = _difficulty;
    //and update compas
    this.gamePlay.updateCompas(this.gameCenter[0], this.gameCenter[1]);

    $('#currentLevel span').html(_difficulty);
    if (_difficulty < 4) {
	$('#nextLevel').attr("href", "?level=" + (_difficulty + 1));
    }else{
	$('#nextLevel').remove();
    }

};

Level.prototype.generateFinishStone = function() {
    var radius;

    var x = this.gameCenter[0];
    var y = this.gameCenter[1];
    radius = this.difficulty * 5;

    while (this.gamePlay.usedStones[y][x] && this.gameCenter[0] - x < this.difficulty * 5 - 4 && this.gameCenter[1] - y < this.difficulty * 5 - 4) {
	x = getRandomInt(this.gameCenter[0] - radius, this.gameCenter[0] + radius);
	y = getRandomInt(this.gameCenter[1] - radius, this.gameCenter[1] + radius);
    }

    var cell = $("#gameGrid [data-x='" + (x) + "'][data-y='" + (y) + "']");
    $(cell).parent('.gameCellWrapper').addClass('finish');

    return [x, y];
};

