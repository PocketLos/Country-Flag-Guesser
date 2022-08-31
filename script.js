const asnwerBtn = document.querySelector('.answer-btn');
const answerInput = document.querySelector('.answer-input');
const img = document.querySelector('.country-img');
const hearts = document.querySelector('.life-');
const allLives = document.getElementsByClassName('lives');
const errorContainer = document.querySelector('.error-container');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal-text');
const modalClose = document.querySelector('.modal-close');
const imgContainer = document.querySelector('.img-container');

const getJSON = async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

let storeCountry = [];
let curCountry;
let life = 3;
let corAnswer = 0;

const getCountryList = async function () {
  try {
    imgContainer.innerHTML = `<div class="loading-spinner"> 
</div>`;
    storeCountry = await getJSON('https://restcountries.com/v3.1/all');
    getCountry();
    console.log(storeCountry);
  } catch (err) {
    console.log(err);
    imgContainer.innerHTML = `<h3>There seems to be a problem! Please try again later </h3>`;
  }
};

getCountryList();

const getCountry = async function () {
  try {
    const countryNumber = Math.floor(Math.random() * storeCountry.length);
    curCountry = storeCountry[countryNumber].name.common;
    console.log(storeCountry[countryNumber].name);
    imgContainer.innerHTML = `<img class="country-img" src="${storeCountry[countryNumber].flags.png}" alt="" />`;
  } catch (err) {}
};

asnwerBtn.addEventListener('click', function () {
  let answer = answerInput.value;
  if (answer === curCountry) {
    getCountry();
    corAnswer = corAnswer + 1;
    errorContainer.innerHTML = ``;
    answerInput.value = '';
  } else {
    life = life - 1;
    if (life >= 0) {
      document.querySelector(`.life-${life + 1}`).style.color = '#fed9b7';
    }
    if (life <= 0) {
      modal.classList.add('show');
      modalText.innerHTML = `
      <h1>Congratulations!</h1>
<div class="score-container">
    <h3>You have answered</h3>
    <h1>${corAnswer}</h1>
    <h3>correct answers</h3>
</div>`;
    }
    errorContainer.innerHTML = `<h3>Wrong answer! Please try again</h3>`;
  }
});

modalClose.addEventListener('click', function () {
  modal.classList.remove('show');
  getCountryList();
  life = 3;
  corAnswer = 0;
  answerInput.value = '';
  errorContainer.innerHTML = ``;
  for (let i = 0; i < allLives.length; i++) {
    allLives[i].style.color = 'red';
  }
});
