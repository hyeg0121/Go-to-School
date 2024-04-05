// GET 요청을 보낼 함수 정의
const fetchData = async () => {
    try {
        // GET 요청을 보내고 응답을 변수에 저장
        const response = await fetch('http://localhost:8080/ranking');

        // 응답이 성공적으로 받아졌는지 확인
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        // JSON 형식으로 변환하여 응답 데이터를 가져옴
        const data = await response.json();

        // 랭킹 정보를 콘솔에 출력
        console.log('Rankings:', data);
    } catch (error) {
        // 에러 발생 시 에러 메시지 출력
        console.error('Error:', error);
    }
};

// fetchData 함수 호출
fetchData();
