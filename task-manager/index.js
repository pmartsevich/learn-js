"use strict";

const prompt = require("prompt-sync")();

let tasks = [];
const completedTasks = [];

let completedTaskCount = 0;

const Task = (title, description) => ({
  title,
  description,
  isCompleted: false,
  createdDate: new Date(),
  completedDate: null,
});

function showTask() {
  if (tasks.length === 0) {
    return console.log("В данный момент нет активных задач");
  }

  for (const task of tasks) {
    for (let key in task) {
      console.log(`${key}: `, task[key]);
    }
  }
}

const setTask = (title, description) => {
  if (typeof title !== "string" || typeof description !== "string") {
    return console.log("Описание и название задачи должно быть строкой");
  }

  if (title === "" || description === "") {
    return console.log("Название или описание задачи не должно быть пустым");
  }

  tasks.push(Task(title, description));
};

const deleteTask = index => {
  if (tasks.length === 0) {
    return;
  }

  if (tasks[index].isCompleted) {
    tasks.splice(index, 1);
    return;
  }

  console.log("Таска еще не выполнена, удалить?");

  const choice = prompt(`
    Да - удалить
    Нет - пропустить
  `);

  if (choice === "Да") {
    tasks.splice(index, 1);
  }
};

const clearTasks = () => (tasks = []);

const completeTask = index => {
  if (typeof index !== "number") {
    return;
  }

  if (index < 0 || index >= tasks.length) {
    return;
  }

  tasks[index].isCompleted = true;
  tasks[index].completedDate = new Date();

  completedTasks.push(tasks[index]);

  completedTaskCount++;
};

const appStart = () => {
  showTask();

  setTask("title", "description");

  setTask("title2", "description2");

  showTask();

  completeTask(0);

  deleteTask(1);

  showTask();

  deleteTask(0);

  showTask();
};

appStart();
