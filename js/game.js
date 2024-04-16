// 이름 가져오기
let name = new URL(location.href).searchParams.get('name');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

// 디폴트 값
const DEFAULT_Y = 970;
const DEFAULT_X = 500;
const MAX_LIFE = 3;

canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);

// 음악 재생
const bgm = new Audio('./resources/music/opening_bg.mp3');
window.onload = () => {
    bgm.muted = true;
    bgm.play();
    bgm.loop = true;
    bgm.muted = false;
}

let playerImg = new Image();
playerImg.src = './resources/image/player.png';
let player = {
    x: DEFAULT_X,
    y: DEFAULT_Y,
    width: 50,
    height: 50,
    draw() {
        ctx.drawImage(playerImg, this.x - 60, this.y - 130);
    }
}

// 적
let obstacleSpeed = 3.5;
let obstacleSpawnInterval = 95;

let obstacleImg = new Image();
obstacleImg.src = './resources/image/bug.png'
class Obstacle {
    constructor() {
        this.x = 1440;
        this.y = DEFAULT_Y - 30;
        this.width = 37;
        this.height = 37;
        this.speed = obstacleSpeed;
    }

    draw() {
        ctx.drawImage(obstacleImg, this.x - 20, this.y - 45);
    }
}

// 점프
let jumpTimer = 0;
let isJumping = false;
let jumpSpeed = 9;
let jumpSecond = 30;
let jumpEffectSound = new Audio('./resources/music/jump_effect.mp3');
document.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        if (player.y > 700) {
            isJumping = true;
            jumpEffectSound.play();
        }
    }
});

// 목숨
let lives = MAX_LIFE;
const livesDiv = document.getElementsByClassName('lives')[0];
function removeLives() {
    let firstChild = livesDiv.firstElementChild;
    if (firstChild) {
        livesDiv.removeChild(firstChild);
    } else if (firstChild == null) {
        window.open(`end.html?score=${score}`, '_top');
    }
}

// 점수
let score = 0;
const scoreDiv = document.getElementsByClassName('score')[0];
function displayScore() {
    scoreDiv.innerHTML = 'score: ' + score;
}

let obstacles = [];
let timer = 0;
let animation;

let maxInterval = 150;
let minInterval = 70;

// 랜덤으로 장애물 스폰
function getRandomSpawnInterval() {
    return parseInt(Math.random() * (maxInterval - minInterval) + minInterval);
}

// 프레임마다 실행할 함수
function frame() {
    animation = requestAnimationFrame(frame);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 장애물 나오는 속도 조금씩 다르게 하기
    if (timer > obstacleSpawnInterval) {
        var obstacle = new Obstacle();
        obstacles.push(obstacle);
        obstacleSpawnInterval = getRandomSpawnInterval();
        timer = 0;
    }
    timer++;

    obstacles.forEach((a, i, o) => {
        if (a.x < -600) {
            o.splice(i, 1);
        }
        a.x -= a.speed;

        if (checkCollision(player, a)) {
            o.splice(i, 1);
            lives--;
            removeLives();

        } else {
            a.draw();
        }

    });

    // 점수 증가
    displayScore();

    // 게임 오버 
    if (lives <= 0) {
        window.open(`./end.html?score=${score}&name=${name}`, '_top');
    } else {
        score += 1;
    }

    // 점프
    if (isJumping) {
        if (player.y < DEFAULT_Y - 300) {
            isJumping = false;
        } else {
            player.y -= jumpSpeed;
            jumpTimer++;
        }
    }
    if (!isJumping) {
        if (player.y < DEFAULT_Y) player.y += jumpSpeed;
    }
    if (jumpTimer > jumpSecond) {
        isJumping = false;
        jumpTimer = 0;
    }

    // 난이도 변경
    let flag3000 = false; // 4000점 플래그 변수
    let flag2000 = false; // 3000점 플래그 변수
    let flag1000 = false; // 2000점 플래그 변수

    if (score > 4000 && !flag3000) { // 4000점 이상인 경우
        maxInterval = 80;
        minInterval = 40;
        obstacleSpeed = 6.5;
        jumpSpeed = 13;


        flag3000 = true; // 플래그 설정
    } else if (score > 2000 && !flag2000) { // 3000점 이상인 경우
        maxInterval = 100;
        minInterval = 50;
        obstacleSpeed = 5.5;
        jumpSpeed = 12;

        flag2000 = true; // 플래그 설정
    } else if (score > 1000 && !flag1000) { // 2000점 이상인 경우
        maxInterval = 140;
        minInterval = 60;
        obstacleSpeed = 4.5;
        jumpSpeed = 11;

        console.log(obstacleSpeed)
        flag1000 = true; // 플래그 설정
    }


    player.draw();
}
frame();

// 충돌 체크
function checkCollision(player, obstacle) {
    const tolerance = 10;

    if (
        player.x + player.width + tolerance > obstacle.x &&
        player.x < obstacle.x + obstacle.width + tolerance &&
        player.y + player.height + tolerance > obstacle.y &&
        player.y < obstacle.y + obstacle.height + tolerance
    ) {
        return true; // 충돌
    }

    return false; // 충돌이 아님
}