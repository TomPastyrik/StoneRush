/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Initializer of the game and all necessary objects.
 * It also selects current level from url and initializes
 * HUD.
 * 
 * @returns {StoneRushGame}
 */
var StoneRushGame = function() {
    // CONFIG
    this.startCoords = [25, 25];
    this.gridWidth = 50;
    this.gridHeight = 50;

    gameGridElement = document.getElementById('gameGrid');
    GameGrid = new GameGrid(); //GLOBAL on purpose

    this.sg = new StonesGenerator();
    this.gp = new Gameplay(this.startCoords, this.gridWidth, this.gridHeight, this.sg);
    this.sp = new StonesPuller(this.gp);
    this.sg.stonesPuller = this.sp;
    MyHero = new Hero(this.gp, this.startCoords);
    this.gi = new GridInitializer(this.startCoords, this.gridWidth, this.gridHeight);
    this.gi.stonesPuller = this.sp;
    this.ih = new InputHandler(MyHero);
    this.gi.resizeViewport();
    this.gi.createGamePlan();
    this.gi.createGameStore();
    
};


StoneRushGame.prototype.start = function() {
    var l = parseInt(getQueryVariable("level"));
    if (l !== 1 && l !== 2 && l !== 3 && l !== 4) {
        l = 1;
    }

    this.gp.level = l;

    this.gp.initGame();

    this.level = new Level(l, this.startCoords, this.gp);


    animator = new HeroAnimator(MyHero); // GLOBAL on purpose
    animator.init();
    
    this.initializeHUD();
};

StoneRushGame.prototype.initializeHUD = function() {
    var string = "";
    for (i = 0; i < 10; i++) {
        string += 'You have <span class="loose">NOT</span> beaten the dark forces! ';
    }
    var el = document.querySelector('.starWarsText p');
    el.innerHTML = string;
};