const showRankingData = (rankingList) => {

    // 테이블 요소를 만들어야 해!
    // element가 'table'이여야 하는데...
    const element = 'div';

    // 문자열이였던 'table'을 html 요소인 <table>로 만들자
    const rankingTable = document.createElement(element);

    // 테이블 요소 안에 thead를 넣자
    rankingTable.innerHTML = `
        <thead>
            <tr>
                <th>순위</th>
                <th>플레이어</th>
                <th>점수</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    // 추가된 tbody
    const tbody = rankingTable.querySelector('tbody');

    // 랭킹 데이터가 존재하지 않으면 표시할 내용
    if (!rankingList || rankingList.length === 0) {
        const noDataMessage = document.createElement('tr');
        noDataMessage.innerHTML = '<td colspan="3">아직 플레이 한 사람이 없어요 (ˉ ˘ ˉ; )</td>';
        tbody.appendChild(noDataMessage);
        return;
    }

    // 점수가 높은 순으로 랭킹 리스트 정렬
    rankingList.sort((a, b) => b.score - a.score);

    // 랭킹 데이터를 표에 추가
    rankingList.forEach((item, index) => {
        const row = document.createElement('tr');
        // index + 1
        // item.name
        // item.score

        // 여기에 값을 넣자
        row.innerHTML = `
                <td>(՞•̥ ̫•՞)</td>
                <td>,,ᴗ ̯ᴗ,,</td>
                <td>( ͒˃̩̩⌂˂̩̩ ͒)}</td>
            `;
        tbody.appendChild(row);
    });


    // 기존에 있는 랭킹 리스트를 대체하기 위해 기존의 요소를 삭제하고 새로운 테이블을 추가
    const rankingElement = document.getElementById('ranking-list');
    rankingElement.innerHTML = '';
    rankingElement.appendChild(rankingTable);
};

// fetchData 함수 호출 후에 showRankingData를 호출하여 데이터를 보여줄 수 있도록 함
const fetchDataAndShowRanking = async () => {
    try {
        const url = 'http://localhost:8080/ranking'
        /* 
            우리는 랭킹 데이터가 필요해 ㅠㅠ
            랭킹 데이터를 받으려면 서버한테 요청을 보내야 해!!
            근데 url이 조금 이상한거 같은데...? (༎ຶ ෴ ༎ຶ)
            http://localhost:8080/ranking
        */
        // const url = '어 어느 서버로 요청을 보내야 하지??ㅠㅠ'


        const response = await fetch(url);
        console.log(response);

        if (!response.ok) {
            throw new Error('에러났어 멍청아;');
        }

        // 서버가 준 응답에서 내가 사용할 것만 가져올거야
        const data = await response.json();
        console.log('Rankings:', data);

        showRankingData(data); // 랭킹 데이터를 표시
    } catch (error) {
        console.error('Error:', error);
    }
};

// fetchDataAndShowRanking 함수 호출
fetchDataAndShowRanking();

// 배경 음악 재생
const bgm = new Audio('../resources/music/opening_bg.mp3');
window.onload = () => {
    bgm.muted = true;
    bgm.play();
    bgm.loop = true;
    bgm.muted = false;
}