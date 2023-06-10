const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();

function resizeCanvas() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight - 80;
}

let raf;

function newball(x, y, vx, vy, radius, color){
    const ball = {
        x: x,
        y: y,
        vx: vx,
        vy: vy,
        radius: radius,
        color: color,
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
        },
    };
    return ball;
}

function randint(min, max) { // min and max included 
    let calc = Math.floor(Math.random() * (max - min + 1) + min);
    while(calc==0)calc = randint(min, max);
    return calc;
}

function randomnewball() {
    let radius = randint(50, Math.max(60, Math.min(canvas.width,canvas.height)/6));
    let margin = radius+10;
    return newball(randint(margin, canvas.width-margin),
                   randint(margin, canvas.height-margin),
                   randint(-12, 12),
                   randint(-12, 12),
                   radius,
                   "#27a3a9");
}

let balls = [
    randomnewball(),
    randomnewball(),
    randomnewball(),
    randomnewball(),
    randomnewball()
];

setInterval(addballs, 4000);

function addballs( )
{
    if(balls.length<100){
        balls.push(randomnewball());
        balls.push(randomnewball());
        balls.push(randomnewball());
        balls.push(randomnewball());
        balls.push(randomnewball());
    }
}

function globaldraw() {
  ctx.fillStyle = "rgba(16, 37, 38, 1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  balls.forEach(ball => {
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy *= 0.99;
    ball.vy += 0.25;

    if (ball.y + ball.vy + ball.radius > canvas.height || ball.y + ball.vy - ball.radius < 0) {
        ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx + ball.radius > canvas.width || ball.x + ball.vx - ball.radius < 0) {
        ball.vx = -ball.vx;
    }
    ball.radius *= 0.995;
    if(ball.radius<0.2){
        ball.radius=0;
    }
  });
  raf = window.requestAnimationFrame(globaldraw);
}

balls.forEach(ball => ball.draw());
raf = window.requestAnimationFrame(globaldraw);