const appToken = 'xoxp-513585837990-512386140501-511466803760-166727a0abc02af3cfb33f8890c438e1';
const botToken = 'xoxb-513585837990-513630958022-CNSRdMzrGrPKFDGKYsL0m45f';
let vanData = {
    "UF20H058U": {
        "20181220": 3000,
        "20181221": 0,
        "20181222": 0,
        "20181223": 2000,
        "20181224": 0,
        "20181225": 5000,
        "20181226": 0,
        "20181227": 0
    },
    "UF25DUQ58": {
        "20181220": 3000,
        "20181221": 1000,
        "20181222": 0,
        "20181223": 0,
        "20181224": 0,
        "20181225": 0,
        "20181226": 2000,
        "20181227": 3000
    },
    "UF25LF4HG": {
        "20181220": 3000,
        "20181221": 1000,
        "20181222": 0,
        "20181223": 0,
        "20181224": 0,
        "20181225": 0,
        "20181226": 0,
        "20181227": 0
    },
    "UF2BC44ER": {
        "20181220": 3000,
        "20181221": 0,
        "20181222": 1000,
        "20181223": 2000,
        "20181224": 3000,
        "20181225": 5000,
        "20181226": 2000,
        "20181227": 3000
    },
    "UF3HE4ZSS": {
        "20181220": 3000,
        "20181221": 0,
        "20181222": 1000,
        "20181223": 0,
        "20181224": 3000,
        "20181225": 0,
        "20181226": 0,
        "20181227": 0
    }
}
function app() {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', openWebSocket);
    xhr.open('GET', `https://slack.com/api/rtm.connect?token=${botToken}`);
    xhr.send();

    function openWebSocket({ target: { response } }) {
        const data = JSON.parse(response);
        const wssUri = data.url;
        const slack = new WebSocket(wssUri);

        function doOnEventReceive({ data }) {
            const key = `${new Date().getFullYear()}.${new Date().getMonth() + 1}.${new Date().getDate()}`
            const { type, user, text, ts } = JSON.parse(data);
            if (check(user, key)) return;
            const today = calPenaltyPerMin(data)
            const allMoney = Object.valuse(vanData[user]).reduce((prev, curr) => prev + curr, 0)
            render(today, allMoney)
        }

        slack.onmessage = doOnEventReceive;
    }
}

function calPenaltyPerMin(testData) {
    const startTime = 1545873000000;
    const checkInTime = Math.floor(Number(testData.ts) * 1000); // 지각 시간 체크
    const interval = checkInTime - startTime;
    const runningMin = Math.floor(interval / (1000 * 60)); // 분 단위 경과시간 계산
    const penaltyPerMin = runningMin * 100; // 분당 벌금 100원 부과
    console.log(`경과시간 ${runningMin} 분, 벌금 ${penaltyPerMin}원`)
    return penaltyPerMin;
}

function check(user, key) {
    if (vanData[user][key] !== undefined) return true;
}

function render(todayMoney, allMoney) {
    document.querySelector(`.${data.user} .content`).innerHTML = userCount(todayMoney, allMoney);
}

function allRender(data) {
    document.body.innerHTML = userAllCount(data);
}

document.body.addEventListener('load', () => {
    userAllCount(vanData);
})

function userId(id) {
    const displayName = {
        "UF20H058U": "리오",
        "UF25DUQ58": "우기",
        "UF25LF4HG": "반",
        "UF2BC44ER": "코코아",
        "UF3HE4ZSS": "웨일"
    }

    return `<div id="userID"><span>${displayName[id]}</span></div>`
}

function count(count) {
    return `<div id="count"><span>누적 : ${count}</span></div>`
}

function userAllCount(data) {
    const keys = Object.keys(data);
    return keys.reduce((prev, curr) => {
        const price = Object.valuse(data[curr]).reduce((prev, curr) => prev + curr, 0)
        return prev + `<li class="chatContents">
        <div class="user_Name">
          <div class="name">
            ${userId(curr)}
          </div>
        </div>
        <div class="cont-box-rotate"></div>
        <div class="user_Content">
          <div class="content">
            ${count(price)}
          </div>
        </div>
      </li>`
    }, '')
}

function userCount(todayMoney, allMoney) {
    return `
    <div class="content">
        <div id="today"><span>금일 지각비 : ${todayMoney}</span></div>
        ${count(allMoney)}
    </div>
    `
}

vanData.noName = 'nothing';
app();