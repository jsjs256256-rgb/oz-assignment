# JS 3일차 정리: Web API (DOM, Event, Timer, Storage, Fetch)

(보충) 표시: 수업·교안에 없던 내용을 이해를 돕기 위해 덧붙인 부분

목차

1. Web API
2. DOM API
3. Event API
4. 화살표 함수와 호이스팅
5. Timer API
6. Storage API
7. 동기와 비동기
8. Fetch API
9. Fetch 실습: 페이지네이션

---

## 1. Web API

### 1-1. Web API란?

브라우저가 JavaScript에게 제공하는 기능 모음이다.

- JavaScript 언어 자체의 기능이 아니라, 브라우저 환경이 빌려주는 기능이다.
- 웹 페이지가 브라우저의 기능(화면, 이벤트, 저장소, 네트워크 등)과 상호작용하게 해 준다.
- 사용자 이벤트 처리, 화면 제어, 서버와의 통신 등을 가능하게 한다.

```
JavaScript 언어      +      브라우저가 빌려주는 기능 (Web API)
let, if, for, 함수           document, addEventListener, setTimeout,
배열, 객체 ...               localStorage, fetch ...
```

### 1-2. 왜 JS가 브라우저를 마음대로 제어하지 못할까?

- 브라우저는 C/C++ 같은 언어로 만들어진 프로그램이다.
- JavaScript는 그 브라우저 안에서 실행되는 언어라서, 브라우저 내부를 직접 건드릴 수 없다.
- 브라우저가 "이 기능들은 써도 된다"고 열어 준 창구(Web API)를 통해서만 화면을 바꾸고, 이벤트를 받고, 서버와 통신할 수 있다.
- 보안을 위해서이기도 하다. 아무 웹사이트의 JS가 내 컴퓨터 파일을 읽거나 브라우저를 마음대로 조작하면 위험하기 때문이다.

(보충) 같은 이유로 Node.js에는 `document`, `alert`, `prompt`가 없다. 이것들은 브라우저가 주는 Web API이기 때문이다. 반대로 `console.log`, `setTimeout`, `fetch`는 Node.js도 따로 제공해서 양쪽에서 쓸 수 있다.

### 1-3. Web API 예시

| 종류 | 하는 일 | 대표 코드 |
| --- | --- | --- |
| DOM API | 화면(HTML 요소) 선택, 변경 | `document.querySelector`, `element.textContent` |
| Event API | 사용자 행동, 브라우저 동작 감지 | `addEventListener` |
| Timer API | 시간 예약 실행 | `setTimeout`, `setInterval` |
| Storage API | 브라우저에 데이터 저장 | `localStorage`, `sessionStorage` |
| Fetch API | 서버와 통신 | `fetch` |

## 2. DOM API

### 2-1. DOM이란?

DOM(Document Object Model): 브라우저가 HTML 문서를 JavaScript가 다룰 수 있는 객체 구조로 만든 것

```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1  "Hello, DOM!"
        └── button  "클릭"
```

- 웹 페이지는 나무(트리) 모양 구조로 표현된다. 태그 하나하나가 객체(노드)가 된다.
- HTML 파일 그 자체가 아니라, 브라우저가 HTML을 읽고 메모리에 만든 객체 구조다.

### 2-2. 화면이 바뀌는 원리

```
HTML 파일 ──(브라우저가 읽음)──▶ DOM ──▶ 화면
                                 ▲
                   JavaScript ───┘  (DOM을 바꿈)
```

1. 브라우저가 HTML 파일을 읽어서 DOM을 만든다.
2. 브라우저는 DOM을 보고 화면을 그린다.
3. JavaScript가 DOM을 바꾸면 브라우저가 바로 화면을 다시 그린다.

- JavaScript는 HTML 파일을 직접 수정하지 않는다. 메모리에 있는 DOM만 바꾼다.
- 그래서 JS로 바꾼 내용은 새로고침하면 사라지고, 원래 HTML 파일 내용으로 돌아간다.
- 이렇게 DOM을 바꿔서 화면을 계속 바꾸는 것이 "동적인 화면"을 만드는 원리다.

### 2-3. 요소 선택하기

```html
<h1 id="msg">Hello, DOM!</h1>
<p class="item">사과</p>
<p class="item">바나나</p>
```

```js
// id로 1개 선택
const msg = document.getElementById("msg");

// CSS 선택자로 1개 선택 (첫 번째로 찾은 요소만, 없으면 null)
const title = document.querySelector("#msg");     // id
const firstItem = document.querySelector(".item"); // class → 사과만
const p = document.querySelector("p");            // 태그

// CSS 선택자로 여러 개 선택 (NodeList, 없으면 빈 NodeList)
const items = document.querySelectorAll(".item");
items.forEach(el => {
    console.log(el.textContent);   // 사과, 바나나
});
```

| 메서드 | 선택 기준 | 결과 |
| --- | --- | --- |
| `getElementById("msg")` | id (`#` 없이) | 요소 1개 또는 null |
| `querySelector("#msg")` | CSS 선택자 | 첫 번째 요소 1개 또는 null |
| `querySelectorAll(".item")` | CSS 선택자 | 모든 요소 (NodeList) |

선택자 쓰는 법은 CSS와 같다. id는 `#`, class는 `.`, 태그는 이름 그대로

### 2-4. 내용, 스타일, 속성 바꾸기

```js
const el = document.querySelector("#msg");

// 내용
el.textContent = "Hello JavaScript";        // 글자만 바꿈
el.innerHTML = "<b>Hello</b> JavaScript";   // HTML 태그까지 해석해서 바꿈

// 공백 제거해서 읽기
console.log(el.textContent.trim());

// 스타일 (CSS 속성 이름의 - 대신 camelCase)
el.style.color = "red";
el.style.fontSize = "20px";          // CSS: font-size
el.style.backgroundColor = "gold";   // CSS: background-color

// 속성
const link = document.querySelector("a");
link.href = "https://google.com";

// class 추가/제거 (보충)
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("active");   // 있으면 빼고, 없으면 넣기
```

| | textContent | innerHTML |
| --- | --- | --- |
| `"<b>안녕</b>"`을 넣으면 | 글자 그대로 `<b>안녕</b>`이 보임 | 굵은 글씨 **안녕**이 보임 |
| 사용 | 사용자 입력처럼 글자만 넣을 때 | 내가 만든 HTML을 넣을 때 |

사용자가 입력한 값을 `innerHTML`로 넣으면, 입력에 섞인 HTML/스크립트가 실행될 수 있어 위험하다. 사용자 입력은 `textContent`로 넣는다.

### 2-5. 요소 새로 만들어 붙이기

```js
const p = document.createElement("p");   // <p></p> 만들기 (아직 화면에 없음)
p.textContent = "새 문장";                 // <p>새 문장</p>
document.body.appendChild(p);            // body 맨 끝에 붙이기 → 화면에 나타남
```

`createElement`로 만든 요소는 `appendChild`로 어딘가에 붙여야 화면에 보인다.

## 3. Event API

### 3-1. 이벤트란?

웹 페이지에서 일어나는 모든 동작이나 상태 변화

- 주로 사용자의 행동으로 발생하지만, 브라우저 자체 동작도 포함된다.

| 구분 | 이벤트 | 언제 |
| --- | --- | --- |
| 마우스 | `click` | 클릭 |
| | `mouseover`, `mouseout` | 마우스를 올렸을 때, 내렸을 때 |
| 키보드 | `keydown`, `keyup` | 키를 누를 때, 뗄 때 |
| 입력 | `input` | 입력창 값이 바뀔 때마다 (한 글자마다) |
| | `change` | 값 변경이 끝났을 때 (select 선택 등) |
| 스크롤 | `scroll` | 스크롤할 때 |
| 브라우저 | `load` | 이미지 등 모든 자원까지 로드 완료 |
| | `DOMContentLoaded` | HTML을 다 읽고 DOM이 완성됨 |
| | `resize` | 창 크기가 바뀔 때 |

### 3-2. 이벤트 리스너 (addEventListener)

이벤트 리스너: 특정 요소에 특정 이벤트가 발생하면 실행되도록 등록해 두는 함수

```js
요소.addEventListener("이벤트 이름", 실행할 함수);
```

```html
<button>클릭</button>

<script>
    // 1. 이벤트를 붙일 버튼 선택
    const btn = document.querySelector("button");

    // 2. 버튼이 클릭되면 실행할 함수 정의
    function clickButton() {
        alert("버튼이 클릭됨!");
    }

    // 3. "click 이벤트가 일어나면 clickButton을 실행해 줘"라고 등록
    btn.addEventListener("click", clickButton);
</script>
```

동작 순서:

1. 페이지가 열리면 JS가 위에서부터 실행되면서 리스너를 등록해 둔다. (이때 `clickButton`은 아직 실행되지 않음)
2. 사용자가 버튼을 클릭한다.
3. 브라우저가 클릭을 감지하고, 등록해 둔 `clickButton`을 대신 호출한다.

이렇게 다른 함수에게 넘겨줘서 나중에 호출되게 하는 함수를 콜백 함수(callback function)라고 한다.

### 3-3. 괄호 () 를 붙이면 안 되는 이유

```js
btn.addEventListener("click", clickButton);    // O 함수 자체를 넘김
btn.addEventListener("click", clickButton());  // X 함수를 지금 실행한 결과를 넘김
```

| 코드 | 넘겨지는 것 | 결과 |
| --- | --- | --- |
| `clickButton` | 함수 그 자체 | 클릭할 때마다 실행됨 |
| `clickButton()` | 함수를 지금 바로 실행한 결과값 (`undefined`) | 페이지가 열리자마자 한 번 실행되고, 클릭해도 아무 일 없음 |

`clickButton()`이라고 쓰면:

1. 등록하는 순간 `clickButton()`이 바로 실행된다. → 클릭하지 않았는데 경고창이 뜸
2. `clickButton`은 return이 없으므로 결과값은 `undefined`
3. 결국 `btn.addEventListener("click", undefined)`가 되어, 클릭할 때 실행할 함수가 없다.

2일차의 `let result = add;`(함수 자체)와 `add(1, 2)`(실행 결과)의 차이와 같다.

### 3-4. 인자를 넘겨야 할 때: 화살표 함수로 감싸기

```js
function changeBGColor(color) {
    span.style.backgroundColor = color;
}

span.addEventListener("mouseover", changeBGColor("red"));         // X 바로 실행됨
span.addEventListener("mouseover", () => changeBGColor("red"));   // O
span.addEventListener("mouseout", () => changeBGColor("gold"));   // O
```

`() => changeBGColor("red")`는 "호출하면 changeBGColor("red")를 실행하는 새 함수"다. 함수 자체를 넘기므로 마우스를 올릴 때 실행된다.

### 3-5. 실습: 입력값 처리 (input.html)

```html
<input type="text">
<button>확인</button>

<script>
    const input = document.querySelector("input");
    const button = document.querySelector("button");

    // 결과를 보여 줄 p를 한 번만 만들어 둠 → 확인할 때마다 내용만 바뀜
    // (클릭할 때마다 createElement하면 p가 계속 쌓임)
    const p = document.createElement("p");
    document.body.appendChild(p);

    function updateDisplay() {
        // trim(): 앞뒤 공백 제거. "   "만 입력해도 빈 값으로 처리
        if (input.value.trim() === "") {
            alert("값을 입력해주세요.");
            return;   // 함수 종료 → 아래 코드 실행 안 함
        }
        p.textContent = input.value;
        input.value = "";   // 입력창 비우기
    }

    // Enter 키를 누르면 확인 버튼과 같은 동작
    function keydownEnter(event) {
        if (event.key === "Enter") {
            updateDisplay();
        }
    }

    button.addEventListener("click", updateDisplay);
    input.addEventListener("keydown", keydownEnter);
</script>
```

- `input.value`: 입력창에 지금 들어 있는 값
- `event`: 브라우저가 리스너 함수를 호출할 때 넘겨주는 이벤트 정보 객체. `event.key`로 어떤 키를 눌렀는지, `event.target`으로 이벤트가 일어난 요소를 알 수 있다.

### 3-6. 실습: 실시간 입력 검사 (password.html)

```html
<input type="password" placeholder="비밀번호 입력">
<p></p>

<script>
    const input = document.querySelector("input");
    const p = document.querySelector("p");

    input.addEventListener("input", () => {
        if (input.value.length < 4) {
            p.textContent = "4자리 이상 입력해주세요.";
            p.style.color = "red";
        } else {
            p.textContent = "사용 가능한 비밀번호입니다.";
            p.style.color = "green";
        }
    });
</script>
```

`input` 이벤트는 한 글자 입력할 때마다 발생해서 실시간 검사에 쓴다.

### 3-7. 이름 있는 함수 vs 화살표 함수를 바로 넣기

```js
// A. 함수를 따로 정의하고 이름으로 넘기기
function validatePassword() { ... }
input.addEventListener("input", validatePassword);

// B. 화살표 함수를 그 자리에서 바로 넣기
input.addEventListener("input", () => console.log("비밀번호 검사 중"));
```

| | A. 이름 있는 함수 | B. 바로 넣은 화살표 함수 |
| --- | --- | --- |
| 다른 곳에서 다시 호출 | 가능 (`validatePassword()`) | 이름이 없어서 불가능 |
| 여러 이벤트에 재사용 | 가능 | 매번 새로 써야 함 |
| 리스너 제거 (`removeEventListener`) | 가능 | 불가능 |
| 장점 | 재사용, 관리 쉬움 | 짧은 코드를 빠르게 쓸 때 편함 |

## 4. 화살표 함수와 호이스팅

### 4-1. 화살표 함수

`function` 키워드 대신 `=>`로 짧게 함수를 만드는 문법. 콜백 함수에 많이 쓴다.

```js
function add(a, b) {
    return a + b;
}

const add = (a, b) => {
    return a + b;
};

const add = (a, b) => a + b;   // 한 줄이면 { }와 return 생략 가능
```

```js
button.addEventListener("click", function () {
    console.log("클릭됨");
});

button.addEventListener("click", () => console.log("클릭됨"));   // 같은 뜻
```

### 4-2. 호이스팅 (Hoisting)

JS는 코드를 실행하기 전에 한 번 훑어보면서 선언(함수, 변수)을 먼저 준비해 둔다.

```js
sayHi();   // 아래에 있는 함수인데도 실행됨

function sayHi() {
    console.log("Hi");
}
```

- `function`으로 선언한 함수는 코드 아래쪽에 있어도 위에서 호출할 수 있다.
- `const add = () => ...`처럼 변수에 담은 함수는 선언 줄보다 위에서 호출하면 에러가 난다.

## 5. Timer API

### 5-1. setTimeout: 일정 시간 뒤 한 번 실행

```js
setTimeout(() => {
    console.log("3초 후 실행");
}, 3000);   // 시간 단위: ms (1000ms = 1초)
```

### 5-2. setInterval: 일정 시간마다 반복 실행

```js
setInterval(() => {
    console.log("1초마다 실행");
}, 1000);
```

### 5-3. timerId와 멈추기

`setTimeout`, `setInterval`은 타이머를 구분하는 번호(timerId)를 돌려준다. 이 번호로 타이머를 멈춘다.

```js
let count = 0;

const timerId = setInterval(() => {
    count++;
    console.log(count + "초 경과!");
    if (count === 10) {
        clearInterval(timerId);   // 10초가 되면 반복 멈춤
    }
}, 1000);
```

| 시작 | 멈춤 |
| --- | --- |
| `setTimeout` | `clearTimeout(timerId)` |
| `setInterval` | `clearInterval(timerId)` |

시간을 계산할 때는 상수로 만들어 두면 읽기 쉽다.

```js
const ONE_SECOND = 1000;
const ONE_HOUR = 1000 * 60 * 60;
setTimeout(() => console.log("2시간 경과"), 2 * ONE_HOUR);
```

### 5-4. 실습: 5초 카운트다운

```js
const startBtn = document.querySelector("#start");
const timeEl = document.querySelector("#result");
let time = 5;
let timerId = null;

startBtn.addEventListener("click", () => {
    if (timerId !== null) return;   // 이미 실행 중이면 또 시작하지 않음 (여러 번 클릭 방지)
    timeEl.textContent = time;

    timerId = setInterval(() => {
        time--;
        if (time === 0) {
            timeEl.textContent = "끝";
            clearInterval(timerId);
            timerId = null;
        } else {
            timeEl.textContent = time;
        }
    }, 1000);
});
```

## 6. Storage API

### 6-1. 데이터는 어디에 저장될까?

```
웹 브라우저  ──요청──▶  서버  ──조회──▶  데이터베이스
     │                  (처리)            (데이터)
     ▼
Browser Storage
(브라우저 안의 작은 저장소)
```

- 보통 데이터는 서버를 거쳐 데이터베이스에 저장되고, 필요할 때마다 서버에 요청해서 받아 온다.
- 하지만 자주 조회하는데 잘 바뀌지 않는 데이터까지 매번 서버에 요청하면 느리고 서버에 부담이 된다.
- 이런 데이터는 브라우저 안의 저장소(Browser Storage)에 저장해 두고 바로 꺼내 쓴다.
  - 예) 사용자 ID, 닉네임, 프로필 사진 주소, 다크모드 설정, 언어 설정

### 6-2. Storage API란?

브라우저가 제공하는 저장소를 다루는 Web API. 서버 없이 브라우저 안에 데이터를 저장하고 꺼낼 수 있다.

- 키(key)와 값(value) 한 쌍으로 저장한다. (객체와 비슷)
- 값은 문자열로만 저장된다.
- 변수(RAM)에 둔 값은 새로고침하면 사라지지만, Storage에 저장한 값은 남는다.
- (보충) 같은 사이트(주소)끼리만 데이터를 볼 수 있다. A 사이트가 B 사이트의 저장소를 읽을 수는 없다.

### 6-3. localStorage와 sessionStorage

| | localStorage | sessionStorage |
| --- | --- | --- |
| 유지 기간 | 직접 지우기 전까지 계속 (브라우저를 껐다 켜도 남음) | 저장한 탭이 열려 있는 동안만 (탭을 닫으면 삭제) |
| 다른 탭·창 | 같은 사이트면 새 탭, 새 창에서도 보임 | 새 탭에서는 보이지 않음 (탭마다 따로) |
| 용도 | 다크모드 설정, 관심목록처럼 오래 둘 데이터 | 작성 중인 입력값처럼 잠깐 쓰는 데이터 |

```js
localStorage.setItem("name", "Alex");   // 저장
localStorage.getItem("name");           // 꺼내기 → "Alex" (없으면 null)
localStorage.removeItem("name");        // 하나 삭제
localStorage.clear();                   // 전부 삭제
```

sessionStorage도 메서드 이름이 똑같다. (`sessionStorage.setItem(...)` 등)

### 6-4. 배열, 객체 저장하기: JSON 사용

Storage에는 문자열만 들어가므로, 배열이나 객체는 JSON 문자열로 바꿔서 저장한다.

```js
const user = { name: "Alex", age: 20 };

// 저장: 객체 → 문자열
localStorage.setItem("user", JSON.stringify(user));
// 저장된 값: '{"name":"Alex","age":20}'

// 꺼내기: 문자열 → 객체
const savedUser = JSON.parse(localStorage.getItem("user"));
console.log(savedUser.name);   // Alex
```

| 메서드 | 방향 |
| --- | --- |
| `JSON.stringify(값)` | 배열/객체 → JSON 문자열 |
| `JSON.parse(문자열)` | JSON 문자열 → 배열/객체 |

(보충) `JSON.stringify` 없이 객체를 그대로 저장하면 `"[object Object]"`라는 의미 없는 문자열이 저장된다.

### 6-5. 실습: 입력값 저장 (새로고침해도 유지)

```html
<input id="name" placeholder="이름 입력" />
<button id="save">저장</button>
<p id="result"></p>

<script>
    const input = document.querySelector("#name");
    const button = document.querySelector("#save");
    const result = document.querySelector("#result");

    // 페이지가 열리면 저장된 값이 있는지 먼저 확인
    const savedName = localStorage.getItem("name");
    if (savedName) {
        result.textContent = savedName;
    }

    // 저장 버튼을 누르면 localStorage에 저장
    button.addEventListener("click", function () {
        localStorage.setItem("name", input.value);
        result.textContent = input.value;
    });
</script>
```

### 6-6. 저장된 값 확인하기

개발자 도구(`Option + Command + I`) → Application 탭 → Storage → Local storage(또는 Session storage) → 사이트 주소를 누르면 Key와 Value가 보인다. 여기서 직접 수정하거나 지울 수도 있다.

### 6-7. 주의: 민감한 정보는 저장하지 않는다

- Storage에 저장한 값은 개발자 도구에서 누구나 볼 수 있고, 그 페이지에서 실행되는 JS도 모두 읽을 수 있다.
- 암호화도 되지 않는다.
- 그래서 비밀번호, 주민등록번호, 카드 번호 같은 민감한 정보는 저장하면 안 된다.

시크릿 모드(비공개 모드):

- 크롬 시크릿 창은 일반 창과 저장소가 분리되어 있다. 일반 창에서 저장한 값은 시크릿 창에서 보이지 않는다.
- 시크릿 창에서 저장한 값은 시크릿 창을 모두 닫으면 삭제된다. (영구 저장되지 않음)

## 7. 동기와 비동기

### 7-1. 동기 (Synchronous)

지금까지 작성한 코드는 모두 동기 방식이다. 한 줄이 끝나야 다음 줄로 넘어간다.

```python
def add(n1, n2):
    return n1 + n2

result = add(1, 2)   # add에 1, 2를 넘기고 → 3이 돌아올 때까지 기다림
print(result)        # 3이 돌아온 뒤에야 실행됨
```

- `add(1, 2)`를 호출하면 결과 3이 돌아올 때까지 다음 줄(`print`)로 가지 않는다.
- 계산이 금방 끝나기 때문에 기다려도 문제가 없다.

### 7-2. 비동기 (Asynchronous)

오래 걸리는 작업이 끝날 때까지 멈춰서 기다리지 않고, 다음 코드를 먼저 실행하는 방식

```
브라우저 ──fetch() 요청──▶ 서버
   ▲                        │
   └────── 결과 ────────────┘   ← 언제 응답할지 모른다 (0.1초? 3초?)
```

- 서버 요청은 네트워크를 거치기 때문에 언제 응답이 올지 모른다.
- 동기 방식으로 기다리면 응답이 올 때까지 화면이 멈춰서 버튼도 안 눌리고 스크롤도 안 된다.
- 그래서 요청만 보내 두고 다른 작업을 계속하다가, 응답이 오면 그때 결과를 처리한다.

```
동기:   요청 ─ (응답 올 때까지 아무것도 못 함) ─ 응답 처리 ─ 다음 일
비동기: 요청 ─ 다음 일 ─ 다음 일 ─ ... ─ (응답 도착) 응답 처리
```

식당에서 주문하고 진동벨을 받아 자리에 앉아 있다가, 벨이 울리면 음식을 받으러 가는 것과 비슷하다.

```js
console.log("1. 요청 보냄");
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => console.log("3. 응답 도착:", data.length + "개"));
console.log("2. 다음 코드 먼저 실행");

// 출력 순서: 1 → 2 → 3
```

`setTimeout`도 비동기다. 예약만 해 두고 다음 코드가 먼저 실행된다.

### 7-3. 비동기는 어디에 쓰일까: 서버와 AI 서빙

- 서버도 데이터베이스 조회나 다른 서버 요청을 기다리는 동안 다른 사용자의 요청을 처리할 수 있으면 훨씬 많은 요청을 감당할 수 있다.
- Python의 FastAPI 같은 웹 프레임워크가 비동기(`async` / `await`)를 지원하는 이유다.
- AI 모델 서빙(학습된 모델을 API로 제공)에서도, 모델 응답을 기다리는 동안 다른 요청을 받기 위해 비동기 방식을 많이 쓴다.

## 8. Fetch API

### 8-1. Fetch API란?

브라우저가 제공하는 서버 통신용 Web API

- 서버에 HTTP 요청(Request)을 보내고 응답(Response)을 받는다.
- 비동기로 동작한다.

### 8-2. 기본 사용법 (GET 요청)

```js
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => console.log(data));
```

1. `fetch(url)`: 서버에 요청을 보낸다.
2. `response`: 서버가 보낸 응답
3. `response.json()`: 응답 내용(JSON 문자열)을 JS 배열/객체로 변환
4. `data`: 실제로 쓸 데이터

jsonplaceholder: 연습용 가짜 데이터를 주는 무료 서버. `/posts`로 요청하면 글 100개가 담긴 배열을 준다.

### 8-3. .then() 체이닝

`.then()`은 "앞의 작업이 끝나면 이 함수를 실행해 줘"라는 뜻이다.

- (보충) `fetch()`는 결과값 대신 "나중에 결과를 주겠다는 약속"인 Promise를 바로 돌려준다.
- 그 Promise에 `.then()`을 붙여서, 결과가 도착하면 실행할 함수를 등록한다.
- (보충) `.then()`도 다시 Promise를 돌려주기 때문에 `.then().then()`처럼 계속 이어 붙일 수 있다. 이것을 체이닝(chaining)이라고 한다.

```
fetch(url)                        → 요청 보냄 (Promise)
  .then(response => response.json())  → 응답이 오면: JSON 변환 (이것도 시간이 걸려서 Promise)
  .then(data => console.log(data))    → 변환이 끝나면: 데이터 사용
```

앞 `.then()`에서 return한 값이 다음 `.then()`의 입력으로 들어간다. `response => response.json()`은 한 줄 화살표 함수라서 `response.json()`의 결과가 자동으로 return된다.

### 8-4. JSON과 response.json()

- JSON(JavaScript Object Notation): JavaScript의 객체·배열 표기 방법을 빌려 만든 데이터 주고받기 형식
- 서버가 보내는 응답은 JSON 모양의 문자열이다.
- `response.json()`은 그 문자열을 JS에서 바로 쓸 수 있는 객체·배열로 바꿔 준다. (`JSON.parse`와 같은 역할)

```json
[
    { "userId": 1, "id": 1, "title": "sunt aut facere ...", "body": "..." },
    { "userId": 1, "id": 2, "title": "qui est esse", "body": "..." }
]
```

### 8-5. async / await로 쓰기 (보충)

수업과 교안에서는 `.then()` 방식만 다뤘다. 과제 예시 코드(cryptocurrency.js)가 이 방식을 써서 보충으로 정리한다.

같은 코드를 `async` / `await`로 쓰면 동기 코드처럼 위에서 아래로 읽힌다.

```js
async function loadPosts() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    console.log(data);
}
```

- `await`: 이 함수 안에서만, 이 줄의 작업이 끝날 때까지 기다렸다가 다음 줄로 간다.
- 함수 밖의 다른 코드와 화면은 멈추지 않는다. (여전히 비동기)
- `await`는 `async`가 붙은 함수 안에서만 쓸 수 있다.

### 8-6. 실패 처리 (보충)

네트워크가 끊기거나 서버가 오류를 보낼 수 있으므로 실패했을 때도 대비한다.

```js
// .then 방식: .catch()
fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("요청 실패:", error));

// async/await 방식: try / catch
async function loadPosts() {
    try {
        const response = await fetch(url);
        if (!response.ok) {                  // 200번대(성공) 응답이 아니면
            throw new Error("요청 실패");
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);                // 실패하면 여기로 옴
    }
}
```

### 8-7. DOM과 함께 쓰기: 글 5개 제목 불러오기

```html
<button id="load">불러오기</button>
<ul id="list"></ul>

<script>
    const button = document.querySelector("#load");
    const list = document.querySelector("#list");

    button.addEventListener("click", function () {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(posts => {
                list.innerHTML = "";
                for (const post of posts.slice(0, 5)) {   // 앞에서 5개만
                    const li = document.createElement("li");
                    li.textContent = post.title;          // post["title"]과 같음
                    list.appendChild(li);
                }
            });
    });
</script>
```

### 8-8. POST 요청: 서버에 데이터 보내기

```js
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",                                     // 요청 방식 (기본값은 GET)
    headers: { "Content-Type": "application/json" },   // 보내는 데이터가 JSON이라고 알림
    body: JSON.stringify({ title: "Python", body: "Hello, Python" }),   // 보낼 데이터 (문자열로 변환)
})
    .then(response => response.json())
    .then(data => console.log(data));

// 출력: { title: "Python", body: "Hello, Python", id: 101 }
```

- `fetch`의 두 번째 칸에 요청 설정을 객체로 넣는다.
- `body`에는 문자열만 넣을 수 있어서 `JSON.stringify`로 바꿔서 보낸다.
- jsonplaceholder는 연습용 서버라 실제로 저장하지는 않고, 저장된 것처럼 새 id(101)를 붙여서 돌려준다.

받은 결과를 화면에 보기 좋게 보여 주려면 (교안 예제):

```js
result.textContent = JSON.stringify(data, null, 2);   // 2: 들여쓰기 2칸
```

| 방식 | 용도 | 예시 |
| --- | --- | --- |
| GET | 데이터 가져오기 (조회) | 글 목록 보기 |
| POST | 데이터 보내기 (생성) | 글 쓰기, 회원가입 |

## 9. Fetch 실습: 페이지네이션

### 9-1. 페이지네이션과 슬라이딩 윈도우

- 기능: 페이지네이션(pagination). 데이터를 한 번에 다 보여 주지 않고 페이지로 나눠 보여 주는 것. 게시판의 "1 2 3 다음 >"
- 기술: 슬라이딩 윈도우(sliding window). 정해진 크기의 창(window)을 데이터 위에서 옮기면서 그 창 안의 데이터만 보는 방법

```
글 번호:  0  1  2  3  4 | 5  6  7  8  9 | 10 11 12 13 14 | ...
         [  1페이지   ] [  2페이지   ] [   3페이지    ]
          창(5칸)을 5칸씩 오른쪽으로 옮김 →
```

창의 크기 = 한 페이지 글 개수(pageSize), 창의 위치 = `slice(start, end)`

| 페이지 | start = (page - 1) × pageSize | end = page × pageSize | slice 결과 |
| --- | --- | --- | --- |
| 1 | 0 | 5 | 0~4번 |
| 2 | 5 | 10 | 5~9번 |
| 3 | 10 | 15 | 10~14번 |

`slice(start, end)`는 start부터 end "직전"까지 잘라 온다.

### 9-2. 실습 코드 (fetch.html)

```html
<select id="pageSizeSelect">
    <option value="5">5개씩 보기</option>
    <option value="10">10개씩 보기</option>
    <option value="20">20개씩 보기</option>
</select>

<ul style="list-style: none; padding: 0;"></ul>
<button id="prev">&lt; 이전 페이지</button>
<span></span>
<button id="next">다음 페이지 &gt;</button>

<script>
    const prevBtn = document.querySelector("#prev");
    const nextBtn = document.querySelector("#next");
    const list = document.querySelector("ul");
    const span = document.querySelector("span");
    const select = document.querySelector("#pageSizeSelect");

    let page = 1;          // 현재 페이지
    let pageSize = 5;      // 한 페이지 글 개수 (창의 크기)
    let totalItems = 100;  // 전체 글 개수

    function loadPosts() {
        span.textContent = page + " 페이지";

        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(posts => {
                totalItems = posts.length;
                list.innerHTML = "";              // 이전 페이지 목록 지우기

                const start = (page - 1) * pageSize;
                const end = page * pageSize;
                let number = start + 1;           // 화면 번호는 1번부터

                for (const post of posts.slice(start, end)) {
                    const li = document.createElement("li");
                    li.textContent = number + ". " + post["title"];
                    list.appendChild(li);
                    number++;
                }
            });

        updatePageButton();
    }

    // 첫 페이지면 이전 버튼, 마지막 페이지면 다음 버튼 비활성화
    function updatePageButton() {
        const lastPage = Math.ceil(totalItems / pageSize);   // 100 ÷ 5 = 20페이지
        prevBtn.disabled = page === 1;
        nextBtn.disabled = page === lastPage;
    }

    prevBtn.addEventListener("click", () => {
        page--;
        loadPosts();
    });

    nextBtn.addEventListener("click", () => {
        page++;
        loadPosts();
    });

    // 몇 개씩 볼지 바꾸면 1페이지부터 다시
    select.addEventListener("change", (event) => {
        pageSize = Number(event.target.value);   // select 값은 문자열 → 숫자로
        page = 1;
        loadPosts();
    });

    loadPosts();   // 처음 열면 1페이지
</script>
```

### 9-3. 코드 포인트

- `disabled`: `true`면 버튼이 회색이 되고 눌리지 않는다. `page === 1`처럼 비교식의 결과(true/false)를 바로 넣을 수 있다.
- (보충) `Math.ceil`: 올림. 글이 100개이고 3개씩 보면 100 ÷ 3 = 33.3...이라 34페이지가 필요하다. 나눠떨어지지 않는 경우까지 처리된다.
- `Number(event.target.value)`: select의 값은 항상 문자열이다.
- 개수를 바꾸면 `page = 1`로 돌아간다. 5개씩 20페이지를 보다가 20개씩으로 바꾸면 20페이지가 존재하지 않기 때문이다.
- (보충) 실제 서비스에서는 전체 글을 다 받아서 자르지 않고, 서버에 "2페이지, 5개만 주세요"처럼 필요한 부분만 요청한다. (예: `/posts?_page=2&_limit=5`) 데이터가 수만 개일 때 전부 받으면 느리기 때문이다.
