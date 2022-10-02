let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let search = document.getElementById("search");
// empty array to store the task
let arrayOfTasks = [];
//check if theres tasks in local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
//trigger get data from local storage function
getDataToLocalStorageFrom();
submit.onclick = function () {
  //to check if the input field is not empty
  if (input1.value && input2.value !== "") {
    addTaskToArray(input1.value, input2.value); // add task to the array of tasks
    input1.value = "";// empty task feild
    input2.value = ""; // empty assignee feild
  }
};
tasksDiv.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("del")) {
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
  }
  if (e.target.classList.contains("done")) {
    // Toggle line For The  Completed  Task
    toggleStatusTaskWith(e.target.parentElement.getAttribute("data-id"));
    e.target.parentElement.classList.toggle("line");
    renderFooter(arrayOfTasks);
  }
});
function resetInputs() {
  input1.value = "";
  input2.value = "";
  input1.focus();
}

function addTaskToArray(taskText1, taskText2) {
  //task data
  const task = {
    id: Date.now(),
    taskcontent: taskText1,
    assignee: taskText2,
    isCompleted: false,
    Searchv: taskText1,
  };
  arrayOfTasks.push(task);
  // add tasks to the page
  addElementsToPageFrom(arrayOfTasks);
  //add tasks to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
  resetInputs();
}
function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    //create main div
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.taskcontent));
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createTextNode(task.assignee));
    //create delete button
    let button = document.createElement("button");
    button.innerHTML = `<i class="fa-solid fa-trash"  ></i>`;
    button.className = "del";
    div.appendChild(button);
     //create done button
    let donebtn = document.createElement("button");
    donebtn.innerHTML = `<i class="fa-regular fa-circle-check" ></i>`;
    donebtn.className = "done";
    if (task.isCompleted) {
      div.className = "task line";
    }
    div.appendChild(donebtn);
    tasksDiv.appendChild(div);
  });
  renderFooter(arrayOfTasks);
}
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDataToLocalStorageFrom() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}
const cancelBtn = document.getElementById("cancelDeleting");
const confirmDeleteBtn = document.getElementById("confirmDeleting");
function deleteTaskWith(taskId) {
  showConfirmBox();
  cancelBtn.addEventListener("click", closeConfirmBox);
  confirmDeleteBtn.addEventListener("click", deletion);
  function deletion() {
    confirmDeleteBtn.removeEventListener("click", deletion);
    const delelm = arrayOfTasks.findIndex((task) => task.id === taskId);
    arrayOfTasks.splice(delelm, 1);
    addElementsToPageFrom(arrayOfTasks);
    addDataToLocalStorageFrom(arrayOfTasks);
    closeConfirmBox();
  }
}
function showConfirmBox() {
  document.getElementById("overlay").hidden = false;
}
function closeConfirmBox() {
  document.getElementById("overlay").hidden = true;
}
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].isCompleted = !arrayOfTasks[i].isCompleted;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
function searchFor() {
  const searchForvalue = search.value.toString().toLowerCase();
  if (localStorage.getItem("tasks") == null)
    footer.innerHTML = `0 search result found`;

  const filterdArray = arrayOfTasks.filter(
    (task) =>
      task.taskcontent.toString().toLowerCase().includes(searchForvalue) ||
      task.assignee.toString().toLowerCase().includes(searchForvalue)
  );
  filterdArray.forEach((task) => {
    if (task.isCompleted) tasksDiv.firstChild.classList.toggle("line");
    tasksDiv.innerHTML = `
      <div class="task">${task.taskcontent} <br> ${task.assignee}
      <button  class="del"><i class="fa-solid fa-trash"></i></button>
      <button  class="done"><i class="fa-regular fa-circle-check"></i></button>
      </div>
   `;});
  addElementsToPageFrom(filterdArray);
  let searchFooter = document.getElementById("searchFooter");
  if ( filterdArray.length != 0) searchFooter.innerHTML = `${filterdArray.length} search result is found`;
  else searchFooter.innerHTML = `0 search result is found `;
  searchForvalue=" "
   

}
function renderFooter(arrayOfTasks) {
  document.getElementById("footer").innerHTML = `<span> ToDo: ${
    arrayOfTasks.length
  } </span> <span> Done: ${
    arrayOfTasks.filter((task) => {
      return task.isCompleted;
    }).length
  } </span>`;
}
