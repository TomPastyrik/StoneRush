/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Handles any key input and passes it
 * to hero. Library keydrown is used
 * to solve 'onKeyDown' delay. 
 * 
 * Keydrown hides itself behind 'kd' namespace.
 * 
 * @param {Hero} _hero
 * @returns {InputHandler}
 */
var InputHandler = function(_hero) {

    this.hero = _hero;

    kd.W.up(this.leaveUP.bind(this));
    kd.S.up(this.leaveDOWN.bind(this));
    kd.A.up(this.leaveLEFT.bind(this));
    kd.D.up(this.leaveRIGHT.bind(this));
    
    kd.W.down(this.handleUP.bind(this));
    kd.S.down(this.handleDOWN.bind(this));
    kd.A.down(this.handleLEFT.bind(this));
    kd.D.down(this.handleRIGHT.bind(this));

};

InputHandler.prototype.handleUP = function() {
    this.hero.move('up');
};

InputHandler.prototype.handleDOWN = function() {
    this.hero.move('down');
};

InputHandler.prototype.handleLEFT = function() {
    this.hero.move('left');
};

InputHandler.prototype.handleRIGHT = function() {
    this.hero.move('right');
};


InputHandler.prototype.leaveUP = function() {
    this.hero.stop('up');
};

InputHandler.prototype.leaveDOWN = function() {
    this.hero.stop('down');
};

InputHandler.prototype.leaveLEFT = function() {
    this.hero.stop('left');
};

InputHandler.prototype.leaveRIGHT = function() {
    this.hero.stop('right');
};
