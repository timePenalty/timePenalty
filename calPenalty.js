
var testData = {
    "type":"message",
    "user":"UF2BC44ER",
    "text":"1545891939364.007000",
    "client_msg_id":"df237f73-9747-42ff-b549-fa5af2245bfc",
    "team":"TF3H7QMV4",
    "channel":"CF3H7QSKG",
    "event_ts":"1545888225.007400",
    "ts":"1545888225.007400"
}

function calPenaltyPerMin(testData) {
    const startTime = new Date("December 27, 2018 10:10:00").getTime(); // 기준 시간(10시 10분)
    const checkInTime = Math.floor(Number(testData.ts) * 1000); // 지각 시간 체크
    const interval = checkInTime - startTime; 
    const runningMin = Math.floor(interval / (1000 * 60)); // 분 단위 경과시간 계산
    const penaltyPerMin = runningMin * 100; // 분당 벌금 100원 부과
    console.log(`경과시간 ${runningMin} 분, 벌금 ${penaltyPerMin}원`)
    return penaltyPerMin; 
}

calPenaltyPerMin(data);