/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */


/**
 * 
 * @param {int} width
 * @param {int} height
 * @param {DOMelement} parent
 * @returns {SVGBorder}
 */
var SVGBorder = function(width, height, parent) {
    this.parentElement = parent;
    this.width = width;
    this.height = height;
    this.svgns = "http://www.w3.org/2000/svg";

    this.build();
};


SVGBorder.prototype.build = function() {
    var svg = document.createElementNS(this.svgns, "svg");
    svg.setAttribute('width', this.width);
    svg.setAttribute('height', this.height);
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
    this.parentElement.appendChild(svg);

    var svgDocument = svg.ownerDocument;
    
    
    // Lines
    var line = svgDocument.createElementNS(this.svgns, "path");
    line.setAttributeNS(null, "d", "M " + 6 + " " + 6 +
            " l " + (6 + (this.width - 18)) + " " + 0 + 
            " l " +  0 + " " +(6 + (this.height - 18))+
            " l " + (-(this.width - 12)) + " " + 0 + 
            " l " +  0 + " " +(6 + -(this.height - 12))
            );
    line.setAttributeNS(null, "stroke", "white");
    line.setAttributeNS(null, "stroke-width", 3);
    line.setAttributeNS(null, "fill", "none");
    line.setAttributeNS(null, "stroke-dasharray", "2,2");
    svg.appendChild(line);
    
    
    // Rects
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 2; j++) {
            var rect = svgDocument.createElementNS(this.svgns, "rect");
            rect.setAttributeNS(null, "x", 1 + i * (this.width - 12));
            rect.setAttributeNS(null, "y", 1 + j * (this.height - 12));
            rect.setAttributeNS(null, "width", 10);
            rect.setAttributeNS(null, "height", 10);
            rect.setAttributeNS(null, "fill", "#990000");
            rect.setAttributeNS(null, "stroke", "#fff");
            rect.setAttributeNS(null, "stroke-width", "1.5");
            svg.appendChild(rect);
        }
    }


};

