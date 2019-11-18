'use strict';

const $ = function (foo) {
    return document.getElementById(foo);    // get element by id
}

//SVG Object
const SVG = {    
    NS: "http://www.w3.org/2000/svg",
    init: function(id, boxw, boxh, bg) {
        this.loc = $(id); //location
        this.width = boxw;
        this.height = boxh;
        this.backgroundColor = bg;
        this.svgid = null;
    },
    getLoc: function() {
        return this.id;
    },
    getId: function() {
        return this.svgid;
    },
    setId: function(id) {
        this.svgid = id;        // returns an object, not an html id
    },
    
    toDOM: function() {
        let svg = document.createElementNS(this.NS, 'svg');
        svg.setAttributeNS(null, 'id', 'svg1');
        svg.setAttributeNS(null, 'width', this.width);
        svg.setAttributeNS(null, 'height', this.height);
        svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
        svg.setAttributeNS(null, 'style', 'background-color: ' + this.backgroundColor);
        this.loc.appendChild(svg);
        this.setId($('svg1'));
    }
};

const Shape = {
    NS: "http://www.w3.org/2000/svg",    
    initinit(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    }
};

const Rect = {    
    init(x, y, width, height, color, rx = 0, ry = 0) {
        this.width = width;
        this.height = height;
        this.rx = rx;
        this.ry = ry;
        this.initinit(x, y, color);
    },
    draw() {
        let shape = document.createElementNS(this.NS, 'rect');
        shape.setAttributeNS(null, 'x', this.x);
        shape.setAttributeNS(null, 'y', this.y);
        shape.setAttributeNS(null, 'width', this.width);
        shape.setAttributeNS(null, 'height', this.height);
        shape.setAttributeNS(null, 'fill', this.color);
        shape.setAttributeNS(null, 'rx', this.rx);
        shape.setAttributeNS(null, 'ry', this.ry);
        return shape;
    }
};
Object.setPrototypeOf( Rect, Shape );

const Circle = {
    init(x, y, r, color) {
        this.r = r;
        this.initinit(x, y, color);
    },
    draw() {
        let shape = document.createElementNS(this.NS, 'circle');
        shape.setAttributeNS(null, 'cx', this.x);
        shape.setAttributeNS(null, 'cy', this.y);
        shape.setAttributeNS(null, 'r', this.r);
        shape.setAttributeNS(null, 'fill', this.color);
        return shape;
    }
};
Object.setPrototypeOf( Circle, Shape );


const Ellipse = {
    init(x, y, rx, ry, color) {
        this.rx = rx;
        this.ry = ry;
        this.initinit(x, y, color);
    },
    draw() {
        let shape = document.createElementNS(this.NS, 'ellipse');
        shape.setAttributeNS(null, 'cx', this.x);
        shape.setAttributeNS(null, 'cy', this.y);
        shape.setAttributeNS(null, 'rx', this.rx);
        shape.setAttributeNS(null, 'ry', this.ry);
        shape.setAttributeNS(null, 'fill', this.color);
        return shape;
    }
};
Object.setPrototypeOf( Ellipse, Shape );


const Star = {
    init(x, y, vertices, startangle, factor, color) {
        this.vertices = vertices;
        this.startangle = startangle;
        this.factor = factor;
        this.initinit(x, y, color);
        this.calcCorners();
        console.log(this.corners);
    },

    corners: [],
    calcCorners() {
        let angle = this.startangle;
        let i = 0;
        while(i < this.vertices) {  
            let vertex = {
                x: Math.cos(angle) * this.factor + this.x,
                y: Math.sin(angle) * this.factor + this.y
            }
            this.corners.push(vertex);
            angle += 2 * Math.PI / this.vertices
            i += 1;
        }
    },
    
    draw() {
        let ns = this.NS;
        let shape = document.createElementNS(ns, 'polygon');
        let s = 'M' + this.corners[0].x + ' ' + this.corners[0].y;
        s += ' ' + 'h' + Math.abs(this.corners[this.vertices -1].x - this.corners[1].x);
        let i = 2;
        while(i < this.vertices) {
            s += this.corners[i].x + ' ' + this.corners[i].y + ' ';
            s += this.corners[(i+2)%this.vertices].x + ' ' + this.corners[(i+2)%this.vertices].y + ' ';
            i++;
        }
        shape.setAttribute('points', s+'z');
        shape.setAttribute('fill', this.color);
        return shape;
    }
};
Object.setPrototypeOf( Star, Shape );
