"use strict";

const prompt = require("prompt-sync")();

const validateAge = function (age) {
  return typeof age === "number" && age > 0;
};

const validateName = name => typeof name === "string" && !!name;

function validateSubscription(subscription) {
  return (
    subscription === "free" ||
    subscription === "basic" ||
    subscription === "premium"
  );
}

const getTimeOfDay = lastUserLogin => {
  if (lastUserLogin > 4 && lastUserLogin < 12) {
    return "утро";
  }

  if (lastUserLogin > 11 && lastUserLogin < 18) {
    return "день";
  }

  if (lastUserLogin > 17 && lastUserLogin < 22) {
    return "вечер";
  }

  if (lastUserLogin > 21 || lastUserLogin < 5) {
    return "ночь";
  }

  return null;
};

const getAccessLevel = subscription => {
  subscription ??= "free";

  switch (subscription) {
    case "premium":
      return "Полный доступ";
    case "basic":
      return "Ограниченный доступ";
    default:
      return "Доступ только к бесплатному контенту";
  }
};

const displayUserInfo = (name, age, timeOfDay, subscription) => {
  const username = validateName(name) ? name : "Аноним";
  const userAge = validateAge(age) ? age : "Возраст не указан";
  const userSubscription = validateSubscription(subscription)
    ? subscription
    : "free";
  const dayTime = getTimeOfDay(timeOfDay);

  console.log(
    `
      Привет, ${username}! 
      Вам ${userAge} лет${userAge < 18 ? ". Вы несовершеннолетний пользователь" : ""}.
      Сейчас ${dayTime || "Время неизвестно"}${dayTime === "ночь" ? ". Позднее время для входа" : ""}.
      Уровень доступа: ${getAccessLevel(userSubscription)}.
      Ваш бонус: ${calcBonus(age)}.
    `,
  );
};

const calcBonus = (age, subscription) => {
  let bonus = age % 10;

  switch (subscription) {
    case "premium":
      return bonus + 5;
    case "basic":
      return bonus + 3;
    default:
      return bonus + 1;
  }
};

const appStart = () => {
  const userName = prompt("Введите ваше имя: ");
  const userAge = +prompt("Введите ваш возраст: ");
  const subscriptionType = prompt(
    'Введите тип подписки из списка: 1) "free" 2) "basic" 3) "premium"',
  );
  const lastLogin = 23;

  displayUserInfo(userName, userAge, lastLogin, subscriptionType);
};

appStart();
