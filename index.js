let inputField = document.getElementById("input");
let listadd = document.getElementById("listadd");
let taskarray = [];

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    show();
  }
});

function show() {
  if (inputField.value != "") {
    addTask();
    inputField.value = "";
  } else {
    alert("add some task");
    inputField.value = "";
  }
}

function addTask() {
  let li = document.createElement("li");
  let span = document.createElement("span");

  span.className = "span-1";

  span.innerHTML = inputField.value;
  li.append(span);
  listadd.appendChild(li);
  let div = document.createElement("span");
  div.className = "bj";
  let check = document.createElement("input");
  let cross = document.createElement("button");
  let editt = document.createElement("i");
  editt.classList.add("fa-regular", "fa-pen-to-square");
  editt.id = "editn";
  check.type = "checkbox";
  cross.innerHTML = "&times;";
  div.append(check, editt, cross);
  li.append(div);

  check.addEventListener("click", () => {
    if (span.style.textDecoration != "line-through") {
      span.style.textDecoration = "line-through";
      savedata();
    } else {
      span.style.textDecoration = "none";
      savedata();
    }
  });

  cross.addEventListener("click", (e) => {
    const span = li.querySelector(".span-1");
    const value = span.innerHTML;

    const valueToDelete = value;

    taskarray = taskarray.filter((item) => item !== valueToDelete);

    e.target.closest("li").remove();

    savedata();
  });
  taskarray.push(inputField.value);
  savedata();
}

function savedata() {
  localStorage.setItem("data", listadd.innerHTML);
  localStorage.setItem("taskarray", JSON.stringify(taskarray));
}
function LoadTask() {
  const savedData = localStorage.getItem("data");
  listadd.innerHTML = savedData || "";

  const checkButtons = listadd.querySelectorAll(".bj input[type='checkbox']");
  checkButtons.forEach((checkButton) => {
    const span = checkButton.closest("li").querySelector(".span-1");
    if (span.style.textDecoration === "line-through") {
      checkButton.checked = true;
    } else {
      checkButton.checked = false;
    }
    const spans = listadd.querySelectorAll(".span-1");
    taskarray = Array.from(spans, (span) => span.textContent);

    console.log(taskarray);
    checkButton.addEventListener("click", () => {
      if (checkButton.checked) {
        span.style.textDecoration = "line-through";
      } else {
        span.style.textDecoration = "none";
      }
      savedata();
    });
  });

  //Task will be only editable  when the page get load
  const spanTexts = listadd.querySelectorAll("li");
  spanTexts.forEach((span) => {
    let newValue;
    const bjSpan = span.querySelector("#editn");
    const span1 = span.querySelector(".span-1");
    let valueToReplace;
    bjSpan.addEventListener("click", () => {
      span1.contentEditable = true;
      span1.focus();
      valueToReplace = span1.innerHTML;
    });

    span1.addEventListener("blur", () => {
      span1.contentEditable = false;
      savedata();
      newValue = span1.innerHTML;
      taskarray = taskarray.map((item) =>
        item === valueToReplace ? newValue : item
      );
    });

    span1.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        span1.contentEditable = false;
        let newValue = span1.innerHTML;
        taskarray = taskarray.map((item) =>
          item === valueToReplace ? newValue : item
        );
        savedata();
      }
    });
  });

  const crossButtons = listadd.querySelectorAll(".bj button");
  crossButtons.forEach((crossButton) => {
    crossButton.addEventListener("click", (e) => {
      const span = e.target.closest("li").querySelector(".span-1");
      const valueToDelete = span.textContent;

      taskarray = taskarray.filter((item) => item !== valueToDelete);

      e.target.closest("li").remove();
      savedata();
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  LoadTask();
});
