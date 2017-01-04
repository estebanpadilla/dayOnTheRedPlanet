window.addEventListener('load', init, false);

function init() {
    console.log('init');

    var canvas = undefined;
    var context = undefined;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var x = (width / 2) + 100;
    var y = 500;
    var radius = 500;

    canvas = createCanvas(0, 0, width, height);
    context = canvas.getContext('2d');

    context.strokeStyle = 'red';
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
    context.closePath();

    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
    context.closePath();

    var degree = 90;

    function update() {

        context.clearRect(0, 0, width, height);


        degree -= 0.15;
        var radians = degree * Math.PI / 180;
        var o = ((Math.sin(radians) * radius) + y);
        var a = ((Math.cos(radians) * radius) + x);
        var sunPoint = { x: a, y: o };

        var mountainPoint = { x: (x + 80), y: (y - 100) };

        var a1 = Math.abs(mountainPoint.x - sunPoint.x);
        var o1 = Math.abs(mountainPoint.y - sunPoint.y);
        var tan1 = Math.atan2(o1, a1);
        var degree2 = tan1 * 180 / Math.PI;

        var sin2 = degree2 * Math.PI / 180;

        var radians2 = (radians + (Math.PI));
        var a3 = (Math.abs((Math.cos(radians2) * radius) + mountainPoint.x));
        var o3 = Math.abs((Math.sin(radians2) * radius) + mountainPoint.y);
        // a3 -= (x - mountainPoint.x);
        // o3 -= (y - mountainPoint.y);
        var shadowPoint = { x: a3, y: o3 };

        context.beginPath();
        context.fillStyle = '#fbf5b3';
        context.strokeStyle = '#f9ef69';
        context.lineWidth = 200;
        context.arc(sunPoint.x, sunPoint.y, 250, 0, Math.PI * 2, false);
        context.closePath();
        context.stroke();
        context.fill();

        context.beginPath()
        context.fillStyle = 'orangered';
        context.fillRect(0, y, width, height);
        context.closePath();
        context.fill();

        context.beginPath();
        context.fillStyle = 'orangered'
        context.moveTo(x, y);
        context.lineTo(mountainPoint.x, mountainPoint.y);
        context.lineTo((mountainPoint.x + 20), y);
        context.fill();
        context.closePath();


        if (shadowPoint.y > y) {

            context.beginPath();
            context.fillStyle = '#2b0d3b';
            context.moveTo(x, y);
            context.lineTo(shadowPoint.x, shadowPoint.y);
            context.lineTo((mountainPoint.x + 20), y);
            // context.arc(shadowPoint.x, shadowPoint.y, 4, 0, Math.PI * 2, false);
            context.fill();
            context.closePath();
        }

        requestAnimationFrame(update);
    }

    update();

    var text = document.createElement('h1');
    document.body.appendChild(text);
    text.className = 'mytext';
    text.innerHTML = "A day on the red planet.";
}

function createCanvas(x, y, width, height) {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = '#2b0d3b';
    return canvas;
}