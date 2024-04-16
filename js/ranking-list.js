const showRankingData = (rankingList) => {
    // 테이블 요소 만들기
    const element = 'table';
    const rankingTable = document.createElement(element);

    // 테이블 요소 안에 thead 넣기
    rankingTable.innerHTML = `
        <thead>
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    // 추가된 tbody
    const tbody = rankingTable.querySelector('tbody');

    // 랭킹 데이터가 존재하지 않으면 표시할 내용 설정
    if (!rankingList || rankingList.length === 0) {
        const noDataMessage = document.createElement('tr');
        noDataMessage.innerHTML = '<td colspan="3">아직 플레이 한 사람이 없어요 ㅠ0ㅠ</td>';
        tbody.appendChild(noDataMessage);
    } else {
        // 점수가 높은 순으로 랭킹 리스트 정렬
        rankingList.sort((a, b) => b.score - a.score);

        // 랭킹 데이터를 표에 추가
        rankingList.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.score}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // 기존에 있는 랭킹 리스트를 대체하기 위해 기존의 요소를 삭제하고 새로운 테이블을 추가
    const rankingElement = document.getElementById('ranking-list');
    rankingElement.innerHTML = '';
    rankingElement.appendChild(rankingTable);
};

// fetchData 함수 호출 후에 showRankingData를 호출하여 데이터를 보여줄 수 있도록 함
const fetchDataAndShowRanking = async () => {
    try {
        const response = await fetch('http://localhost:8080/ranking');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
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