var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

var player = {
    x: 100,
    y: 800,
    width: 50, 
    height: 50,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Obstacle {
    constructor() {
        this.x = 500;
        this.y = 800;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

var obstacle = new Obstacle;
obstacle.draw();

// 프레임마다 실행할 함수
function frame() {
    requestAnimationFrame(frame);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    player.draw();
    player.x++;
    
}
frame();