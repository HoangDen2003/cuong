const email = document.getElementById("email");
const password = document.getElementById("password");
const btnShow = document.querySelector(".input-group .input-group-text");
const eyes = document.querySelectorAll(".input-group .input-group-text i");
const btnSubmit = document.querySelector("form button[type=submit]");
const notEmpty = document.querySelector(
  "form .fv-plugins-message-container .notEmpty"
);
const stringLength = document.querySelector(
  "form .fv-plugins-message-container .stringLength"
);

// validate email / username
email.addEventListener("keyup", function () {
  // to reset when user remove character
  notEmpty.classList.remove("d-block");
  notEmpty.classList.add("d-none");
  stringLength.classList.add("d-none");
  stringLength.classList.remove("d-block");
  const emailValue = email.value;
  //   const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const result = regEmail.test(emailValue);
  //   console.log(emailValue.length);

  //   check empty
  if (!emailValue) {
    notEmpty.classList.remove("d-none");
    notEmpty.classList.add("d-block");
  } else {
    notEmpty.classList.remove("d-block");
    notEmpty.classList.add("d-none");
    // check length < 6
    if (emailValue.length < 6) {
      stringLength.classList.add("d-block");
      stringLength.classList.remove("d-none");
    } else {
      stringLength.classList.add("d-none");
      stringLength.classList.remove("d-block");
    }
  }
});

// show password
var isCheckShow = false;
btnShow.addEventListener("click", function () {
  if (!isCheckShow) {
    password.type = "text";
    isCheckShow = true;
    eyes[0].classList.add("d-none");
    eyes[0].classList.remove("d-block");
    eyes[1].classList.add("d-block");
    eyes[1].classList.remove("d-none");
  } else {
    password.type = "password";
    isCheckShow = false;
    eyes[0].classList.add("d-block");
    eyes[0].classList.remove("d-none");
    eyes[1].classList.add("d-none");
    eyes[1].classList.remove("d-block");
  }
});

// click sign in
btnSubmit.addEventListener("click", function (e) {
  if (!email.value) {
    notEmpty.classList.remove("d-none");
    notEmpty.classList.add("d-block");
    e.preventDefault();
  } else {
    notEmpty.classList.remove("d-block");
    notEmpty.classList.add("d-none");
    // check length < 6
    if (email.value.length < 6) {
      stringLength.classList.add("d-block");
      stringLength.classList.remove("d-none");
      e.preventDefault();
    }
  }
});
