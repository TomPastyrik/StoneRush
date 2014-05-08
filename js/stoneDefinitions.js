/** 
 * This file is part of semestral assigment
 * STONE RUSH GAME for A0M33KAJ course
 * at CTU FEE, 2014
 * 
 * @author Tom Pastýřík <mail@tomaspastyrik.cz>
 */



stoneColors = [
    'red',
    'yellowOrange',
    'yellow',
    'peaGreen',
    'green',
    'cyan',
    'cyanBlue',
    'blueViolet',
    'violetMagenta',
    'magenta'
];

stoneTypes = [
    [
        0, 0, // X
        0, 1, // XX
        0, 2, // X
        1, 1
    ],
    [
        0, 0, // XXX
        1, 0, //  X
        2, 0,
        1, 1
    ],
    [
        0, 0, //  X
        1, 1, // XX
        1, 2, //  X
        1, 0
    ],
    [
        0, 0,
        1, 1, //  X
        2, 1, // XXX
        1, 0
    ],
    [
        0, 0,
        -1, 0,
        1, 0, 
        0, -1,
	0, 1
    ],
    [
        0, 0,
        -1, -1, 
        1, 0, 
        0, -1,
	1, 1
    ],
    [
        0, 0,
        -1, -1,
        1, 1,
        0, -1,
	0, 1
    ],
    [
        0, 0,
        -1, 1, 
        1, -1, 
        0, -1,
	0, 1
    ],
    [
        0, 0,
        -1, 1,
        -1, -1, 
        0, -1,
	0, 1
    ],
    [
        0, 0,
        1, 1, 
        1, -1, 
        0, -1,
	0, 1
    ]
];

