# HTML 태그 정리 (HTML/CSS 1일차)

## 1. HTML이란?

HTML(HyperText Markup Language)은 웹 페이지의 구조를 정의하는 언어다. 제목, 문단, 이미지, 링크 같은 웹 페이지의 뼈대를 만든다.

- Markup(마크업): 글의 각 부분에 "이건 제목, 이건 문단"처럼 표시(태그)를 붙인다는 뜻이다.
- HTML은 화면의 구조를 담당하고, 꾸미기는 CSS, 동작은 JavaScript가 담당한다.

## 2. 웹과 HTML: 렌더링

```
브라우저 ──(1) HTTP GET 요청──▶ 서버
브라우저 ◀──(2) HTML 문서 응답── 서버
브라우저: (3) HTML을 읽고 화면을 그림 = 렌더링(Rendering)
```

웹 브라우저가 하는 일은 두 가지다.

1. 사용자 대신 서버에 HTTP GET 요청을 보낸다.
2. 받은 HTML을 읽고 화면으로 그려낸다. 이것을 렌더링이라고 한다.

터미널에서 `curl example.com`을 실행하면 서버가 보내 준 HTML이 글자 그대로 보인다. 브라우저는 같은 HTML을 받아서 레시피처럼 읽고 화면을 그린다.

## 3. 태그, 요소, 속성

```html
<a href="https://github.com">내 깃허브</a>
└┬┘ └──────────┬──────────┘ └──┬──┘ └┬┘
여는 태그       속성            내용   닫는 태그
└──────────────── 요소(element) ──────────┘
```

| 용어 | 뜻 | 예 |
| --- | --- | --- |
| 태그(tag) | `<태그이름>` 형태의 표시. 각 태그마다 의미와 역할이 있다 | `<p>`, `<h1>` |
| 요소(element) | 여는 태그 + 내용 + 닫는 태그 전체 | `<p>문단</p>` |
| 속성(attribute) | 태그에 추가 정보를 주는 `이름="값"` | `href="..."`, `type="a"` |
| 빈 요소 | 내용이 없어서 닫는 태그가 없는 태그 | `<br>`, `<hr>`, `<img>`, `<input>`, `<meta>` |

### 부모, 자식, 형제

태그 안에 다른 태그를 넣는 중첩 구조로 문서의 계층이 만들어진다.

```html
<body>          <!-- 부모 -->
    <h1>제목</h1>  <!-- 자식 (h1과 p는 서로 형제) -->
    <p>내용</p>    <!-- 자식 -->
</body>
```

## 4. HTML 문서의 기본 구조

VS Code에서 빈 `.html` 파일에 `!`를 입력하고 `tab`을 누르면 기본 틀이 자동으로 만들어진다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문서 제목</title>
</head>
<body>
    화면에 보이는 내용
</body>
</html>
```

| 태그 | 역할 |
| --- | --- |
| `<!DOCTYPE html>` | 이 문서가 HTML5 문서라고 브라우저에 알린다 |
| `<html lang="ko">` | 문서 전체를 감싸는 최상위 태그. `lang`은 문서의 언어(ko 한국어, en 영어) |
| `<head>` | 메타데이터 영역. 화면에 직접 보이지 않는 문서 정보를 담는다 |
| `<meta charset="UTF-8">` | 글자 인코딩. 한글이 깨지지 않게 한다 |
| `<meta name="viewport" ...>` | 모바일 등 화면 크기에 맞게 보이도록 설정 |
| `<title>` | 브라우저 탭에 보이는 제목 |
| `<body>` | 실제로 화면에 그려지는 내용 |

- 메타데이터(metadata)는 데이터에 대한 데이터, 즉 문서를 설명하는 정보라는 뜻이다.
- 대부분의 태그는 여는 태그와 닫는 태그로 이루어진다. 닫는 태그에는 `/`가 붙는다.

## 5. 텍스트 관련 태그

### 5-1. 제목 `<h1>` ~ `<h6>`

```html
<h1>가장 큰 제목</h1>
<h2>두 번째 제목</h2>
<h3>세 번째 제목</h3>
```

- h는 heading(제목)의 약자다. 숫자가 작을수록 크고 중요한 제목이다.
- 한 페이지에서 `<h1>`은 보통 대표 제목에 쓴다.

### 5-2. 문단 `<p>`, 줄바꿈 `<br>`, 구분선 `<hr>`

```html
<p>첫 번째 문단</p>
<p>두 번째 문단</p>

Hello, HTML!<br>
Hello, HTML!

<hr>
```

| 태그 | 뜻 | 특징 |
| --- | --- | --- |
| `<p>` | paragraph, 문단 | 문단 사이에 약간의 여백이 생긴다 |
| `<br>` | break, 줄바꿈 | 닫는 태그가 없다 |
| `<hr>` | horizontal rule, 가로 구분선 | 닫는 태그가 없다. 세로 구분선 태그는 없다 |

HTML은 코드에서 엔터나 띄어쓰기를 여러 번 해도 화면에는 공백 한 칸으로만 보인다. 줄을 바꾸거나 문단을 나누려면 반드시 태그(`<br>`, `<p>`)를 써야 한다.

## 6. 목록 태그 `<ul>`, `<ol>`, `<li>`

```html
<!-- Unordered List: 순서 없는 목록 -->
<ul>
    <li>Apple</li>
    <li>Banana</li>
</ul>

<!-- Ordered List: 순서 있는 목록 -->
<ol type="a">
    <li>Apple</li>
    <li>Banana</li>
</ol>
```

| 태그 | 뜻 | 화면 |
| --- | --- | --- |
| `<ul>` | Unordered List | 점(•)으로 표시 |
| `<ol>` | Ordered List | 번호로 표시 |
| `<li>` | List Item, 목록의 항목 하나 | `<ul>`, `<ol>` 안에 넣는다 |

`<ol>`의 `type` 속성으로 번호 모양을 바꿀 수 있다.

| type | 모양 |
| --- | --- |
| `1` (기본) | 1, 2, 3 |
| `a` / `A` | a, b, c / A, B, C |
| `i` / `I` | i, ii, iii / I, II, III |

## 7. 표 태그 `<table>`

### 7-1. 표의 구성

| 용어 | 다른 이름 | 뜻 |
| --- | --- | --- |
| 행(row) | 레코드(record) | 가로 한 줄. 데이터 하나 |
| 열(column) | 필드(field) | 세로 한 줄. 데이터의 속성 |
| 셀(cell) | | 칸 하나 |
| 헤더(header) | | 맨 위 제목 행 |

### 7-2. 표 태그

```html
<table border="1">
    <thead>
        <tr>
            <th>ID</th>
            <th>이름</th>
            <th>나이</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>alex</td>
            <td>20</td>
        </tr>
        <tr>
            <td>2</td>
            <td>bob</td>
            <td>30</td>
        </tr>
    </tbody>
</table>
```

| 태그 | 뜻 | 역할 |
| --- | --- | --- |
| `<table>` | table | 표 전체 |
| `<thead>` | table head | 제목 행 묶음 |
| `<tbody>` | table body | 데이터 행 묶음 (보통 하나에 모든 행을 넣는다) |
| `<tr>` | table row | 행 하나 |
| `<th>` | table header | 제목 칸 (굵게, 가운데 정렬) |
| `<td>` | table data | 데이터 칸 |

- 표는 행(`<tr>`) 단위로 만들고, 그 안에 칸(`<th>`, `<td>`)을 넣는다.
- `border="1"` 속성을 주면 테두리가 보인다.

## 8. 이미지 `<img>`

```html
<img src="profile.png" alt="프로필 사진" width="200">
```

| 속성 | 뜻 |
| --- | --- |
| `src` | source. 이미지 파일의 위치 |
| `alt` | alternative. 이미지를 불러오지 못할 때 대신 보여 줄 설명 글. 화면 낭독기도 이 글을 읽는다 |
| `width`, `height` | 이미지 크기 (px) |

- `<img>`는 닫는 태그가 없다.
- 이미지 파일은 HTML 파일과 같은 폴더에 두고 `src="profile.png"`처럼 파일 이름만 쓰는 것(상대 경로)이 좋다. `/Users/mac/Desktop/...` 같은 내 컴퓨터 전체 경로는 GitHub에 올리면 다른 사람 화면에서 보이지 않는다.
- 파일 이름에 띄어쓰기와 한글이 없으면 경로 문제가 덜 생긴다.

## 9. 링크 `<a>`

```html
<a href="https://www.google.com">구글</a>로 이동
<a href="https://github.com" target="_blank">새 탭에서 열기</a>
```

| 속성 | 뜻 |
| --- | --- |
| `href` | hypertext reference. 이동할 주소 |
| `target="_blank"` | 새 탭에서 열기 |

`<a>`는 anchor(닻)의 약자다. HTML의 H(HyperText)가 바로 이렇게 다른 문서로 연결되는 글을 뜻한다.

## 10. 폼 `<form>`, `<input>`, `<button>`, `<label>`

### 10-1. 기본 모양

```html
<form action="https://google.com/search">
    <input type="search" name="q" placeholder="검색어 입력">
    <button>입력</button>
</form>
```

| 태그 | 역할 |
| --- | --- |
| `<form>` | 사용자에게 데이터를 입력받아 서버로 보내는 영역 |
| `<input>` | 입력 칸. `type`에 따라 모양과 검사 방식이 달라진다 |
| `<button>` | 버튼. form 안에서 누르면 입력값을 전송한다 |
| `<label>` | 입력 칸의 이름표. `for`와 input의 `id`를 같게 하면 글자를 눌러도 칸이 선택된다 |

자주 쓰는 `input`의 `type`

| type | 용도 | 특징 |
| --- | --- | --- |
| `text` | 한 줄 글자 | 기본값 |
| `search` | 검색어 | 지우기(x) 버튼이 생긴다 |
| `email` | 이메일 | `@`가 없으면 전송 전에 경고한다 |
| `password` | 비밀번호 | 입력한 글자가 `●`로 가려진다 |
| `number` | 숫자 | 숫자만 입력된다 |

`placeholder`는 입력 칸에 흐리게 보이는 안내 문구다. 실제 값은 아니다.

### 10-2. form은 어떻게 데이터를 보낼까? (쿼리 파라미터)

위 검색 폼에 `python`을 입력하고 버튼을 누르면, 브라우저는 이 주소로 이동한다.

```
https://google.com/search?q=python
└────────┬─────────────┘└──┬───┘
     action 값          쿼리 파라미터
```

실제로 구글 검색창에서 python을 검색했을 때의 주소와 같다. 즉 우리가 만든 폼이 구글에 검색 요청을 보낸 것이다.

```
<input name="q">  칸에 python 입력
         │
         ▼
      ?q=python
```

각 부분의 의미

| 부분 | 코드 | 의미 |
| --- | --- | --- |
| action | `action="https://google.com/search"` | 어디로 보낼지. 데이터를 받을 서버 주소 |
| name | `name="q"` | 보낼 데이터의 이름표(key) |
| 입력값 | 사용자가 친 `python` | 보낼 데이터의 값(value) |
| method | 생략 시 `GET` | 어떤 방식으로 보낼지. GET은 데이터를 주소 뒤에 붙인다 |

정리하면 form은 이렇게 동작한다.

1. 버튼을 누르면 form 안의 입력 칸들을 모은다.
2. 각 칸의 `name`을 key로, 입력한 내용을 value로 해서 `key=value`를 만든다.
3. `action` 주소 뒤에 `?`를 붙이고 `key=value`를 이어 붙인다.
4. 그 주소로 GET 요청을 보낸다.

### 10-3. 쿼리 파라미터(Query Parameter)란?

- URL의 경로 뒤에 `?key=value` 형태로 붙여 보내는 데이터다.
- 여러 개는 `&`로 잇는다. 예: `?q=python&page=2`
- 주로 검색어, 필터, 정렬처럼 "어떻게 보고 싶은지"를 서버에 알려줄 때 쓴다.

| 코드 | 결과 주소 |
| --- | --- |
| `<input name="q">`에 python 입력 | `search?q=python` |
| `<input name="keyword">`에 python 입력 | `search?keyword=python` |
| `name` 속성을 빠뜨림 | `search?` (값이 전송되지 않음) |

- `name`은 서버와 약속한 이름이어야 한다. 구글은 검색어를 `q`라는 이름으로 받기로 정해 두었기 때문에 `name="q"`여야 검색이 된다.
- `name`이 없는 입력 칸은 전송되지 않는다.
- `action`이 비어 있으면(`action=""`) 지금 보고 있는 페이지 주소로 보낸다.
- 비밀번호처럼 주소창에 보이면 안 되는 데이터는 GET이 아니라 `method="post"`로 보내야 한다. POST는 데이터를 주소가 아니라 요청 본문(Request Body)에 담는다.

## 11. 주석

```html
<!-- 화면에 보이지 않는 메모 -->
```

- VS Code에서 `cmd + /`로 주석을 달고 풀 수 있다.
- 주석은 화면에는 안 보이지만 개발자 도구나 페이지 소스 보기에서는 누구나 볼 수 있다.

## 12. 한눈에 보는 태그 정리

| 태그 | 뜻 | 한 줄 설명 |
| --- | --- | --- |
| `<head>` | head | 문서 정보(메타데이터) 영역 |
| `<body>` | body | 화면에 보이는 내용 영역 |
| `<h1>`~`<h6>` | heading | 제목 |
| `<p>` | paragraph | 문단 |
| `<br>` | break | 줄바꿈 |
| `<hr>` | horizontal rule | 가로 구분선 |
| `<ul>` | unordered list | 순서 없는 목록 |
| `<ol>` | ordered list | 순서 있는 목록 |
| `<li>` | list item | 목록 항목 |
| `<table>` | table | 표 |
| `<thead>` / `<tbody>` | table head / body | 표의 제목 영역 / 데이터 영역 |
| `<tr>` | table row | 표의 행 |
| `<th>` / `<td>` | table header / data | 제목 칸 / 데이터 칸 |
| `<img>` | image | 이미지 |
| `<a>` | anchor | 링크 |
| `<form>` | form | 입력 데이터를 서버로 보내는 영역 |
| `<input>` | input | 입력 칸 |
| `<label>` | label | 입력 칸의 이름표 |
| `<button>` | button | 버튼 |
