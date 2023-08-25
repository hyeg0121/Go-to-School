let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const DEFAULT_Y = 700;
const DEFAULT_X = 300;

canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

// 음악 재생
const bgm = new Audio('../resources/music/bgm.mp3');
window.onload = () => {
    bgm.muted = true;
    bgm.play();
    bgm.loop = true;
    bgm.muted = false;
}


let player = {
    x: DEFAULT_X,
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
        this.x = 2000;
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
let jumpEffectSound = new Audio('../resources/music/jump_effect.mp3');
document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        isJumping = true;
        jumpEffectSound.play();
    }
});

let obstacles = [];
let timer = 0;
let animation; 

// 프레임마다 실행할 함수
function frame() {
    animation = requestAnimationFrame(frame);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // TODO: 장애물 나오는 속도 조금씩 다르게 하기
    if (timer % 100 === 0) {
        var obstacle = new Obstacle();
        obstacles.push(obstacle);
    }
    timer++;

    obstacles.forEach((a, i, o) =>{
        if (a.x < -600) {
            o.splice(i,1);
        }
        a.x -= 4;
        
        if (checkCollision(player, a)) {
            o.splice(i, 1);
            console.log('충돌~')
        } else {
            a.draw();
        }
    });

    // 점프
    if (isJumping) { 
        player.y -= 5;
        jumpTimer++;
    }
    if (!isJumping) {
        if(player.y < DEFAULT_Y) player.y += 4 ;
    }
    if (jumpTimer > 25 ) {
        isJumping = false;
        jumpTimer = 0;
    }

    player.draw();
    
}
frame();

// collision
function checkCollision(player, obstacle) {
    if (!player || !obstacle) {
        return false; // Exit the function if either player or obstacle is undefined
    }

    var xDiff = obstacle.x - (player.x + player.width);
    var yDiff = obstacle.y - (player.y + player.height);

    if (xDiff < 0 && yDiff < 0) {
        return true; // Collision occurred
    }

    return false; // No collision
}
