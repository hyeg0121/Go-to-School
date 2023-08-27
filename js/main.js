let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const DEFAULT_Y = 700;
const DEFAULT_X = 300;
const MAX_LIFE = 3;

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

// 목숨
let lives = MAX_LIFE;
function displayLives() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Lives: ' + lives, canvas.width - 120, 40); // Adjust the position as needed
}


// 점수
let score = 0;

function displayScore() {
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 20, 40); // Adjust the position as needed
}

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
            lives--;
        }else{
            a.draw();
        }
        
    });

    // 점수 증가
    score += 1;
    displayScore();

    // 목숨 보여주기
    displayLives();

    // 게임 오버 
    if (lives <= 0) {
        window.open('../end.html', '_top');
    }

    // 점프
    if (isJumping) { 
        player.y -= 9;
        jumpTimer++;
    }
    if (!isJumping) {
        if(player.y < DEFAULT_Y) player.y += 6 ;
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
    // Define a tolerance margin to make the collision check less strict
    const tolerance = 5;

    if (
        player.x + player.width + tolerance > obstacle.x &&
        player.x < obstacle.x + obstacle.width + tolerance &&
        player.y + player.height + tolerance > obstacle.y &&
        player.y < obstacle.y + obstacle.height + tolerance
    ) {
        return true; // Collision detected
    }

    return false; // No collision
}



