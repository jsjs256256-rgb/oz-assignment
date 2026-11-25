// ===== 콘솔창 사칙연산 계산기 =====
// 사용법: 콘솔에 start() 입력 → 계산식 입력 (예: 1 + 2 * 3)
// start("1 + 2 * 3")처럼 계산식을 바로 넣어도 된다.

// 1. 사칙연산 함수
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// 2. 계산식 입력받기
function inputFormula() {
    return prompt("계산식을 입력하세요. (예: 1 + 2 * 3 - 4 / 2)");
}

// 3. 계산식을 숫자와 연산자로 쪼개기
// "12+3*4" 또는 "12 + 3 * 4" → [12, "+", 3, "*", 4]
function tokenize(formula) {
    const tokens = [];
    let numberText = "";   // 지금 읽고 있는 숫자 글자들

    for (let i = 0; i < formula.length; i++) {
        const char = formula[i];

        if (char === " ") {
            continue;   // 띄어쓰기는 무시
        }

        if ("0123456789.".includes(char)) {
            numberText += char;   // 숫자는 계속 이어 붙임 (12 → "1" + "2")
            continue;
        }

        if ("+-*/".includes(char)) {
            // 맨 앞이거나 연산자 바로 뒤의 "-"는 음수 부호로 본다 (예: -3, 2 * -3)
            const isSign = char === "-" && numberText === "" &&
                (tokens.length === 0 || typeof tokens[tokens.length - 1] === "string");
            if (isSign) {
                numberText = "-";
                continue;
            }

            if (numberText === "") {
                return null;   // 연산자 앞에 숫자가 없음 (예: "1 + * 2")
            }
            tokens.push(Number(numberText));
            tokens.push(char);
            numberText = "";
            continue;
        }

        return null;   // 숫자, 연산자, 띄어쓰기 말고 다른 글자가 있음
    }

    if (numberText === "") {
        return null;   // 연산자로 끝남 (예: "1 +")
    }
    tokens.push(Number(numberText));
    return tokens;
}

// 4. 계산하기 (* / 먼저, 그다음 + -)
function calculate(formula) {
    const tokens = tokenize(formula);
    if (tokens === null) {
        return "잘못된 계산식이 입력되었습니다.";
    }

    // 숫자 자리에 NaN이 있는지 확인 (예: "1..2")
    for (let i = 0; i < tokens.length; i += 2) {
        if (Number.isNaN(tokens[i])) {
            return "잘못된 숫자가 입력되었습니다.";
        }
    }

    // 1단계: 곱셈, 나눗셈을 먼저 계산해서 새 배열에 담기
    // [1, "+", 2, "*", 3] → [1, "+", 6]
    const stack = [tokens[0]];
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const right = tokens[i + 1];

        if (operator === "*") {
            const left = stack.pop();
            stack.push(multiply(left, right));
        } else if (operator === "/") {
            if (right === 0) {
                return "0으로 나눌 수 없습니다.";
            }
            const left = stack.pop();
            stack.push(divide(left, right));
        } else {
            stack.push(operator, right);   // + 와 - 는 나중에 계산
        }
    }

    // 2단계: 남은 덧셈, 뺄셈을 왼쪽부터 계산
    // [1, "+", 6] → 7
    let result = stack[0];
    for (let i = 1; i < stack.length; i += 2) {
        const operator = stack[i];
        const value = stack[i + 1];

        if (operator === "+") {
            result = add(result, value);
        } else {
            result = subtract(result, value);
        }
    }

    // 0.1 + 0.2 = 0.30000000000000004 같은 소수 오차 정리
    return Number(result.toFixed(10));
}

// 5. 실행
function start(formula) {
    let input = formula;

    // 계산식을 직접 넣지 않았으면 입력창으로 물어본다
    if (input === undefined) {
        input = inputFormula();
    }

    // 취소를 누르면 null, 아무것도 안 쓰면 ""
    if (input === null || input.trim() === "") {
        console.log("계산식을 입력해주세요.");
        return;
    }

    const result = calculate(input);

    if (typeof result === "string") {
        console.log(`에러 발생: ${result}`);
    } else {
        console.log(`${input} = ${result}`);
    }
}

console.log("계산기 준비 완료! 콘솔에 start()를 입력하세요.");
