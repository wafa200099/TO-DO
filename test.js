

let taskInput=document.getElementById("task-input")
let assigneeInput=document.getElementById("assignee-input")
let submit = document.getElementById("addBtn")
let taskslist=document.getElementById("tasksList")

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
  if (taskInput.value && assigneeInput.value !== "") {
    addTaskToArray(taskInput.value, assigneeInput.value); // add task to the array of tasks
    taskInput.value = "";
    assigneeInput.value = ""; // empty tasl feild
  }
};



function addTaskToArray(taskInput, assigneeInput) {
  //task data
  const task = {
    id: Date.now(),
    taskIN: taskInput,
    assigneeIN:assigneeInput,
    isCompleted: false,
  };
  //push task on array of tasks
  arrayOfTasks.push(task);
  // add tasks to the page
  addElementsToPageFrom(arrayOfTasks);
  //add tasks to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // empty tasks div
  taskslist.innerHTML = "";
  let res = arrayOfTasks.map((element) => {
    const li = document.createElement("li");
    li.className = "tasksListelement";
    if (!element.isCompleted) {
      li.innerHTML = `
        <div class="task" data-id="${element.id}" >${element.taskIN} <br> ${element.assigneeIN}</div>
        <div class="buttons" id="${element.id}" >
          <button class="delete" >Delete</button>
          <button class="done";>Done</button>
        </div>
      `;
    } else {
      li.innerHTML = `
        <div class="task" data-id="${element.id}"><s>${element.taskIN} <br> ${element.assigneeIN}</s></div>
        <div class="buttons" id="${element.id}" >
          <button class="delete" >Delete</button>
          <button class="done";>Done</button>
        </div>
      `;
    }
    return li;
  });
  taskslist.append(...res);

  let taskbtndiv = tasksListElement.getElementsByClassName("buttons");
    
  for (let elm of taskbtndiv) {
    const taskbtns = elm.children;
    const deleteBtn = taskbtns[0];
    deleteBtn.addEventListener("click", () => {
      deleteTask(elm.id);
    });

    const doneBtn = taskbtns[1];
    doneBtn.addEventListener("click", () => {
      toggleTask(elm.id);
    });
  }

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
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].isCompleted == false
        ? (arrayOfTasks[i].isCompleted = true)
        : (arrayOfTasks[i].isCompleted = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

function clearAll() {
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("tasks");
}
