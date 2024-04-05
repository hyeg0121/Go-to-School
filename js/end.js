const scoreH2 = document.getElementsByClassName('score')[0];
let score = Number(new URL(location.href).searchParams.get('score'));
let name = new URL(location.href).searchParams.get('name');

const saveData = async () => {
    try {
        const request = {
            name: name,
            score: Number(score)
        };

        const response = await fetch('http://localhost:8080/ranking', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        if (!response.ok) {
            throw new Error('Failed to save data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error while saving data:', error);
    }
};

saveData().then(() => {
    scoreH2.innerHTML = `SCORE : ${score}`;
}).catch((error) => {
    console.error('Error:', error);
});

scoreH2.innerHTML = `SCORE : ${score}`;

// bgm 재생
window.onload = () => {
    const bgm = new Audio('../resources/music/fail.ogg');
    window.onload = () => {
        bgm.play();
    };

}