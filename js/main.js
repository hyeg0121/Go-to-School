let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const DEFAULT_Y = 400;

canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

let player = {
    x: 100,
    y: DEFAULT_Y,
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
        this.y = DEFAULT_Y;
        this.width = 50;
        this.height = 50;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 점프
let jumpTimer = 0;
let isJumping = false;
document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        isJumping = true;
    }
});

let obstacles = [];
let timer = 0;

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
    
    // 점프
    if (isJumping) {
        player.y -= 5;
        jumpTimer++;
    }
    if (!isJumping) {
        if(player.y < DEFAULT_Y) player.y += 6;
    }
    if (jumpTimer > 30) {
        isJumping = false;
        jumpTimer = 0;
    }

    player.draw();
    
}
frame();

