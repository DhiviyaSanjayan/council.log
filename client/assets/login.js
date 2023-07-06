const form = document.querySelector("form");
const submitBtn = document.querySelector("#submit-button");
const incorrectCredential = document.querySelector(".incorrect-credential");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  //   Check if the warning is shown. If yes, remove it.
  if (Array.from(incorrectCredential.classList).indexOf("hidden") === -1) {
    incorrectCredential.classList.add("hidden");
  }
  await logIn(form.username.value, form.password.value);
});

async function logIn(username, password) {
  try {
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 200 && !data.user.isVerified) {
      alert("Your account is not yet verified. Please check your email.");
    } else if (res.status === 200 && data.user.isVerified) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      window.location.replace(`../`);
    }
  } catch (error) {
    incorrectCredential.classList.remove("hidden");
    return;
  }
}
