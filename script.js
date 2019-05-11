/**
 * If set to false, colors are darkened.
 * 
 * @type {Boolean}
 */
 var makeLighter = true;

 document.addEventListener("DOMContentLoaded", function(){
    doSomething();
    
});

 function doSomething() {
    var colors = readInput();
    makeLighter = document.getElementById('darker_or_lighter').checked;

    showOutput(colors);

    console.log(1);
}

function readInput() {
    var input = document.getElementById('input').value; 

    input = input.replace(/ /g,''); // Remove spaces.
    input = input.replace(/rgb\(/g, '');
    input = input.replace(/\)/g, '');
    input = input.replace(/;/g, ',');

    var inputLines = input.split(/\r\n|\n|\r/);

    var colors = [];
    var i;
    var lineCount = inputLines.length;
    var lineSpl = [];
    var line = '';
    for (i = 0; i < lineCount; i++) {
        line = inputLines[i].trim();

        if (line.startsWith('#')) {
            colors[i] = hexToRgb(line);
        } else {
            lineSpl = line.split(',');
            if (lineSpl.length == 3) {
                var color = new Color();
                color.red = lineSpl[0].trim();
                color.green = lineSpl[1].trim();
                color.blue = lineSpl[2].trim();
                colors[i] = color;
            }
        }

        
    }
    return colors;
}

function showOutput(colors) {
    var outputElement = document.getElementById('output');
    var steps = document.getElementById('steps').value;
    
    // Empty the table.
    while (outputElement.firstChild) {
        outputElement.firstChild.remove();
    }

    var trHead1 = document.createElement('tr');
    var trHead2 = document.createElement('tr');
    for (a = 0; a < steps; a++) {
        var td1 = document.createElement('td');
        td1.textContent = a;
        trHead1.appendChild(td1);

        var td2 = document.createElement('td');
        td2.textContent = parseInt(100 / steps * a) + '%';
        trHead2.appendChild(td2);
    }
    outputElement.appendChild(trHead1);
    outputElement.appendChild(trHead2);

    var i;
    var color = null;
    var colorCount = colors.length;

    var redIncrease, greenIncrease, blueIncrease;
    var newRed, newGreen, newBlue;

    // Do for each color.
    for (i = 0; i < colorCount; i++) {
        var tr = document.createElement('tr');
        color = colors[i];

        // Do as many times as requested.
        for (a = 0; a < steps; a++) {

            redIncrease = parseInt(calculateColorIncrease(color.red, a, steps));
            greenIncrease = parseInt(calculateColorIncrease(color.green, a, steps));
            blueIncrease = parseInt(calculateColorIncrease(color.blue, a, steps));

            newRed = parseInt(color.red) + redIncrease;
            newGreen = parseInt(color.green) + greenIncrease;
            newBlue = parseInt(color.blue) + blueIncrease;

            var td = document.createElement('td');
            td.textContent = newRed + ',' + newGreen + ',' + newBlue;
            td.style.backgroundColor = 'rgb(' + newRed + ', ' + newGreen + ', ' + newBlue + ')';
            tr.appendChild(td);
        }

        outputElement.appendChild(tr);
    }  
}

/**
 * Convert a hexadecimal color to RGB.
 */
 function hexToRgb(hex) {

    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var color = new Color();
    color.red = parseInt(result[1], 16);
    color.green = parseInt(result[2], 16);
    color.blue = parseInt(result[3], 16);
    return color;
}

function calculateColorIncrease(currentValue, step, steps) {
    if (makeLighter) {
        var remaining = 255 - currentValue;
        return remaining / steps * step;
    } else {
        return -currentValue / steps * step;
    }
}

function Color () {
    this.red = 0;
    this.green = 0;
    this.blue = 0;
}