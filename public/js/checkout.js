const hamburgerBtn = document.querySelector(".hamburger");
const mobilenavigationList = document.querySelector(".mobilenavigationList");
const mobilenavigation = document.querySelector(".mobilenavigation");
const logo = document.querySelector(".logo");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  mobilenavigationList.classList.toggle("active");
  mobilenavigation.classList.toggle("active");
  logo.classList.toggle("active");
});

const decBtn = document.querySelectorAll(".dec");
const incBtn = document.querySelectorAll(".inc");
const qty = document.querySelectorAll(".qtyOne");
const lPrice = document.querySelectorAll(".lPrice");
const fPrice = document.querySelectorAll(".fPrice");
const sTotal = document.querySelector("#sTotal");
const dPrice = document.querySelector("#dPrice");
const tPrice = document.querySelector("#tPrice");


const creditCard = document.querySelector('#creditCard');
const credit = document.querySelector('.credit');
const COD = document.querySelector('#COD');

creditCard.addEventListener('click', () => {
  credit.classList.add('togggle');
});

COD.addEventListener('click', () => {
  credit.classList.remove('togggle');
})

const radio = document.querySelectorAll('.radio');
const addresses = document.getElementById('Addresses')

radio.forEach((element) => {
  element.addEventListener('change', () => {
    const data = element.value;
    addresses.innerHTML=data
  })
}); 