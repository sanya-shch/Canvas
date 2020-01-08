const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = 800;
canvas.height = 600;
// canvas.width = window.innerWidth;


// // fillRect()
// ctx.fillStyle = 'red';
// ctx.fillRect(20, 20, 150, 100);
// ctx.fillStyle = 'blue';
// ctx.fillRect(200, 20, 150, 100);
//
// // strokeRect()
// ctx.lineWidth = 5;
// ctx.strokeStyle = 'green';
// ctx.strokeRect(380, 20, 150, 100);
//
// // clearRect()
// ctx.clearRect(25, 25, 130, 80);
//
// // fillText()
// ctx.font = '30px Arial';
// ctx.fillStyle = 'purple';
// ctx.fillText('Hello World', 550, 50);
//
// // stokeText()
// ctx.lineWidth = 1;
// ctx.strokeStyle = 'orange';
// ctx.strokeText('Hello World', 550, 100);



// Paths ****************************************

// // Triangle
// ctx.beginPath();
// ctx.moveTo(50, 50);
// ctx.lineTo(150, 50);
// ctx.lineTo(100, 200);
// ctx.lineTo(50, 50);
// // ctx.closePath();
// ctx.fillStyle = 'coral';
// ctx.fill();
// // ctx.stroke();
//
// ctx.beginPath();
// ctx.moveTo(200, 50);
// ctx.lineTo(150, 200);
// ctx.lineTo(250, 200);
// ctx.closePath();
// ctx.stroke();
//
// // Rectangle
// ctx.beginPath();
// ctx.rect(300, 50, 150, 100);
// ctx.fillStyle = 'teal';
// ctx.fill();


// Arc (circles) ****************************************

// ctx.beginPath();
//
// const centerX = canvas.width / 2;
// const centerY = canvas.height / 2;
//
// // Draw head
// ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
//
// // Move to mouth
// ctx.moveTo(centerX + 100, centerY);
//
// // Draw mouth
// ctx.arc(centerX, centerY, 100, 0, Math.PI, false);
//
// // Move left eye
// ctx.moveTo(centerX - 60, centerY - 80);
//
// // Draw left eye
// ctx.arc(centerX - 80, centerY - 80, 20, 0, Math.PI * 2);
//
// // Move to right eye
// ctx.moveTo(centerX + 100, centerY - 80);
//
// // Draw right eye
// ctx.arc(centerX + 80, centerY - 80, 20, 0, Math.PI * 2);
//
// ctx.stroke();


// // Quadratic curve
// ctx.beginPath();
// ctx.moveTo(75, 25);
// ctx.quadraticCurveTo(25, 25, 25, 62.5);
// ctx.quadraticCurveTo(25, 100, 50, 100);
// ctx.quadraticCurveTo(50, 120, 30, 125);
// ctx.quadraticCurveTo(60, 120, 65, 100);
// ctx.quadraticCurveTo(125, 100, 125, 62.5);
// ctx.quadraticCurveTo(125, 25, 75, 25);
// ctx.stroke();


// ctx.beginPath();
// ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
// ctx.moveTo(110, 75);
// ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
// ctx.moveTo(65, 65);
// ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
// ctx.moveTo(95, 65);
// ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
// ctx.stroke();


// for (var i = 0; i < 4; i++) {
//     for (var j = 0; j < 3; j++) {
//         ctx.beginPath();
//         var x = 25 + j * 50; // x coordinate
//         var y = 25 + i * 50; // y coordinate
//         var radius = 20; // Arc radius
//         var startAngle = 0; // Starting point on circle
//         var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
//         var anticlockwise = i % 2 !== 0; // clockwise or anticlockwise
//
//         ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
//
//         if (i > 1) {
//             ctx.fill();
//         } else {
//             ctx.stroke();
//         }
//     }
// }



// Animation 1 ****************************************

// const circle = {
//   x: 200,
//   y: 200,
//   size: 30,
//   dx: 5,
//   dy: 4
// };
//
// function drawCircle() {
//   ctx.beginPath();
//   ctx.arc(circle.x, circle.y, circle.size, 0, Math.PI * 2);
//   ctx.fillStyle = 'purple';
//   ctx.fill();
// }
//
// function update() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//   drawCircle();
//
//   // change position
//   circle.x += circle.dx;
//   circle.y += circle.dy;
//
//   // Detect side walls
//   if (circle.x + circle.size > canvas.width || circle.x - circle.size < 0) {
//     circle.dx *= -1;
//   }
//
//   // Detect top and bottom walls
//   if (circle.y + circle.size > canvas.height || circle.y - circle.size < 0) {
//     circle.dy *= -1;
//   }
//
//   requestAnimationFrame(update);
// }
//
// update();


// Animation 2 - Character ****************************************

const image = document.getElementById('source');

const player = {
    w: 50,
    h: 70,
    x: 20,
    y: 200,
    speed: 10,
    dx: 0,
    dy: 0
};

function drawPlayer() {
    ctx.drawImage(image, player.x, player.y, player.w, player.h);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    player.x += player.dx;
    player.y += player.dy;

    detectWalls();
}

function detectWalls() {
    // Left wall
    if (player.x < 0) {
        player.x = 0;
    }

    // Right Wall
    if (player.x + player.w > canvas.width) {
        player.x = canvas.width - player.w;
    }

    // Top wall
    if (player.y < 0) {
        player.y = 0;
    }

    // Bottom Wall
    if (player.y + player.h > canvas.height) {
        player.y = canvas.height - player.h;
    }
}

function update() {
    clear();
    drawPlayer();
    newPos();
    requestAnimationFrame(update);
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'Right') {
        player.dx = player.speed;
    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        player.dx = -player.speed;
    } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        player.dy = -player.speed;
    } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        player.dy = player.speed;
    }
}

function keyUp(e) {
    if (
        e.key === 'Right' ||
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft' ||
        e.key === 'Up' ||
        e.key === 'ArrowUp' ||
        e.key === 'Down' ||
        e.key === 'ArrowDown'
    ) {
        player.dx = 0;
        player.dy = 0;
    }
}

update();

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

