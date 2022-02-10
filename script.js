"use strict";
const boxContainer = document.querySelector(".box-container");
const inputValue = document.querySelector("input");
const btn = document.querySelector(".btn");
let query;
const renderError = function () {
  const markup = `
        <h4>Could not get the data please try again</h4>
    `;
  boxContainer.innerHTML = "";
  boxContainer.insertAdjacentHTML("afterbegin", markup);
};
const renderData = function (data) {
  const { main, name, weather, sys } = data;
  const markup = `
        <h2>${Math.floor(main.temp)} &#8451;</h2>
        <h3>${name},</h3>
        <h3>${sys.country}</h3>
      `;
  boxContainer.innerHTML = "";
  boxContainer.insertAdjacentHTML("afterbegin", markup);
};
const getData = async function (query) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=b07333f1f317efd1d4c0e10f02f31e5f&units=metric`
    );
    const data = await res.json();
    renderData(data);
  } catch (err) {
    renderError();
  }
};

btn.addEventListener("click", function () {
  query = inputValue.value;
  getData(query);
  inputValue.value = "";
});
inputValue.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    query = inputValue.value;
    getData(query);
    inputValue.value = "";
  }
});
