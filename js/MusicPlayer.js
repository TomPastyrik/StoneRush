var MusicPlayer = function() {
    this.player = document.getElementById('player');
    this.controls = document.getElementById('controls');
    this.player.addEventListener("ended", function() {
	this.play();
    });


    this.randomStart = this.player.duration - Math.random() * this.player.duration;
    this.player.currentTime = this.randomStart;
    this.createControls();


    this.player.play();
};

MusicPlayer.prototype.createControls = function() {

    var play = document.createElement("button");
    play.innerHTML = "play";
    play.addEventListener('click', this.player.play.bind(this.player));
    this.controls.appendChild(play);


    var pause = document.createElement("button");
    pause.innerHTML = "pause";
    pause.addEventListener('click', this.player.pause.bind(this.player));
    this.controls.appendChild(pause);


    var volume = document.getElementById("volume");
    volume.addEventListener('change', this.changeVolume.bind(this));
    var volval = localStorage.getItem("volume");
    if (volval === null) {
	volval = localStorage.setItem("volume", 0.5);
	volval = localStorage.getItem("volume");
    }
    volume.value = volval;
    this.player.volume = volval;
};

MusicPlayer.prototype.changeVolume = function(e) {
    this.player.volume = e.target.value;
    localStorage.setItem("volume", e.target.value);
};