const countdownItemsContainer = document.querySelector(".countdown__items");
const countdownHeading = document.querySelector(".countdown__heading");
const formHeading = document.querySelector(".countdown__form-heading");
const countdownEndBtn = document.querySelector(".countdown__form-btn--end");
const countdownItems = document.querySelectorAll(".countdown__item h3");
const countdownForm = document.querySelector(".countdown__form");
const leadingZero = (x) => {
  return x < 10 ? "0" + x : x;
};

const tempDate = new Date();
const tempYear = tempDate.getFullYear();
const tempMonth = tempDate.getMonth();
const tempDay = tempDate.getDate();

// add 10 days to tempDay - app always displays countdown
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 12, 0, 0);
// const futureDate = new Date(2022, 7, 25, 12, 0, 0);

const year = futureDate.getFullYear();
const month = futureDate.getMonth();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();

//   futureDate in ms
const futureTime = futureDate.getTime();

// 1s = 1000ms
// 1min = 60s
// 1h = 60min
// 1d = 24h

// oneDay in ms
const oneDay = 24 * 60 * 60 * 1000;
// oneHour in ms
const oneHour = 60 * 60 * 1000;
// one min in ms
const oneMinute = 60 * 1000;

const getRemainingTime = () => {
  const now = new Date().getTime();

  const remainingTime = futureTime - now;

  // calculations
  let days = Math.floor(remainingTime / oneDay);
  let hours = Math.floor((remainingTime % oneDay) / oneHour);
  let mins = Math.floor((remainingTime % oneHour) / oneMinute);
  let secs = Math.floor((remainingTime % oneMinute) / 1000);

  let calculatedValues = [days, hours, mins, secs];

  countdownItems.forEach((item, i) => {
    item.innerHTML = leadingZero(calculatedValues[i]);
  });

  if (remainingTime < 0) {
    clearInterval(coundownInterval);
    countdownHeading.innerHTML = "Countdown completed";

    countdownItemsContainer.innerHTML = "";
    countdownForm.innerHTML = "";
    countdownEndBtn.classList.add("active");
  }
};

const coundownInterval = setInterval(getRemainingTime, 1000);

getRemainingTime();

// form validation
const form = document.querySelector(".countdown__form");
const email = document.querySelector(".countdown__email-input");
const msgContainer = document.querySelector(".countdown__info-msg");
const modalContainer = document.querySelector(".countdown__modal-container");
const modalCloseBtn = document.querySelector("#modal-close");

const isMailValid = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const checkEmail = () => {
  const emailValue = email.value.trim();

  if (emailValue === "") {
    setError(email, "Email cannot be blank...");
  } else if (!isMailValid(emailValue)) {
    setError(email, "Whoops, make sure it's an email");
  } else {
    setSuccess(email, "");
  }
};

const setError = (input, msg) => {
  input.className = "countdown__email-input countdown__email-input--error";
  msgContainer.textContent = msg;
};

const setSuccess = (input, msg) => {
  input.className = "countdown__email-input";
  msgContainer.textContent = msg;
  modalContainer.classList.add("active-modal");
  input.value = ""
};

form.addEventListener("submit", (e) => {
  checkEmail();
  e.preventDefault();
  if (email.classList.contains("countdown__email-input--error")) {
    e.preventDefault();
  }
});

modalCloseBtn.addEventListener("click", () => {
  modalContainer.classList.remove("active-modal");
});
