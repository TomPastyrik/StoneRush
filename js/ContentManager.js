/**
 * This file is part of semestral assigment for
 * for A0M33KAJ course at CTU, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * Content Manager handles history api and related changes in DOM
 * @returns {ContentManager}
 */
var ContentManager = function() {
    if (typeof history.pushState === 'undefined') {
        console.log('History api load failed');
    } else {
        console.log('HTML5 History API available');

        window.addEventListener('popstate', this.updateContentPopState.bind(this));

        this.registerLink("#rulesLink");
        this.registerLink("#creditsLink");


        //navigate to content if permalink
        var hash = window.location.hash;
        if (hash.length > 1) {
            hash = hash.substr(2);
            var data = {page: hash};
            this.chooseContent(data);
        }
    }
};



ContentManager.prototype.getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

ContentManager.prototype.registerLink = function(link) {
    $(link).click(this.processClickedLink.bind(this));
};

ContentManager.prototype.processClickedLink = function(event) {
    var title;
    event.preventDefault();
    if (event.target.nodeName === 'A') {
        title = event.target.innerHTML;
        var l = this.getLocation(window.location.href);
        var data = {page: event.target.hash.substr(1)};
        history.pushState(data, title, l.pathname + "#!" + event.target.hash.substr(1));
        this.chooseContent(data);
    }
};

ContentManager.prototype.updateContentPopState = function(event) {
    this.chooseContent(event.state);
};

ContentManager.prototype.chooseContent = function(state) {
    if (state === null) { // Default homepage
        $('.overlay').fadeOut(500);
    } else {
        $('.overlay').fadeOut(500);
        switch (state.page) {
            case "rules":
                $('#rules').fadeIn(500);
                break;
            case "credits":
                $('#credits').fadeIn(500);
                break;
        }
    }
};