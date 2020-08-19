const body = document.querySelector("body");
const form = document.querySelector("form");
const date = form.querySelector("#date");
const result = document.getElementById("result");
const clearBtn = document.getElementById("clear-btn");

// theme vars
const darkMode = document.getElementById("darkmode-input");
const language = document.getElementById("language-input");

const darkTheme = () => {
  body.style = `color: #f0f0f0; background: #292929`;
  date.style.backgroundColor = "gray";
  date.style.color = "#f0f0f0";
  clearBtn.style.color = "#f0f0f0";
};

const lightTheme = () => {
  body.style = `color: black; background: #ffffff`;
  date.style.backgroundColor = "white";
  date.style.color = "black";
  clearBtn.style.color = "#f0f0f0";
};

// Event listeners

form.addEventListener("submit", calculateDifference);

clearBtn.addEventListener("click", () => {
  result.textContent = "Enter a birth date to calculate ! ☝";
  clearBtn.style.display = "none";
  form.reset();
});

darkMode.addEventListener("change", (e) => {
  if (e.target.checked) {
    localStorage.setItem("darkmode", true);
    darkTheme();
  } else {
    localStorage.setItem("darkmode", false);
    lightTheme();
  }
});

function checkPreferences() {
  const dark = localStorage.getItem("darkmode");
  if (dark === "true") {
    darkMode.checked = true;
    darkTheme();
  } else {
    darkMode.checked = false;
    lightTheme();
  }
}

function calculateDifference(e) {
  e.preventDefault();
  // BORN DATE VALUES
  const dateInput = new Date(date.value).toLocaleDateString();
  const dateArray = dateInput.split(".");
  let bornDay = Number(dateArray[0]);
  let bornMonth = Number(dateArray[1]);
  let bornYear = Number(dateArray[2]);

  // TODAY'S DATE VALUES
  const today = new Date().toLocaleDateString();
  const todayArray = today.split(".");
  let todayDay = Number(todayArray[0]);
  let todayMonth = Number(todayArray[1]);
  let todayYear = Number(todayArray[2]);

  // CALCULATIONS
  if (todayDay < bornDay) {
    todayDay += 30;
    todayMonth--;
  }
  if (todayMonth < bornMonth) {
    todayMonth += 12;
    todayYear--;
  }
  if (todayYear < bornYear) {
    return (result.textContent = "Stop kidding me, you must be born 😁");
  }
  const resultDay = todayDay - bornDay;
  const resultMonth = todayMonth - bornMonth;
  const resultYear = todayYear - bornYear;

  if (resultDay === 0 && resultMonth === 0)
    return (result.textContent = `Happy Birthdayy, Today is your ${resultYear}${
      resultYear === 1 ? "st" : resultYear === 2 ? "nd" : "th"
    } birthday !`);

  result.textContent = `Passed ${
    resultYear !== 0 && resultYear > 1
      ? resultYear + " years "
      : resultYear === 1
      ? resultYear + " year "
      : ""
  } ${
    resultMonth !== 0 && resultMonth > 1
      ? resultMonth + " months "
      : resultMonth === 1
      ? resultMonth + " month "
      : ""
  } ${
    resultDay !== 0 && resultDay > 1
      ? resultDay + " days "
      : resultDay === 1
      ? resultDay + " day "
      : ""
  } since you were born !`;

  clearBtn.style.display = "block";
}

checkPreferences();
