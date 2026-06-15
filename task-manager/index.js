"use strict";

let task = "";
let completedTaskCount = 0;

function showTask() {
  console.log(task === "" ? "Задача отсутствует" : task);
}

const setTask = taskDescription => {
  if (typeof taskDescription !== "string") {
    return console.log("Описание задачи должно быть строкой");
  }

  if (task) {
    return console.log(
      "Не могу добавить задачу, завершите или удалите предыдущую",
    );
  }

  task = taskDescription;
};

const deleteTask = () => {
  task ? (task = "") : console.log("Задача отсутсвует");
};

const completeTask = () => {
  if (task) {
    completedTaskCount++;
  }

  deleteTask();
};

const appStart = () => {
  showTask();

  setTask("task 1");
  setTask("task 2");

  showTask();

  completeTask();

  showTask();
};

appStart();
