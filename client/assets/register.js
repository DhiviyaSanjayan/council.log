const form = document.querySelector("form");
const submitBtn = document.querySelector("#submit-button");
const invalidEmail = document.querySelector("#invalidEmail");
const usedEmail = document.querySelector("#usedEmail");
const usedUsername = document.querySelector("#usedUsername");
const differentPassword = document.querySelector("#differentPassword");
const password = document.querySelector("#create-password");
const verifyPassword = document.querySelector("#verify-password");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  //   Check if the warning is shown. If yes, remove it.
  if (Array.from(invalidEmail.classList).indexOf("hidden") === -1)
    invalidEmail.classList.add("hidden");
  if (Array.from(differentPassword.classList).indexOf("hidden") === -1)
    differentPassword.classList.add("hidden");
  if (Array.from(usedEmail.classList).indexOf("hidden") === -1)
    usedEmail.classList.add("hidden");

  // validate the email
  if (!validateEmail(form.email.value)) {
    invalidEmail.classList.remove("hidden");
  }
  // Check if email is registered before
  if (checkEmailIsUsed(form.email.value)) {
    return usedEmail.classList.remove("hidden");
  }
  // Check if username is used before
  if (checkUsernameIsUsed(form.username.value)) {
    return usedUsername.classList.remove("hidden");
  }
  //   Check if two password are the same
  if (password.value !== verifyPassword.value) {
    differentPassword.classList.remove("hidden");
  }

  await registerUser(
    form.email.value,
    form.username.value,
    form.password.value
  );
});

function validateEmail(email) {
  return new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  ).test(email);
}
async function checkEmailIsUsed(email) {
  const res = await fetch("http://localhost:3000/user/checkEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  if (res.status === 404) {
    return false;
  } else {
    return true;
  }
}
async function checkUsernameIsUsed(username) {
  const res = await fetch("http://localhost:3000/user/checkEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }),
  });
  if (res.status === 404) {
    return false;
  } else {
    return true;
  }
}
async function registerUser(email, username, password) {
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      email,
      username,
      password,
      isTeacher: false,
      isStudent: false,
    },
  });
  if (res.status === 200) {
    alert("Registered successfully");
  }
}
