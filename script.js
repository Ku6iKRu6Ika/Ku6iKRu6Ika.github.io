// Главные элементы
const form = document.getElementById("calc_form");
const output = document.getElementById("output");
const operands = document.querySelectorAll("button[data-type=operand]");
const operators = document.querySelectorAll("button[data-type=operator]");

// Объект с функциями операторов
const operator_functions = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b,
};

// Чтобы не перезагружалась страница при нажатии на кнопку
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let is_operator = false; // Был нажат оператор
let operator = null; // Текущий оператор
let save_value = null; // Сохраненное значение

// Сбросить активные операторы
function reset_operators() {
  operators.forEach((elem) => {
    elem.classList.remove("active");
  });
}

// Вычисляет текущю операцию
function calc() {
  return operator_functions[operator](save_value, Number(output.value));
}

// Логика нажатия на кнопки-операнды
operands.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    reset_operators();

    if (is_operator) {
      is_operator = false;
      output.value = e.target.value;
    } else if (e.target.value == ".") {
      if (!output.value.includes("."))
        output.value += ".";
    } else if (output.value == "0")
      output.value = e.target.value;
    else output.value += e.target.value;
  });
});

// Логика нажатия на кнопки-операторы
operators.forEach((elem) => {
  elem.addEventListener("click", (e) => {
    reset_operators();

    if (e.target.value == "+-") output.value = String(-Number(output.value));
    else if (e.target.value == "%")
      output.value = String(Number(output.value) / 100);
    else if (e.target.value == "=") {
      save_value = calc();
      operator = null;
      output.value = String(save_value);
    } else {
      if (!is_operator && operator) {
        save_value = calc();
        output.value = String(save_value);
      }

      is_operator = true;
      operator = e.target.value;
      save_value = Number(output.value);
      e.target.classList.add("active");
    }
  });
});

// Сброс до начального состояния
document
  .querySelector("button[data-type=clear]")
  .addEventListener("click", (e) => {
    is_operator = false;
    save_value = null;
    operator = null;
    reset_operators();
  });
