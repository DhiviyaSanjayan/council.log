const greeting = document.querySelector(".greeting-username");
const token = localStorage.getItem("token");
const logoutBtn = document.querySelector(".log-out-button");
const hostLesson = document.querySelector("#hostLesson");
const welcomeBack = document.querySelector(".welcome-back");
async function getUser(token) {
  const res = await fetch("http://localhost:3000/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      token,
    }),
  });
  const result = await res.json();
  return result;
}
async function getClasses() {
  const res = await fetch("http://localhost:3000/class");
}

getUser(token).then((user) => {
  console.log(user);
  if (user.error) {
    console.log("run");
    window.location.replace("../login");
  } else {
    greeting.textContent = user.firstName;
    logoutBtn.textContent = "Log Out";
    welcomeBack.textContent = `Welcome back, `;
  }
});
