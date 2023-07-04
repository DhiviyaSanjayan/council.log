const form = document.querySelector("form");
const submitBtn = document.querySelector("#submit-button");
const incorrectCredential = document.querySelector(".incorrect-credential");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  //   Check if the warning is shown. If yes, remove it.
  if (Array.from(incorrectCredential.classList).indexOf("hidden") === -1) {
    incorrectCredential.classList.add("hidden");
  }
  await logIn(form.email.value, form.password.value);
});

async function logIn(email, password) {
  const res = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (res.status === 200) {
    window.location.replace("./dashboard");
  } else {
    incorrectCredential.classList.remove("hidden");
  }
}
