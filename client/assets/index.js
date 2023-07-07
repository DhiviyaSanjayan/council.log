const greeting = document.querySelector(".greeting-username");
const token = localStorage.getItem("token");
const logoutBtn = document.querySelector(".log-out-button");
const hostLesson = document.querySelector("#hostLesson");
const joinLesson = document.querySelector("#joinLesson");
const welcomeBack = document.querySelector(".welcome-back");
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  window.location.replace("./login");
});
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
getUser(token).then((user) => {
  if (!user.error && user.isVerified) {
    greeting.textContent = user.firstName;
    logoutBtn.textContent = "Log Out";
    welcomeBack.textContent = `Welcome back, `;
  }
});

hostLesson.addEventListener("click", () => {
  window.location.replace("./create-lesson");
});
joinLesson.addEventListener("click", () => {
  window.location.replace("./join-lesson");
});
