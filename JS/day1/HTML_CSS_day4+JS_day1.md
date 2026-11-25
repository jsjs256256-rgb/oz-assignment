# JS 1일차 정리: CSS Grid, Bootstrap, JavaScript 시작

이 문서는 두 부분으로 나뉜다.

- Part 1. CSS: Grid, Bootstrap (화면 배치와 디자인)
- Part 2. JavaScript: 실행 방법, 변수, 메모리 (화면의 동작)

---

# Part 1. CSS

## 1. Grid

### 1-1. Grid란?

- 2차원 레이아웃 시스템이다.
- 행(row)과 열(column)을 동시에 제어한다.
- 화면 전체 구조(레이아웃)를 만들기 위한 도구다.

지금까지 배운 배치 방법과 비교하면 이렇다.

| 방법 | 잘하는 일 | 한계 |
| --- | --- | --- |
| position | 요소 하나를 원하는 위치에 놓기 | 여러 요소의 레이아웃을 짜는 용도는 아님 |
| Flexbox | 한 방향(가로 또는 세로)으로 정렬 (1차원) | 가로와 세로를 동시에 맞추기 어려움 |
| Grid | 가로와 세로를 동시에 나눠 페이지 구조 자체를 설계 (2차원) | - |

### 1-2. Grid Container와 Grid Item

```html
<div id="container">        <!-- Grid Container: display: grid가 적용된 부모 -->
    <div class="item">A</div>   <!-- Grid Item: container의 직계 자식 -->
    <div class="item">B</div>
    ...
</div>
```

- Grid Container: `display: grid`가 적용된 부모
- Grid Item: container의 직계 자식 요소 (자식의 자식은 해당되지 않음)
- 아이템을 어디에 놓을지는 container(부모)에서 정한다.

### 1-3. 열 만들기: grid-template-columns

```css
#container {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;   /* 폭 25%인 열 4개 */
}
```

같은 결과를 이렇게도 쓸 수 있다.

```css
grid-template-columns: repeat(4, 25%);   /* 25%를 4번 반복 */
grid-template-columns: repeat(4, 1fr);   /* 남은 공간을 4등분 */
grid-template-columns: 1fr 2fr 1fr;      /* 1 : 2 : 1 비율로 열 3개 */
```

- 값의 개수 = 열의 개수, 각 값 = 열의 폭
- `fr`은 남은 공간을 비율로 나누는 단위다. (`1fr 2fr 1fr` = 전체를 4조각으로 나눠 1, 2, 1조각씩)

### 1-4. 아이템이 채워지는 순서 (자동 배치)

열을 4개 만들고 아이템 6개(A~F)를 넣으면 이렇게 된다.

```
┌─────┬─────┬─────┬─────┐
│  A  │  B  │  C  │  D  │   ← 1행: 왼쪽부터 순서대로 채움
├─────┼─────┼─────┴─────┘
│  E  │  F  │                ← 열이 다 차면 새 행을 자동으로 만들어 이어서 채움
└─────┴─────┘
```

- 열(파란 점선 칸)은 내가 정해 준다.
- 아이템은 HTML 순서대로 왼쪽에서 오른쪽으로 채워진다.
- 한 줄의 열이 다 차면 Grid가 새 행을 자동으로 만들고 다음 줄로 넘어간다.
- 행은 따로 정하지 않아도 내용 높이만큼 자동으로 생긴다.

### 1-5. 행 크기와 간격

```css
grid-template-rows: 80px 80px;   /* 1행, 2행 높이를 직접 지정 */
grid-auto-rows: 80px;            /* 자동으로 생기는 행의 높이를 모두 80px로 */
gap: 10px;                       /* 칸과 칸 사이 간격 */
```

- `grid-template-rows`: 내가 미리 만든 행의 높이
- `grid-auto-rows`: 1-4처럼 자동으로 생기는 행의 높이 (행이 몇 개가 될지 모를 때 편함)

### 1-6. 실습: 갤러리 만들기 (grid-template-areas)

칸에 이름을 붙이고, 이름으로 큰 칸을 만들 수 있다.

```css
#container {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: 1fr 1fr 1fr;      /* 열 3개 */
    grid-template-rows: repeat(4, 200px);    /* 높이 200px 행 4개 */
    grid-template-areas:
        "img1 img3 img3"
        "img1 img4 img6"
        "img2 img2 img6"
        "img5 img5 img5";
}

.img1 { grid-area: img1; }   /* "img1"이라고 적힌 칸을 모두 차지 */
.img3 { grid-area: img3; }
```

```
┌──────┬─────────────┐
│      │    img3     │
│ img1 ├──────┬──────┤
│      │ img4 │      │
├──────┴──────┤ img6 │
│    img2     │      │
├─────────────┴──────┤
│        img5        │
└────────────────────┘
```

- 같은 이름이 여러 칸에 적혀 있으면 그 칸들을 합쳐서 하나의 큰 칸이 된다.
- 이름으로 그림을 그리듯 레이아웃을 짤 수 있다.

이미지가 칸을 꽉 채우게 하고, 마우스를 올린 이미지만 강조하기:

```css
img {
    width: 100%;
    height: 100%;
    object-fit: cover;          /* 비율을 유지하며 칸을 꽉 채움 (넘치는 부분은 잘림) */
    border-radius: 0.5rem;
}

/* 갤러리에 마우스가 올라가 있을 때, 마우스가 올라가 있지 않은 이미지만 흐리게 */
#container:hover img:not(:hover) {
    filter: grayscale(1);       /* 흑백 */
    opacity: 0.5;               /* 반투명 */
}
```

`:not(:hover)`는 "마우스가 올라가 있지 않은"이라는 뜻의 가상 클래스다.

## 2. Bootstrap

### 2-1. Bootstrap이란?

- CSS와 JavaScript로 만든 UI 프레임워크다.
- 반응형 웹을 빠르게 만들기 위한 도구다.
- 미리 만들어 둔 Grid, Component(버튼, 카드 등), Utility class를 제공한다.
- CSS를 직접 쓰지 않고 class 이름만 붙여서 레이아웃과 디자인을 만든다.
- 일정한 UI 품질을 유지할 수 있다.

공식 사이트: https://getbootstrap.com (수업은 5.3.8 버전, 문서도 5.3 버전을 본다)

### 2-2. 불러오기 (CDN)

```html
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="resume_style.css">   <!-- 내 CSS는 Bootstrap 뒤에 -->
</head>
<body>
    ...
    <!-- navbar 펼치기, modal 같은 동작이 필요할 때만 -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
```

- 내 CSS를 Bootstrap보다 뒤에 불러와야 Bootstrap 스타일을 덮어쓸 수 있다. (우선순위가 같으면 나중 코드가 이김)
- Bootstrap에도 `.container` 같은 class가 있어서, 내가 같은 이름을 쓰면 스타일이 섞인다. 이름이 겹치지 않게 조심한다.

### 2-3. Utility class: CSS 한 줄을 class 하나로

```html
<div class="d-flex justify-content-center">
    <div>알림</div>
    <div class="badge bg-danger my-auto">5</div>
</div>
```

| class | 같은 뜻의 CSS |
| --- | --- |
| `d-flex` | `display: flex` (d = display) |
| `justify-content-center` | `justify-content: center` |
| `my-auto` | `margin-top: auto; margin-bottom: auto` (y = 위아래) |
| `p-2` | `padding` 2단계 (0~5 단계가 있음) |
| `mt-5` | `margin-top` 5단계 (t = top) |
| `gap-2` | `gap` 2단계 |
| `w-100` | `width: 100%` |

여백 class 읽는 법: `m`(margin) 또는 `p`(padding) + 방향(`t` 위, `b` 아래, `s` 왼쪽, `e` 오른쪽, `x` 좌우, `y` 위아래) + 크기(0~5, auto)

### 2-4. Bootstrap Grid: container → row → col

CSS Grid와는 다른, Bootstrap이 미리 만들어 둔 격자다. 한 줄을 12칸으로 보고 몇 칸씩 차지할지 정한다.

```html
<div class="container">
    <div class="row">
        <div class="col-6">왼쪽 (12칸 중 6칸)</div>
        <div class="col-6">오른쪽 (12칸 중 6칸)</div>
    </div>
</div>
```

반응형으로 쓰기:

```html
<div class="row">
    <div class="col-md-4">카드 1</div>
    <div class="col-md-4">카드 2</div>
    <div class="col-md-4">카드 3</div>
</div>
```

- `col-md-4`: 화면이 중간(md, 768px) 이상이면 4칸(한 줄에 3개), 그보다 좁으면 12칸(한 줄에 1개)
- 크기 기준: `sm`(576px), `md`(768px), `lg`(992px), `xl`(1200px)

### 2-5. Component

| 컴포넌트 | 예시 class | 용도 |
| --- | --- | --- |
| Button | `btn btn-primary`, `btn-danger`, `btn-info` | 버튼 색과 모양 |
| Badge | `badge bg-danger` | 숫자, 짧은 라벨 |
| Card | `card`, `card-body`, `card-title`, `card-text` | 내용을 상자 모양으로 묶기 |
| Navbar | `navbar navbar-expand-lg`, `navbar-toggler`, `collapse` | 상단 메뉴, 좁은 화면에서 햄버거 버튼 |
| Modal | `modal`, `modal-dialog`, `modal-content` | 화면 위에 뜨는 확인 창 |

- Navbar 펼치기, Modal 열기처럼 동작이 필요한 컴포넌트는 Bootstrap JS 파일을 함께 불러온다.
- 그러면 `data-bs-toggle`, `data-bs-target` 같은 속성만 붙여도 JavaScript를 직접 쓰지 않고 동작한다.

### 2-6. 주의점

- class를 너무 많이 붙이면 HTML이 길어져 읽기 어려워진다.
- 버전마다 class 이름이 다를 수 있으니, 쓰는 버전의 문서를 본다.

---

# Part 2. JavaScript

## 3. JavaScript란?

- 웹 브라우저에서 동작하는 프로그래밍 언어다.
- 버튼 클릭, 입력 처리, 화면 변경을 담당한다.
- Node.js를 쓰면 브라우저 밖(터미널)에서도 실행할 수 있다.

| 언어 | 역할 | 비유 |
| --- | --- | --- |
| HTML | 구조 | 뼈대 |
| CSS | 디자인 | 옷 |
| JavaScript | 동작 | 근육 |

## 4. JavaScript 실행 방법

| 방법 | 어디서 | 예시 |
| --- | --- | --- |
| 브라우저 Console | 개발자 도구(`cmd + option + I`) → Console 탭 | `console.log(1 + 2);` |
| `<script>` 태그 | HTML 파일 안 | `<script> console.log("Hello"); </script>` |
| JS 파일 분리 | `.js` 파일을 HTML에서 불러옴 | `<script src="app.js"></script>` |
| Node.js | 터미널 | `node app.js` |

### 실습: HTML에서 JS 파일 불러오기

```html
<!-- js.html -->
<body>
    <h1>Hello, JS</h1>
    <script src="./app.js"></script>
</body>
```

```js
// app.js
console.log("hello from app.js");
```

- `js.html`을 브라우저로 열고 개발자 도구 Console 탭을 보면 `hello from app.js`가 찍힌다.
- `console.log()`는 화면이 아니라 Console에 값을 출력한다. 값 확인, 에러 확인에 쓴다.
- `<script>`는 보통 `</body>` 바로 앞에 둔다. HTML을 다 읽은 뒤에 JS가 실행되게 하기 위해서다.

## 5. Node.js

- 브라우저 없이 JavaScript를 실행할 수 있게 해 주는 실행 환경이다.
- 설치(macOS): `brew install node`
- 설치 확인: `node -v`, `npm -v`
- npm: Node.js용 패키지(남이 만든 코드 묶음) 관리자. Python의 pip와 비슷하다.

| 장점 | 설명 |
| --- | --- |
| 환경이 단순 | HTML, CSS 없이 JS만 실행 |
| 실행이 간단 | `node app.js` 한 줄 |
| 에러 메시지가 명확 | 몇 번째 줄에서 무슨 에러가 났는지 바로 보임 |

## 6. 변수와 메모리(RAM)

### 6-1. 변수란?

값을 저장해 두고 이름으로 다시 꺼내 쓰는 공간이다.

```js
let age = 20;
const username = "Alex";
console.log(age);        // 20
console.log(username);   // Alex
```

| 키워드 | 값 바꾸기 | 사용 |
| --- | --- | --- |
| `let` | 가능 | 값이 바뀔 변수 |
| `const` | 불가능 (상수) | 바뀌지 않을 값. 기본으로 권장 |

```js
let age = 20;
age = 30;            // OK

const pi = 3.141592;
pi = 3.15;           // 에러: TypeError: Assignment to constant variable.
```

### 6-2. RAM과 변수

- RAM(Random Access Memory)은 프로그램이 실행되는 동안 데이터를 잠시 올려 두는 작업 공간이다.
- `name = "alex"`를 실행하면 RAM에 "alex"라는 값이 저장되고, `name`이라는 이름표가 그 값을 가리킨다.
- 프로그램이 끝나면 RAM의 기록은 사라진다. 계속 남기려면 파일이나 데이터베이스에 저장해야 한다.

```
name = "alex"

  변수 이름            RAM
  ┌──────┐         ┌────────┐
  │ name │ ──────▶ │ "alex" │
  └──────┘         └────────┘
```

### 6-3. 변수를 변수에 할당하기

```js
let old_name = "alex";
let name = old_name;     // old_name이 가진 값을 name에도 할당
```

```
  ┌──────────┐
  │ old_name │ ──┐     ┌────────┐
  └──────────┘   ├───▶ │ "alex" │
  ┌──────────┐   │     └────────┘
  │   name   │ ──┘
  └──────────┘
```

- 이제 `old_name`과 `name` 둘 다 "alex"라는 값을 가리킨다.
- 이때 `name`은 `old_name`이라는 변수 자체가 아니라, 그 순간 `old_name`이 가진 값을 받는다.
- 그래서 나중에 `old_name`에 다른 값을 넣어도 `name`은 그대로 "alex"다.

```js
old_name = "bob";
console.log(name);       // alex (바뀌지 않음)
```

- 참고: 배열이나 객체를 이렇게 할당하면 두 변수가 같은 상자 하나를 함께 가리켜서, 한쪽에서 안의 내용을 바꾸면 다른 쪽에서도 바뀐 게 보인다. 배열·객체를 배울 때 다시 다룬다.

### 6-4. 할당(=)의 규칙

`=`는 "같다"가 아니라 "오른쪽 값을 왼쪽 변수에 넣어라"라는 뜻이다. 그래서 왼쪽에는 반드시 변수가 와야 한다.

| 코드 | 가능 여부 | 이유 |
| --- | --- | --- |
| `변수 = 값` (예: `name = "alex"`) | O | 값을 변수에 저장 |
| `변수 = 변수` (예: `name = old_name`) | O | 오른쪽 변수의 값을 왼쪽 변수에 저장 |
| `값 = 값` (예: `"alex" = "bob"`) | X | 값에는 다른 값을 넣을 수 없음 |
| `값 = 변수` (예: `"alex" = name`) | X | 왼쪽이 변수가 아님 |

같은지 비교할 때는 `===`를 쓴다. (예: `name === "alex"`)

### 6-5. 변수 이름 규칙

반드시 지켜야 하는 규칙 (어기면 에러):

| 규칙 | 가능 | 불가능 |
| --- | --- | --- |
| 첫 글자는 문자, `_`, `$`만 | `score`, `_temp`, `$el` | `1st`, `10` |
| 그다음엔 숫자도 가능 | `player2` | - |
| 띄어쓰기 금지 | `userName` | `user name` |
| 하이픈(-) 금지 (빼기로 읽힘) | `bgDanger` | `bg-danger` |
| 예약어 금지 | `myClass`, `isTrue` | `let`, `const`, `class`, `if`, `for`, `return`, `function`, `true`, `null` |
| 대소문자 구분 | `name`과 `Name`은 서로 다른 변수 | - |

- JavaScript에서는 여러 단어를 이을 때 `userName`처럼 두 번째 단어부터 첫 글자를 대문자로 쓰는 방식(camelCase)을 주로 쓴다.
- CSS class 이름은 `bg-danger`처럼 하이픈을 쓰지만, JS 변수 이름에는 하이픈을 쓸 수 없다.

---

## 7. 한눈에 정리

| 구분 | 키워드 | 한 줄 |
| --- | --- | --- |
| CSS | Grid | 행과 열을 동시에 나누는 2차원 레이아웃 |
| CSS | `repeat()`, `fr` | 같은 크기 반복, 남은 공간 비율 나누기 |
| CSS | `grid-template-areas` | 칸에 이름을 붙여 큰 칸 만들기 |
| CSS | Bootstrap | class 이름만으로 레이아웃·디자인을 만드는 프레임워크 |
| CSS | `d-flex` 등 | CSS 한 줄을 class 하나로 |
| CSS | `container > row > col` | Bootstrap의 12칸 격자 |
| JS | JavaScript | 웹 화면의 동작을 담당하는 언어 |
| JS | Node.js | 브라우저 없이 JS를 실행하는 환경 |
| JS | `let` / `const` | 바뀌는 변수 / 바뀌지 않는 상수 |
| JS | RAM | 실행 중에만 값을 저장하는 공간 |
| JS | `=` | 오른쪽 값을 왼쪽 변수에 넣는 할당 |
