# CSS 정리 (HTML/CSS 2일차)

## 0. 복습: HTTP와 HTML

### 0-1. 클라이언트와 서버

| 구분 | 역할 |
| --- | --- |
| 클라이언트 | 사용자를 대신해 요청을 보내는 프로그램 (예: 브라우저) |
| 서버 | 요청을 받아 작업을 처리하는 프로그램 (데이터 처리, 고성능 작업) |

### 0-2. HTTP 요청의 필수 요소

| 요소 | 뜻 | 예 |
| --- | --- | --- |
| Method | 행위, 동작 | GET(조회), POST(생성), PUT/PATCH(수정), DELETE(삭제) |
| URL | 자원(리소스)의 위치 | `/users`, `/users/1` |

데이터를 함께 보내는 방법은 두 가지다.

| 방법 | 위치 | 용도 | 예 |
| --- | --- | --- | --- |
| Query String (쿼리 파라미터) | URL 뒤 `?key=value` (띄어쓰기 없음, 여러 개는 `&`) | 조회 조건, 검색어 | `/search?q=python` |
| Body (요청 본문) | 메시지 안쪽 | 회원가입 정보처럼 실제로 보낼 데이터 | JSON `{"email": "a@example.com"}` |

### 0-3. HTTP 메시지의 구조

| 메시지 | 방향 |
| --- | --- |
| 요청 메시지 | 클라이언트 → 서버 |
| 응답 메시지 | 서버 → 클라이언트 |

둘 다 시작 줄 → 헤더 → (빈 줄) → 본문 순서로 되어 있다.

요청 메시지는 Method로 시작한다.

```
GET / HTTP/1.1              ← 시작 줄: Method + URL + HTTP 버전
Host: example.com           ← 헤더
User-Agent: curl/8.7.1      ← 헤더
```

응답 메시지는 HTTP 버전과 상태 코드(성공·실패 여부)로 시작한다.

```
HTTP/1.1 200 OK             ← 시작 줄: 버전 + 상태 코드 + 메시지
Content-Type: text/html     ← 헤더: 본문이 HTML이라는 뜻
Content-Length: 1256        ← 헤더: 본문 길이

<!doctype html> ...         ← 본문
```

- Method와 URL은 헤더가 아니라 시작 줄에 들어 있다.
- 헤더는 메타데이터, 즉 본문을 설명하는 데이터다. (본문의 형식, 길이, 보낸 프로그램 등)
- 데이터는 주로 JSON 형식으로 보낸다. JSON은 `"key": "value"` 쌍으로 이루어진다.

```json
{
  "email": "a@example.com",
  "name": "민지수"
}
```

### 0-4. label과 input 연결: for와 id

```html
<label for="query">검색어</label>
<input id="query" type="search" name="q">
```

- `label`의 `for` 값과 `input`의 `id` 값을 같게 하면 둘이 연결된다.
- 글자(label)를 클릭해도 입력 칸이 선택(포커스)되어 바로 입력할 수 있다. 선택된 칸에는 테두리 강조가 생긴다. 색은 브라우저마다 다르다.
- `id`는 요소 하나하나를 구별하는 고유한 이름(식별자)이다. 한 문서 안에서 같은 id를 두 번 쓰지 않는다.

### 0-5. Semantic HTML (의미론적 HTML)

태그 자체에 의미를 담아, 코드가 무엇을 뜻하는지 드러나게 작성하는 방식이다.

| 태그 | 의미 |
| --- | --- |
| `<div>` | 의미 없음. 단순한 묶음 |
| `<p>` | 문단 |
| `<header>` | 상단 영역 |
| `<main>` | 핵심 콘텐츠 |
| `<footer>` | 하단 정보 |
| `<section>`, `<article>`, `<nav>` | 구역, 독립된 글, 메뉴 |

- CSS를 쓰면 `<div>`를 `<h1>`처럼 크고 굵게 보이게 만들 수 있어서, 만능인 div만 쓰고 싶은 유혹이 생긴다.
- 하지만 div만 쓰면 코드만 보고는 어디가 제목이고 어디가 본문인지 알 수 없다.
- 의미가 있는 태그를 쓰면 다른 개발자가 읽기 쉽고, 검색 엔진과 화면 낭독기도 문서 구조를 이해할 수 있다.

---

## 1. CSS란?

CSS(Cascading Style Sheets)는 HTML 요소의 모양과 배치를 정하는 언어다.

- 글자 색, 크기, 폰트
- 여백, 정렬, 위치
- 레이아웃(Flex, Grid): 화면에 요소를 어떻게 배치할지
- 반응형 디자인: 화면 크기에 따라 레이아웃이 자동으로 바뀌는 디자인

HTML이 뼈대(구조)라면 CSS는 옷과 화장(모양)이다.

### 1-1. 기본 문법

```css
선택자 {
    속성: 값;
}
```

```css
h1 {
    color: blue;
    font-size: 24px;
}
```

`선택자 { 속성: 값 }`은 "선택자 조건을 만족하는 태그를 찾아서, 그 속성 값을 이 값으로 바꿔라"라는 뜻이다.

| 용어 | 영어 | 예 |
| --- | --- | --- |
| 선택자 | selector | `h1` |
| 속성 | property | `color` |
| 값 | value | `blue` |
| 선언 | declaration | `color: blue;` (속성과 값 한 쌍. 끝에 `;`) |

CSS 안의 주석은 `/* 주석 */`이다. HTML 주석 `<!-- -->`를 CSS 안에 쓰면 주석으로 인식되지 않고, 그 다음 규칙이 깨질 수 있다.

### 1-2. Cascading의 뜻: 상속과 우선순위

Cascading은 "위에서 아래로 폭포처럼 흘러내린다"는 뜻이다. CSS에서는 두 가지 성질로 나타난다.

1. 상속(Inheritance): 부모에게 준 글자 관련 스타일이 자식에게 흘러내려 간다.

    ```html
    <div style="color: blue;">
        <p>나도 파란색</p>   <!-- 부모 div의 color를 물려받음 -->
    </div>
    ```

    - `color`, `font-size`, `font-weight`, `text-align`처럼 글자 관련 속성은 상속된다.
    - `margin`, `padding`, `border`, `width`, `background-color`처럼 박스 관련 속성은 상속되지 않는다.

2. 우선순위(Cascade): 한 요소에 여러 규칙이 겹치면 정해진 순서로 하나가 이긴다. (3-3 참고)

### 1-3. 오버라이딩(Overriding)

이미 정해진 값을 새 값으로 덮어쓰는 것이다.

- 자식에게 같은 속성을 다시 지정하면, 부모에게서 물려받은 값을 덮어쓴다.

    ```html
    <div style="color: blue;">
        <p>파란색 (상속)</p>
        <p style="color: red;">빨간색 (오버라이딩)</p>
    </div>
    ```

- 같은 요소에 규칙이 여러 개면, 우선순위가 높은 규칙이 낮은 규칙을 덮어쓴다.
- 브라우저 기본 스타일(예: `<h1>`이 크고 굵게 보이는 것)도 내 CSS로 덮어쓸 수 있다.
- 공통 스타일은 부모에 한 번만 주고, 다르게 보일 자식에만 다시 지정하는 것이 깔끔하다.

---

## 2. CSS를 적용하는 세 가지 방법

### 2-1. Inline CSS (인라인 스타일)

태그 안에 `style` 속성으로 직접 쓴다.

```html
<header style="font-size: x-large; font-weight: bold; text-align: center;">민지수</header>
<main style="text-align: center;">데이터 분석</main>
<footer style="font-size: x-small; text-align: center;">Copyright &#169; 민지수</footer>
```

- 장점: 바로 적용되고 우선순위가 높다.
- 단점: 한 줄이 길어져 읽기 어렵다. 같은 스타일을 태그마다 반복해야 한다. 나중에 수정하기 어렵다.

공통 스타일을 부모 `<div>`에 한 번만 주면 반복이 줄어든다.

```html
<div style="text-align: center;">
    <header style="font-size: x-large; font-weight: bold;">민지수</header>
    <main>데이터 분석</main>
    <footer style="font-size: x-small;">Copyright &#169; 민지수</footer>
</div>
```

여기서 div를 쓰는 이유는 세 요소를 하나로 묶기 위해서다. 부모 div에 준 `text-align: center`가 자식들에게 상속되어 세 줄이 모두 가운데 정렬된다. div는 의미 없는 묶음이라 이런 용도로 쓰기 좋다.

### 2-2. Internal CSS (내부 스타일 시트)

`<head>` 안의 `<style>` 태그에 모아서 쓴다.

```html
<head>
    <style>
        div {
            text-align: center;
        }
        header {
            font-size: x-large;
            font-weight: bold;
        }
        footer {
            font-size: x-small;
        }
    </style>
</head>
```

- 장점: HTML 구조와 스타일이 분리되어 읽기 쉽다. 한 번 쓰면 해당하는 태그 모두에 적용된다.
- 단점: 그 HTML 파일 안에서만 쓸 수 있다.
- 주의: 태그 선택자 `div`로 지정하면 문서 안의 모든 div가 가운데 정렬된다. 의도한 게 아니라면 id나 class로 원하는 요소만 골라야 한다.

### 2-3. External CSS (외부 스타일 시트)

별도의 `.css` 파일로 분리하고 HTML에서 `<link>`로 불러온다.

```html
<!-- resume.html의 <head> 안 -->
<link rel="stylesheet" href="style.css">
```

```css
/* style.css */
#contents {
    text-align: center;
}
header {
    font-size: x-large;
    font-weight: bold;
}
```

- 장점: 여러 HTML 파일이 같은 CSS를 함께 쓸 수 있다. HTML과 CSS를 완전히 나눠 관리할 수 있다. 실무에서 가장 많이 쓴다.
- `href`에는 CSS 파일의 경로를 쓴다. 같은 폴더면 `style.css` 또는 `./style.css`

### 2-4. 세 방법 비교

| 방법 | 쓰는 곳 | 적용 범위 | 우선순위 | 주 용도 |
| --- | --- | --- | --- | --- |
| Inline | 태그의 `style` 속성 | 그 태그 하나 | 높음 | 간단한 테스트 |
| Internal | `<head>`의 `<style>` | 그 HTML 파일 | 선택자에 따라 | 한 페이지만 꾸밀 때 |
| External | 별도 `.css` 파일 + `<link>` | 연결한 모든 HTML 파일 | 선택자에 따라 | 실제 프로젝트 |

---

## 3. CSS Selector (선택자)

어떤 HTML 요소에 스타일을 적용할지 지정하는 규칙이다.

### 3-1. 기본 선택자

| 선택자 | 문법 | 선택 대상 | 예 |
| --- | --- | --- | --- |
| 전체 선택자 | `*` | 모든 요소 | `* { margin: 0; }` |
| 태그 선택자 | `태그이름` | 그 태그 전부 | `div`, `p` |
| class 선택자 | `.이름` | `class="이름"`인 요소들 | `.red` |
| id 선택자 | `#이름` | `id="이름"`인 요소 하나 | `#contents` |

class와 id의 차이

| | class | id |
| --- | --- | --- |
| HTML | `class="red"` | `id="contents"` |
| CSS | `.red` | `#contents` |
| 사용 | 여러 요소에 같은 이름 반복 가능 | 한 문서에 하나만 (고유) |
| 용도 | 공통 스타일 묶기 | 특정 요소 하나 지정 |

class 하나에 여러 개 붙일 수도 있다: `class="red big"`

CSS에 `.red`를 만들어도, HTML 태그에 `class="red"`를 붙이지 않으면 아무 요소에도 적용되지 않는다.

### 3-2. 그 밖의 선택자

결합자(관계) 선택자

| 선택자 | 뜻 |
| --- | --- |
| `div p` | 자손 선택자. div 안에 있는 모든 p (깊이 상관없음) |
| `div > p` | 자식 선택자. div 바로 아래 자식 p만 |
| `div + p` | 인접 형제. div 바로 다음에 오는 p 하나 |
| `div ~ p` | 일반 형제. div 뒤에 오는 모든 형제 p |

속성 선택자

| 선택자 | 뜻 |
| --- | --- |
| `a[href]` | href 속성을 가진 a |
| `input[type="text"]` | type이 text인 input |

가상 클래스 선택자: 요소의 상태를 기준으로 고른다.

| 선택자 | 뜻 |
| --- | --- |
| `:hover` | 마우스를 올렸을 때 |
| `:focus` | 입력 칸 등이 선택(포커스)되었을 때 |
| `:active` | 클릭하고 있는 순간 |
| `:nth-child(n)` | 부모 기준 n번째 자식 |

```css
#github {
    color: gray;
    text-decoration: none;      /* 링크 밑줄 없애기 */
}
#github:hover {
    text-decoration: underline; /* 마우스를 올리면 밑줄 */
}
```

선택자 연습 사이트: CSS Diner (https://flukeout.github.io/)

### 3-3. 선택자 우선순위

한 요소에 여러 규칙이 겹칠 때, 아래 표에서 위에 있을수록 강하다.

| 순위 | 종류 | 예 |
| --- | --- | --- |
| 1 | `!important` | `color: red !important;` |
| 2 | 인라인 스타일 | `style="color: red;"` |
| 3 | id 선택자 | `#contents` |
| 4 | class / 속성 / 가상 클래스 선택자 | `.red`, `[type]`, `:hover` |
| 5 | 태그 선택자 | `div`, `p` |
| 6 | 전체 선택자 | `*` |

- 규칙: id > class > tag. 범위가 좁고 구체적인 선택자일수록 이긴다.
- 우선순위가 같으면 코드에서 나중에(아래에) 쓴 규칙이 이긴다.
- `!important`는 다른 규칙을 모두 무시하게 만들어서 관리가 어려워지므로 꼭 필요할 때만 쓴다.

예시

```css
#contents {
    color: red;
}
div {
    color: blue;
}
```

```html
<div id="contents">무슨 색일까?</div>
```

결과는 빨간색이다. `div`가 아래에 있어도 id 선택자(#contents)가 태그 선택자(div)보다 강하기 때문이다. "나중 코드 승리"는 우선순위가 같을 때만 적용된다.

```html
<div id="contents" style="color: green;">무슨 색일까?</div>
```

이번에는 초록색이다. 인라인 스타일이 id 선택자보다 강하기 때문이다.

---

## 4. style 속성과 자주 쓰는 CSS 속성

### 4-1. style 속성

HTML 태그에 `style="속성: 값; 속성: 값;"` 형태로 쓰는 속성이다. 인라인 CSS가 바로 이것이다. 선언이 여러 개면 `;`로 구분한다.

```html
<p style="color: red; font-size: large;">빨갛고 큰 글자</p>
```

### 4-2. 색과 배경

| 속성 | 뜻 | 예 |
| --- | --- | --- |
| `color` | 글자 색 | `red`, `#333`, `gray` |
| `background-color` | 배경 색 | `skyblue`, `orange` |

### 4-3. 텍스트 관련 속성

| 속성 | 뜻 | 값 예시 |
| --- | --- | --- |
| `font-size` | 글자 크기 | 키워드 `xx-small` ~ `xx-large`, `16px`, `1.5em`, `1.2rem` |
| `font-weight` | 글자 굵기 | `normal`, `bold`, 숫자 `100` ~ `900` (400 = normal, 700 = bold) |
| `text-align` | 가로 정렬 | `left`, `center`, `right`, `justify`(양쪽 맞춤) |
| `font-family` | 글꼴 | `'Times New Roman', Times, serif` |
| `text-decoration` | 밑줄 등 | `none`, `underline` |

- `font-size` 키워드 순서: `xx-small` < `x-small` < `small` < `medium`(기본) < `large` < `x-large` < `xx-large`
- `font-family`는 앞의 글꼴이 없으면 다음 글꼴을 쓴다. 띄어쓰기가 있는 글꼴 이름은 따옴표로 감싼다. 마지막에는 `serif`, `sans-serif` 같은 기본 분류를 둔다.
- `text-align`은 블록 요소 안의 글자와 인라인 요소를 정렬한다. 상속되므로 부모에 주면 자식 글자도 정렬된다.
- `font` 한 줄로 쓰기(축약): 굵기 → 크기 → 글꼴 순서. 크기와 글꼴은 반드시 넣는다.

    ```css
    header {
        font: bold x-large 'Times New Roman', Times, serif;
    }
    ```

### 4-4. 아이콘: Font Awesome

웹에서 쓰는 아이콘을 글꼴처럼 제공하는 라이브러리다. (https://fontawesome.com/)

```html
<!-- head 안에서 불러오기 -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">

<!-- 사용 -->
<a id="github" href="https://github.com/jsjs256256-rgb">
    <i class="fa-brands fa-github"></i> GitHub
</a>
```

`fa-brands fa-github` class가 붙은 요소를 Font Awesome의 CSS가 찾아서 깃허브 모양 아이콘으로 바꿔 준다. 이것도 class 선택자가 동작하는 방식이다.

---

## 5. Box Model (박스 모델)

모든 HTML 요소를 사각형 박스로 보고 크기와 여백을 계산하는 규칙이다. 하나의 박스가 네 영역으로 나뉜다.

```
┌──────────────────── margin (바깥 여백) ────────────────────┐
│  ┌──────────────── border (테두리) ──────────────────┐     │
│  │  ┌──────────── padding (안쪽 여백) ────────────┐  │     │
│  │  │                                           │  │     │
│  │  │            content (내용)                  │  │     │
│  │  │         width × height                    │  │     │
│  │  │                                           │  │     │
│  │  └───────────────────────────────────────────┘  │     │
│  └─────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────┘
```

| 영역 | 뜻 | 배경색 |
| --- | --- | --- |
| content | 글자나 이미지 같은 실제 내용 | 칠해짐 |
| padding | 내용과 테두리 사이의 안쪽 여백 | 칠해짐 |
| border | 테두리 | 테두리 색 |
| margin | 테두리 바깥, 다른 요소와의 간격 | 투명 (부모 배경이 보임) |

### 5-1. 속성

```css
.box {
    width: 100px;            /* content의 가로 */
    height: 100px;           /* content의 세로 */
    padding: 50px;           /* 상하좌우 안쪽 여백 */
    border: 5px solid black; /* 두께 모양 색 */
    margin: 20px;            /* 상하좌우 바깥 여백 */
}
```

margin과 padding은 값 개수에 따라 방향이 달라진다.

| 쓰는 법 | 뜻 |
| --- | --- |
| `padding: 20px;` | 상하좌우 모두 20px |
| `padding: 10px 20px;` | 상하 10px, 좌우 20px |
| `padding: 10px 20px 30px 40px;` | 위 → 오른쪽 → 아래 → 왼쪽 (시계 방향) |
| `margin-top: 20px;` | 한 방향만 (`-top`, `-right`, `-bottom`, `-left`) |

border는 `두께 모양 색` 순서로 쓴다. 모양: `solid`(실선), `dotted`(점선), `dashed`(파선)

### 5-2. 실제 크기 계산과 box-sizing

기본값은 `box-sizing: content-box`다. 이때 `width`는 content만의 크기다.

```
실제 가로 = width + padding × 2 + border × 2
          = 100 + 50 × 2 + 5 × 2
          = 210px
```

width를 100px로 기대했지만 실제로는 210px를 차지한다. margin은 박스 크기에는 들어가지 않지만 화면에서 그만큼 자리를 더 차지한다.

`box-sizing: border-box`로 바꾸면 `width`가 border와 padding까지 포함한 전체 크기가 된다.

```css
.box {
    box-sizing: border-box;
    width: 210px;            /* 테두리까지 포함한 전체 가로가 210px */
    padding: 50px;
    border: 5px solid black;
}
```

```
실제 가로 = 210px (그대로)
content 가로 = 210 - 50 × 2 - 5 × 2 = 100px (자동으로 줄어듦)
```

단, padding과 border의 합이 width보다 크면 content가 0이 되고 박스는 그보다 작아질 수 없다.

| box-sizing | width가 뜻하는 것 | 특징 |
| --- | --- | --- |
| `content-box` (기본값) | content만 | padding, border를 더하면 커진다 |
| `border-box` | content + padding + border | 지정한 크기 그대로 보여서 계산이 쉽다 |

그래서 보통 CSS 맨 위에 모든 요소를 border-box로 맞춰 둔다.

```css
*, *::before, *::after {
    box-sizing: border-box;
}
```

### 5-3. 실습: box.html

```html
<div id="out">
    <div id="box">BOX</div>
</div>
```

```css
#out {
    background-color: skyblue;
}
#box {
    background-color: orange;
    background-clip: content-box;  /* 배경을 content 영역에만 칠함 */
    border: 1px solid black;
    padding: 20px;
    margin: 20px;
    width: 50px;
    height: 100px;
}
```

- 주황색: content 영역 (50 × 100)
- 검은 선 안쪽의 하늘색: padding 영역. `background-clip: content-box` 때문에 padding에는 주황색이 칠해지지 않아서 부모 `#out`의 하늘색이 비쳐 보인다.
- 검은 선 바깥의 하늘색: margin 영역 (부모 배경이 보임)
- 실제 가로 = 50 + 20 × 2 + 1 × 2 = 92px

### 5-4. Inline 요소와 Block 요소

화면에서 공간을 차지하는 방식에 따라 나뉜다.

| 구분 | 공간 | 예 | width/height |
| --- | --- | --- | --- |
| Block | 한 줄 전체를 차지하고 항상 새 줄에서 시작 | `div`, `p`, `h1`~`h6`, `header`, `main`, `footer` | 적용됨 |
| Inline | 내용만큼만 차지하고 같은 줄에 나란히 | `a`, `span`, `strong`, `em` | 적용 안 됨 |
| Inline-block | 같은 줄에 나란히 서지만 크기 지정 가능 | `display: inline-block` | 적용됨 |

`display` 속성으로 성질을 바꿀 수 있다: `display: block`, `display: inline`, `display: inline-block`

---


