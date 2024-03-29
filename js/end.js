const scoreH2 = document.getElementsByClassName('score')[0];

let score = new URL(location.href).searchParams.get('score');

scoreH2.innerHTML = `SCORE : ${score}`;


const bgm = new Audio('./resource/music/fail.ogg');
window.onload = () => {
    bgm.muted = true;
    bgm.play();
    bgm.muted = false;
}
