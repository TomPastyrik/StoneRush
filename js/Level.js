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
var Level = function(_difficulty,_maxLevel, _gameCenter, _gamePlay) {
    
    var levelOk = false;
    console.log(_difficulty, _maxLevel);
    for (var i = 1; i <= _maxLevel; i++) {
	if(i == _difficulty){ levelOk = true; break;}
    }
    if(!levelOk) _difficulty = 1;
    
    this.maxLevel = _maxLevel;
    this.difficulty = _difficulty;
    this.gameCenter = _gameCenter;
    this.gamePlay = _gamePlay;
    this.finishCoords = this.generateFinishStone();

    this.gamePlay.finishCoords = this.finishCoords;
    this.gamePlay.level = _difficulty;
    //and update compas
    this.gamePlay.updateCompas(this.gameCenter[0], this.gameCenter[1]);

    $('#currentLevel span').html(_difficulty);
    if (_difficulty < this.maxLevel) {
	$('#nextLevel').attr("href", "?level=" + (_difficulty + 1));
    }else{
	$('#nextLevel').remove();
    }

};

Level.prototype.generateFinishStone = function() {
    var minRadius;
    var maxRadius;

    var x = this.gameCenter[0];
    var y = this.gameCenter[1];
    minRadius = Math.round((this.difficulty-1) * 2.5);
    maxRadius = Math.round(this.difficulty * 2.5);

    while (this.gamePlay.usedStones[y][x] && x > 0 && x <= this.gamePlay.gridWidth && y > 0 && y <= this.gamePlay.gridHeight) {
	x = this.gameCenter[0] + getRandomSign() * getRandomInt(minRadius, maxRadius);
	y = this.gameCenter[1] + getRandomSign() * getRandomInt(minRadius, maxRadius);
    }

    var cell = $("#gameGrid [data-x='" + (x) + "'][data-y='" + (y) + "']");
    $(cell).parent('.gameCellWrapper').addClass('finish');

    return [x, y];
};

