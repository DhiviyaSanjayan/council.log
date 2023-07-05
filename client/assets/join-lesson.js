const greeting = document.querySelector(".greeting-username");
const token = localStorage.getItem("token");
const logoutBtn = document.querySelector(".log-out-button");
const hostLesson = document.querySelector("#hostLesson");
const welcomeBack = document.querySelector(".welcome-back");
const table = document.querySelector("table");
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
  return await res.json();
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
getClasses().then((data) => {
  console.log(data);
  data.forEach((el) => {
    const tr = document.createElement("tr");
    const classCell = document.createElement("td");
    classCell.innerHTML = `<a href="./${el.id}">${el.className}</a>`;
    const categoryCell = document.createElement("td");
    categoryCell.textContent = el.category;
    const teacherCell = document.createElement("td");
    teacherCell.textContent = el.teacher_id;
    tr.append(classCell);
    tr.append(categoryCell);
    tr.append(teacherCell);
    table.append(tr);
  });
});
