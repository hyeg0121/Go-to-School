const scoreH2 = document.getElementsByClassName('score')[0];

let score = new URL(location.href).searchParams.get('score');

scoreH2.innerHTML = `SCORE : ${score}`;