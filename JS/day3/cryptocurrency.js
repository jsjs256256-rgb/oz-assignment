// ===== 실시간 암호화폐 가격 변동 추적기 =====
// 사용한 Web API
// - DOM API     : querySelector, createElement, textContent, classList
// - Event API   : addEventListener (클릭, 입력, 선택 변경)
// - Timer API   : setInterval (1초마다 데이터 요청)
// - Storage API : localStorage (관심항목 저장)
// - Fetch API   : fetch (Binance 서버에 GET 요청)

const API_URL = "https://api4.binance.com/api/v3/ticker/24hr";
const STORAGE_KEY = "favorites";

// 1. 화면 요소 가져오기 (DOM API)
const cryptoList = document.querySelector("#cryptoList");
const searchInput = document.querySelector("#searchInput");
const sortSelect = document.querySelector("#sortSelect");
const loading = document.querySelector("#loading");
const emptyMessage = document.querySelector("#emptyMessage");
const cryptoTable = document.querySelector("#cryptoTable");
const allTab = document.querySelector("#allTab");
const favoritesTab = document.querySelector("#favoritesTab");
const favCount = document.querySelector("#favCount");
const resultCount = document.querySelector("#resultCount");
const updatedAt = document.querySelector("#updatedAt");

// 2. 상태(데이터) 변수
let allCryptoData = [];       // API에서 받은 USDT 종목 전체
let previousPrices = {};      // 직전 가격 { BTCUSDT: 76961.41, ... } → 가격이 올랐는지 내렸는지 비교용
let currentTab = "all";       // "all" 또는 "favorites"
let isFetching = false;       // 요청이 진행 중이면 true (요청이 겹치지 않게)

// localStorage에는 문자열만 저장되므로 JSON으로 바꿔서 저장/불러오기
let favorites = loadFavorites();

function loadFavorites() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (error) {
        return [];   // 저장된 값이 깨져 있으면 빈 배열로 시작
    }
}

function saveFavorites() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

// 3. 숫자 보기 좋게 만들기
// 0.00001234 같은 아주 작은 가격도 0으로 잘리지 않게 소수 8자리까지 표시
function formatPrice(value) {
    return Number(value).toLocaleString("en-US", { maximumFractionDigits: 8 });
}

// 4. API에서 데이터 가져오기 (Fetch API)
async function fetchCryptoData() {
    if (isFetching) return;   // 이전 요청이 아직 안 끝났으면 이번 차례는 건너뜀
    isFetching = true;

    try {
        const response = await fetch(API_URL);   // 서버에 GET 요청을 보내고 응답을 기다림
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();      // 응답(JSON 문자열) → JS 배열로 변환

        // 직전 가격 기억해 두기 (오르면 빨강, 내리면 파랑으로 깜빡이게)
        previousPrices = {};
        allCryptoData.forEach(item => {
            previousPrices[item.symbol] = Number(item.lastPrice);
        });

        // USDT 마켓만 남기고, 거래가 멈춘 종목(현재가 0)은 제외
        allCryptoData = data.filter(item =>
            item.symbol.endsWith("USDT") && Number(item.lastPrice) !== 0
        );

        updatedAt.textContent = `마지막 업데이트: ${new Date().toLocaleTimeString("ko-KR")}`;
        loading.classList.add("hidden");
        filterAndRender();
    } catch (error) {
        console.error("데이터 요청 실패:", error);
        // 처음부터 실패했을 때만 큰 오류 문구를 보여 줌 (이미 데이터가 있으면 이전 화면 유지)
        if (allCryptoData.length === 0) {
            loading.textContent = "데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도합니다.";
        }
    } finally {
        isFetching = false;   // 성공하든 실패하든 요청이 끝났음을 표시
    }
}

// 5. 탭, 검색어, 정렬에 맞게 데이터 고르기
function filterAndRender() {
    const searchTerm = searchInput.value.trim().toUpperCase();

    // 검색어가 들어간 심볼만
    let filteredData = allCryptoData.filter(item => item.symbol.includes(searchTerm));

    // 관심항목 탭이면 관심항목만
    if (currentTab === "favorites") {
        filteredData = filteredData.filter(item => favorites.includes(item.symbol));
    }

    // 정렬 (원본 배열이 바뀌지 않게 복사본으로 정렬)
    const sortType = sortSelect.value;
    if (sortType === "changeDesc") {
        filteredData = [...filteredData].sort((a, b) => b.priceChangePercent - a.priceChangePercent);
    } else if (sortType === "changeAsc") {
        filteredData = [...filteredData].sort((a, b) => a.priceChangePercent - b.priceChangePercent);
    } else if (sortType === "volumeDesc") {
        filteredData = [...filteredData].sort((a, b) => b.quoteVolume - a.quoteVolume);
    }

    favCount.textContent = favorites.length;
    resultCount.textContent = `${filteredData.length}개 종목`;
    renderData(filteredData);
}

// 6. 표 그리기 (DOM API)
function renderData(data) {
    cryptoList.innerHTML = "";   // 기존 행을 모두 지우고 새로 그림

    // 보여 줄 종목이 없을 때 안내 문구
    if (data.length === 0) {
        cryptoTable.classList.add("hidden");
        emptyMessage.classList.remove("hidden");
        if (currentTab === "favorites" && favorites.length === 0) {
            emptyMessage.textContent = "관심항목이 없습니다. 전체보기에서 ☆를 눌러 추가해 보세요.";
        } else {
            emptyMessage.textContent = "검색 결과가 없습니다.";
        }
        return;
    }
    cryptoTable.classList.remove("hidden");
    emptyMessage.classList.add("hidden");

    data.forEach(item => {
        const row = document.createElement("tr");

        const priceChange = Number(item.priceChangePercent);
        const changeClass = priceChange >= 0 ? "up" : "down";
        const sign = priceChange > 0 ? "+" : "";
        const isFavorite = favorites.includes(item.symbol);

        // 직전 가격과 비교해서 깜빡임 효과 class 정하기
        const price = Number(item.lastPrice);
        const prev = previousPrices[item.symbol];
        let flashClass = "";
        if (prev !== undefined && price > prev) flashClass = "flash-up";
        if (prev !== undefined && price < prev) flashClass = "flash-down";

        row.innerHTML = `
            <td>
                <button class="fav-btn ${isFavorite ? "active" : ""}" data-symbol="${item.symbol}"
                        aria-label="${item.symbol} 관심항목 ${isFavorite ? "해제" : "추가"}">
                    ${isFavorite ? "★" : "☆"}
                </button>
            </td>
            <td class="symbol">${item.symbol.slice(0, -4)}<span class="quote">/USDT</span></td>
            <td class="num ${flashClass}">${formatPrice(item.lastPrice)}</td>
            <td class="num ${changeClass}">${sign}${priceChange.toFixed(2)}%</td>
            <td class="num">${formatPrice(item.highPrice)}</td>
            <td class="num">${formatPrice(item.lowPrice)}</td>
        `;

        cryptoList.appendChild(row);
    });
}

// 7. 관심항목 추가/해제 (Storage API)
function toggleFavorite(symbol) {
    if (favorites.includes(symbol)) {
        favorites = favorites.filter(fav => fav !== symbol);   // 있으면 빼기
    } else {
        favorites.push(symbol);                                // 없으면 넣기
    }
    saveFavorites();
    filterAndRender();
}

// 8. 이벤트 연결 (Event API)

// ☆ 버튼은 1초마다 새로 그려지므로, 버튼마다 리스너를 다는 대신
// 항상 그대로 있는 tbody에 리스너를 하나만 달고, 클릭된 대상이 ☆ 버튼인지 확인 (이벤트 위임)
cryptoList.addEventListener("click", (event) => {
    const button = event.target.closest(".fav-btn");
    if (button) {
        toggleFavorite(button.dataset.symbol);
    }
});

// 검색: 글자를 입력할 때마다
searchInput.addEventListener("input", filterAndRender);

// 정렬: 선택이 바뀔 때마다
sortSelect.addEventListener("change", filterAndRender);

// 탭 전환
function changeTab(tabName) {
    currentTab = tabName;
    allTab.classList.toggle("active", tabName === "all");
    favoritesTab.classList.toggle("active", tabName === "favorites");
    filterAndRender();
}

allTab.addEventListener("click", () => changeTab("all"));
favoritesTab.addEventListener("click", () => changeTab("favorites"));

// 9. 시작: 바로 한 번 불러오고, 그 뒤로 1초마다 다시 요청 (Timer API)
fetchCryptoData();
setInterval(fetchCryptoData, 1000);
