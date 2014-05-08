/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */



/**
 *  Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 * 
 * @param {int} min
 * @param {int} max
 * @returns {int}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns variable value from GET query 
 * @param {String} variable
 * @returns {Boolean}
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
	var pair = vars[i].split("=");
	if (pair[0] === variable) {
	    return unescape(pair[1]);
	}
    }
    return false;
} 