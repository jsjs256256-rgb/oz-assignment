# JS 2일차 정리: 자료형, 변수, 연산, 조건문, 반복문, 배열, 객체, 함수

목차

1. 변수 선언 (let, const)
2. 자료형 (number, string, boolean, null, undefined)
3. 타입 확인 (typeof)
4. 산술 연산
5. 비교 연산
6. 논리 연산
7. 문자열 연산
8. 조건문 (if, else if, else)
9. 반복문 (for, while)
10. 배열 (Array)
11. 객체 (Object)
12. 함수 (Function)
13. 참고: 상수와 하이퍼파라미터

---

## 1. 변수 선언 (let, const)

### 1-1. 선언과 할당

```js
let name;          // 선언: name이라는 이름표를 만든다 (값은 아직 없음)
name = "alex";     // 할당: 이름표에 값을 넣는다

let age = 20;      // 선언과 할당을 한 번에
```

| 언어 | 선언과 할당 |
| --- | --- |
| Python | `name = "alex"` 처럼 값을 넣는 순간 변수가 생긴다. 선언만 따로 할 수 없다. |
| JavaScript | `let name;`으로 선언만 먼저 하고, 값은 나중에 넣을 수 있다. |

- 선언만 하고 값을 넣지 않은 변수에는 `undefined`가 들어 있다.
- 선언하지 않은 변수를 쓰면 에러가 난다. (`ReferenceError: age is not defined`)

### 1-2. let과 const

```js
let age = 20;
age = 30;            // OK: let은 다시 할당 가능
console.log(age);    // 30

const pi = 3.141592;
pi = 3.15;           // 에러: TypeError: Assignment to constant variable.
```

| 키워드 | 재할당 | 선언만 따로 | 사용 |
| --- | --- | --- | --- |
| `let` | 가능 | 가능 (`let a;`) | 값이 바뀌는 변수 |
| `const` | 불가능 | 불가능 (`const a;`는 에러) | 바뀌지 않는 값. 기본으로 const를 쓰고, 바꿔야 할 때만 let |

- 같은 이름으로 `let`을 두 번 선언하면 에러가 난다. (`let a = 1; let a = 2;`)
- 옛날 코드에는 `var`도 보이지만, 지금은 `let`과 `const`를 쓴다.

## 2. 자료형

| 자료형 | 뜻 | 예시 | Python에서는 |
| --- | --- | --- | --- |
| number | 숫자 (정수와 소수 구분 없음) | `10`, `3.14`, `-1` | int + float |
| string | 문자열 | `"alex"`, `'hello'` | str |
| boolean | 참/거짓 | `true`, `false` (소문자) | `True`, `False` (대문자) |
| null | 일부러 비워 둔 값 | `null` | None |
| undefined | 아직 값이 정해지지 않음 | `let score;` | (없음) |

### 2-1. number

```js
let a = 10;
let b = 3.14;
console.log(a + b);        // 13.14
console.log(typeof a);     // number
console.log(typeof b);     // number  (정수, 소수 모두 number)
```

특별한 number 값:

- `NaN` (Not a Number): 숫자로 계산할 수 없을 때. 예) `Number("abc")`
- `Infinity`: 무한대. 예) `10 / 0` (Python은 에러가 나지만 JS는 Infinity)

### 2-2. string

```js
let username = "alex";
console.log(typeof username);   // string
```

작은따옴표, 큰따옴표, 백틱(`` ` ``) 모두 문자열이다.

### 2-3. boolean

```js
let isStudent = true;
let hasTicket = false;
console.log(typeof isStudent);  // boolean
```

boolean 변수 이름은 `is~`, `has~`처럼 짓는 경우가 많다.

### 2-4. null과 undefined

```js
let selectedUser = null;          // 복권 당첨자: 아직 없음을 "일부러" 표시
console.log(selectedUser);        // null

let score;                        // 선언만 하고 할당 안 함
console.log(score);               // undefined
```

| | null | undefined |
| --- | --- | --- |
| 누가 넣나 | 개발자가 직접 | JavaScript가 자동으로 |
| 뜻 | 비어 있음을 의도적으로 표시 | 아직 값이 할당되지 않음 |
| `typeof` | `"object"` (JS의 오래된 버그) | `"undefined"` |

- 값을 비워 둘 때는 `undefined`를 직접 넣기보다 `null`을 넣는다.
- `undefined`는 주로 "값을 안 넣었다"는 결과로 만나게 된다. (선언만 한 변수, 없는 속성, return 없는 함수)

## 3. 타입 확인 (typeof)

```js
console.log(typeof 10);          // number
console.log(typeof "10");        // string
console.log(typeof true);        // boolean
console.log(typeof undefined);   // undefined
console.log(typeof null);        // object  ← 주의
console.log(typeof [1, 2]);      // object  (배열도 object)
console.log(typeof {a: 1});      // object
console.log(typeof function(){}); // function
```

- `typeof`는 함수가 아니라 연산자라서 괄호 없이 `typeof 값`으로 쓴다.
- 배열인지 확인할 때는 `Array.isArray([1, 2])` → `true`

## 4. 산술 연산

```js
let a = 10;
let b = 3;

console.log(a + b);               // 13  더하기
console.log(a - b);               // 7   빼기
console.log(a * b);               // 30  곱하기
console.log(a / b);               // 3.3333333333333335  나누기 (소수까지)
console.log(a % b);               // 1   나머지
console.log(a ** b);              // 1000  거듭제곱
console.log(Math.floor(a / b));   // 3   몫 (Python의 10 // 3)
```

| 연산 | Python | JavaScript |
| --- | --- | --- |
| 나누기 | `10 / 3` → 3.333... | `10 / 3` → 3.333... |
| 몫 | `10 // 3` → 3 | `Math.floor(10 / 3)` → 3 (`//`는 JS에서 주석) |
| 나머지 | `10 % 3` → 1 | `10 % 3` → 1 |

### Math 내장 객체

미리 만들어져 있는 수학 도구 모음이다.

| 코드 | 결과 | 뜻 |
| --- | --- | --- |
| `Math.floor(3.7)` | 3 | 내림 |
| `Math.ceil(3.2)` | 4 | 올림 |
| `Math.round(3.5)` | 4 | 반올림 |
| `Math.abs(-5)` | 5 | 절댓값 |
| `Math.max(1, 5, 3)` | 5 | 최댓값 |
| `Math.min(1, 5, 3)` | 1 | 최솟값 |
| `Math.random()` | 0 이상 1 미만 | 무작위 수 |
| `Math.PI` | 3.141592... | 원주율 |

### 증감 연산

```js
let x = 0;
x += 1;   // x = x + 1
x++;      // x에 1 더하기 (Python에는 없음)
x--;      // x에서 1 빼기
```

## 5. 비교 연산

결과는 항상 boolean(`true` / `false`)이다.

### 5-1. 대소 비교

```js
console.log(10 > 5);     // true
console.log(10 < 5);     // false
console.log(10 >= 10);   // true
console.log(10 <= 9);    // false
```

표현식과 구문:

- 표현식(expression): 하나의 값으로 계산되는 코드. 예) `10 > 5` → `true`
- 구문(statement): 컴퓨터에게 무언가를 시키는 코드. 예) `console.log(...)`, `if`, `for`
- `console.log(10 > 5)`는 표현식 `10 > 5`가 먼저 `true`로 계산된 뒤 출력된다.

### 5-2. == 와 ===

```js
console.log(10 == 10);     // true
console.log(10 != 10);     // false
console.log(10 == "10");   // true   값만 비교 (타입을 맞춰서 비교)
console.log(10 === "10");  // false  값 + 타입 비교
console.log(10 !== "10");  // true
console.log(null == undefined);   // true
console.log(null === undefined);  // false
```

| 연산자 | 이름 | 비교 |
| --- | --- | --- |
| `==`, `!=` | 동등 연산자 | 타입이 다르면 자동으로 변환한 뒤 값을 비교 |
| `===`, `!==` | 일치 연산자 | 값과 타입이 모두 같아야 true |

- `10 == "10"`에서는 문자열 `"10"`이 숫자 `10`으로 바뀐 뒤 비교된다.
- 자동 변환 때문에 예상과 다른 결과가 나올 수 있어서, 실무에서는 `===`를 쓴다.

## 6. 논리 연산

| 연산자 | 이름 | 결과 |
| --- | --- | --- |
| `&&` | AND | 둘 다 true일 때만 true |
| `\|\|` | OR | 하나라도 true면 true |
| `!` | NOT | true ↔ false 뒤집기 |

| A | B | A && B | A \|\| B |
| --- | --- | --- | --- |
| true | true | true | true |
| true | false | false | true |
| false | true | false | true |
| false | false | false | false |

```js
let age = 20;
let hasId = true;

console.log(age >= 19 && hasId);   // true   (true && true)
console.log(age < 20 || !hasId);   // false  (false || false)
console.log(!hasId);               // false
```

Python과 비교: `and` → `&&`, `or` → `||`, `not` → `!`

## 7. 문자열 연산

### 7-1. + 로 이어 붙이기 (Concatenate)

```js
let firstName = "Alex";
let lastName = "Kim";
console.log(firstName + " " + lastName);   // Alex Kim
```

### 7-2. 템플릿 리터럴

백틱(`` ` ``)으로 감싸고, 변수는 `${ }` 안에 넣는다. Python의 f-string과 같다.

```js
let name = "Alex";
let age = 20;
console.log(`${name}은 ${age}살입니다.`);        // Alex은 20살입니다.
console.log(`내년에는 ${age + 1}살입니다.`);      // ${} 안에서 계산도 가능
```

```python
# Python f-string
print(f"{name}은 {age}살입니다.")
```

### 7-3. number + string: Python과의 차이

```js
console.log(10 + "20");            // "1020"  숫자가 문자열로 바뀌어 이어 붙음
console.log(10 + Number("20"));    // 30      숫자로 계산하려면 직접 변환
console.log("10" - 5);             // 5       -, *, / 는 문자열을 숫자로 바꿈
```

```python
print(10 + "20")   # TypeError: 에러 발생
print(10 + int("20"))   # 30
```

| | Python | JavaScript |
| --- | --- | --- |
| `10 + "20"` | 에러 (TypeError) | `"1020"` (자동으로 문자열 변환) |
| 특징 | 타입이 다르면 에러로 알려 줌 | 에러 대신 알아서 바꿔서 결과를 냄 |

숫자로 바꾸기: `Number("20")`, 문자열로 바꾸기: `String(20)`

## 8. 조건문 (if, else if, else)

```js
let age = 7;

if (age <= 8) {
    console.log("어린이입니다.");
} else if (age <= 19) {
    console.log("학생입니다.");
} else {
    console.log("어른입니다.");
}
```

| Python | JavaScript |
| --- | --- |
| `if 조건:` | `if (조건) {` |
| `elif 조건:` | `} else if (조건) {` |
| `else:` | `} else {` |
| 들여쓰기로 범위 표시 | `{ }`로 범위 표시 |

### truthy와 falsy

조건 자리에 boolean이 아닌 값이 오면 true 또는 false로 취급된다.

- falsy (false로 취급): `false`, `0`, `""`(빈 문자열), `null`, `undefined`, `NaN`
- truthy (true로 취급): falsy가 아닌 모든 값. 예) `1`, `-1`, `"0"`, `" "`(공백 문자열), `[]`, `{}`

```js
if (-1) {
    console.log("실행됨");   // -1은 truthy
}
```

Python과 다른 점: Python에서는 빈 리스트 `[]`가 False지만, JS에서는 빈 배열 `[]`도 truthy다.

## 9. 반복문 (for, while)

### 9-1. for

```js
// (초기값; 조건식; 증가식)
for (let x = 0; x < 3; x++) {
    console.log(x);   // 0, 1, 2
}
```

동작 순서: 초기값(`x = 0`) → 조건 확인(`x < 3`) → 본문 실행 → 증가(`x++`) → 조건 확인 → ... 조건이 false면 끝

| Python | JavaScript |
| --- | --- |
| `for x in range(3):` | `for (let x = 0; x < 3; x++) {` |
| `for x in range(2, 10, 2):` (시작, 끝, 증가량) | `for (let x = 2; x < 10; x += 2) {` |
| `for n in numbers:` | `for (const n of numbers) {` |

- `range(3)`처럼 끝만 쓰면 시작은 0, 끝 값은 포함하지 않는다.
- 배열 값을 하나씩 꺼낼 때는 `for...of`를 쓴다. (`for...in`은 객체의 키를 꺼낼 때)

### 9-2. while

조건이 true인 동안 계속 반복한다.

```js
let i = 0;
while (i < 3) {
    console.log(i);   // 0, 1, 2
    i++;              // 이 줄이 없으면 i가 계속 0이라 끝나지 않는다 (무한 루프)
}
```

- 반복 횟수가 정해져 있으면 `for`, 조건이 바뀔 때까지 반복하면 `while`
- `break`: 반복을 바로 끝냄, `continue`: 이번 차례만 건너뜀

## 10. 배열 (Array)

여러 값을 순서대로 하나로 묶은 자료형이다. Python의 list와 같다.

```js
let numbers = [10, 20, 30];

console.log(numbers[0]);        // 10  (인덱스는 0부터)
console.log(numbers.at(-1));    // 30  (뒤에서 첫 번째)
console.log(numbers.length);    // 3   (길이)

for (const n of numbers) {
    console.log(n);             // 10, 20, 30
}
```

Python과 다른 점: `numbers[-1]`은 JS에서 `undefined`다. 뒤에서부터 꺼낼 때는 `at(-1)`을 쓴다.

### 배열 활용

| 코드 | 결과 (`numbers = [10, 20, 30]`에서 시작) | Python |
| --- | --- | --- |
| `numbers.push(40)` | 맨 뒤에 추가 → `[10, 20, 30, 40]` | `append` |
| `numbers.pop()` | 맨 뒤 꺼내서 삭제 → `[10, 20]` | `pop` |
| `numbers.unshift(0)` | 맨 앞에 추가 → `[0, 10, 20, 30]` | `insert(0, x)` |
| `numbers.shift()` | 맨 앞 꺼내서 삭제 → `[20, 30]` | `pop(0)` |
| `numbers[1] = 99` | 값 수정 → `[10, 99, 30]` | 같음 |
| `numbers.includes(20)` | `true` | `20 in numbers` |
| `numbers.indexOf(20)` | `1` | `index` |
| `numbers.slice(0, 2)` | `[10, 20]` (원본은 그대로) | `numbers[0:2]` |
| `numbers.join("-")` | `"10-20-30"` | `"-".join(...)` |

## 11. 객체 (Object)

여러 값을 키(key)로 구분해서 저장하는 자료형이다. Python의 dict와 비슷하다.

### 11-1. 선언

```js
let alex = {
    name: "alex",   // 키: 값
    age: 20,
};
```

- 키에는 따옴표를 생략할 수 있다. (Python dict는 `"name"`처럼 따옴표 필요)
- 키와 값 한 쌍을 속성(property)이라고 부른다.

### 11-2. 속성 다루기

```js
// 읽기
console.log(alex.name);       // alex  (점 표기법)
console.log(alex["age"]);     // 20    (대괄호 표기법)

// 추가: 없는 키에 값을 넣으면 추가
alex.city = "Daejeon";

// 수정: 있는 키에 값을 넣으면 수정
alex["age"] += 1;             // 21

// 제거
delete alex.city;

// 존재 확인 (in)
console.log("name" in alex);  // true
console.log("city" in alex);  // false

// 없는 속성 읽기
console.log(alex.phone);      // undefined (Python dict는 KeyError)
```

- 대괄호 표기법은 키를 변수로 넣을 때 쓴다. 예) `let key = "name"; alex[key]`

### 11-3. JSON

JSON(JavaScript Object Notation)은 JavaScript의 배열과 객체 모양을 빌려 만든 데이터 주고받기 형식이다.

```json
{
    "name": "alex",
    "age": 20,
    "scores": [90, 85, 100]
}
```

- 웹에서 서버와 데이터를 주고받을 때 가장 많이 쓰는 형식이다.
- JSON에서는 키를 반드시 큰따옴표로 감싸야 한다.

## 12. 함수 (Function)

### 12-1. 함수란?

- 수학: 입력값(x)과 출력값(y)의 대응 관계. 예) y = 2x + 1
- 프로그래밍: 특정 작업을 하나로 묶어 이름을 붙이고, 필요할 때마다 재사용하는 것

함수가 하는 일: 입력 → 연산/처리 → 출력

### 12-2. 정의와 호출

```js
// 정의(define): 함수를 만들어 메모리에 저장해 둔다. 아직 실행되지 않음
function add(n1, n2) {      // n1, n2: 매개변수(parameter)
    return n1 + n2;
}

// 호출(call): 저장해 둔 함수를 실행한다
let result = add(10, 42);   // 10, 42: 인자(argument)
console.log(result);        // 52
```

```python
# Python
def add(n1, n2):
    return n1 + n2
```

| Python | JavaScript |
| --- | --- |
| `def add(n1, n2):` | `function add(n1, n2) {` |
| 들여쓰기 | `{ }` |
| `print()` | `console.log()` |

### 12-3. return

- 값을 반환: 결과값을 함수를 호출한 곳으로 돌려준다.
- 함수 종료: `return`을 만나면 함수가 바로 끝난다. 그 아래 코드는 실행되지 않는다.

```js
function add(n1, n2) {
    let result = n1 + n2;
    return result;
    console.log(100);   // 실행되지 않음 (return에서 이미 끝남)
}
```

return이 없으면:

```js
function printAdd(n1, n2) {
    console.log(n1 + n2);   // 출력만 하고 return은 없음
}

let value = printAdd(1, 2);   // 콘솔에 3 출력
console.log(value);           // undefined  (Python에서는 None)
```

`console.log`는 화면(콘솔)에 보여 주기만 하고, `return`은 값을 돌려준다. 결과를 다른 곳에서 다시 쓰려면 `return`이 필요하다.

### 12-4. 함수의 생애주기

1. 정의: 함수를 만들어 메모리에 저장
2. 호출: 이름과 `()`로 불러냄
3. 실행: 함수 안의 코드가 실행됨
4. 종료(반환): `return`으로 값을 돌려주고 끝남

정의는 한 번, 2~4는 필요할 때마다 반복된다.

### 12-5. 함수도 값이다 (일급 객체)

```js
function add(n1, n2) {
    return n1 + n2;
}

let result = add;           // () 없이 쓰면 호출이 아니라 함수 자체를 할당
console.log(result);        // [Function: add]  (Node.js에서 출력 모양)
console.log(result(1, 2));  // 3  result도 add와 같은 함수를 가리킴
```

- `add`: 함수 자체 (상자)
- `add(1, 2)`: 함수를 호출한 결과값 (3)
- JS에서 함수는 숫자, 문자열처럼 변수에 담고 넘겨줄 수 있는 값이다. 이런 성질을 일급 객체(first-class object)라고 한다.

## 13. 참고: 상수와 하이퍼파라미터 (수업 중 예시)

### 13-1. Python의 상수

Python에는 `const`가 없다. 대문자로 이름을 지어 "바꾸지 말자"고 약속한다.

```python
LEARNING_RATE = 0.5
LEARNING_RATE = 0.4   # 문법상으로는 바뀐다. 하지만 바꾸지 않기로 약속한 값
```

- Python은 규칙을 강제하기보다 사용자가 알아서 잘 쓰도록 맡기는 편이다.
- JavaScript는 `const`로 재할당 자체를 막는다.

### 13-2. 파라미터와 하이퍼파라미터

딥러닝의 학습은 `y = w × x + b`에서 데이터에 가장 잘 맞는 `w`와 `b`를 찾는 과정이다.

| 구분 | 예시 | 누가 정하나 |
| --- | --- | --- |
| 파라미터 | 가중치(weight, w), 편향(bias, b) | 모델이 학습으로 찾아냄 |
| 하이퍼파라미터 | 학습률(learning rate), 에포크(epoch) 수 | 사람이 학습 전에 정함 |

- 학습률: 한 번 업데이트할 때 파라미터를 얼마나 크게 수정할지
- 에포크: 전체 데이터를 몇 번 반복해서 학습할지
- 하이퍼파라미터는 학습 중에 바뀌지 않는 설정값이라 상수처럼 대문자 이름으로 관리하는 경우가 많다.
- 함수의 매개변수(parameter)와 모델의 파라미터는 영어 단어는 같지만 다른 개념이다.
