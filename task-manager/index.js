"use strict";

const prompt = require("prompt-sync")();

const tasks = [];
const completedTasks = [];

const POSITIVE_ANSWER = "да";
const NEGATIVE_ANSWER = "нет";

const createTask = (title, description) => ({
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

  if (title.trim() === "" || description.trim() === "") {
    return console.log("Название или описание задачи не должно быть пустым");
  }

  tasks.push(createTask(title, description));
};

const deleteTask = index => {
  if (tasks.length === 0) {
    return;
  }

  const task = tasks[index];

  if (!task) {
    return;
  }

  if (!task.isCompleted) {
    console.log("Таска еще не выполнена, удалить?");

    const choice = prompt(`
      ${POSITIVE_ANSWER} - удалить
      ${NEGATIVE_ANSWER} - пропустить
    `)
      .toLowerCase()
      .trim();

    if (choice === NEGATIVE_ANSWER) {
      return console.log("Таска не удалена");
    }

    if (choice !== POSITIVE_ANSWER) {
      return console.log(
        `Таска не удалена. Введено ${choice}; Ожидалось: ${POSITIVE_ANSWER}, либо ${NEGATIVE_ANSWER}`,
      );
    }
  }

  tasks.splice(index, 1);
  console.log("Таска успешно удалена!");
};

const clearTasks = () => (tasks.length = 0);

const completeTask = index => {
  const task = tasks[index];

  if (!task) {
    return;
  }

  task.isCompleted = true;
  task.completedDate = new Date();

  completedTasks.push(task);
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
