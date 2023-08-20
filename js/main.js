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

var obstacles = [];
var timer = 0;

// 프레임마다 실행할 함수
function frame() {
    requestAnimationFrame(frame);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // TODO: 장애물 나오는 속도 조금씩 다르게 하기
    if (timer % 100 === 0) {
        var obstacle = new Obstacle;
        obstacles.push(obstacle);
    }
    timer++;

    obstacles.forEach((a, i, o) =>{
        if (a.x < 0) {
            o.splice(i,1);
        }
        a.draw();
        a.x -= 4;
    });
    

    player.draw();
    
}
frame();