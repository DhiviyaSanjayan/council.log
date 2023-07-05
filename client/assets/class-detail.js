const greeting = document.querySelector(".greeting-username");
const token = localStorage.getItem("token");
const logoutBtn = document.querySelector(".log-out-button");
const hostLesson = document.querySelector("#hostLesson");
const welcomeBack = document.querySelector(".welcome-back");
const classTitle = document.querySelector(".body-title");
const teacherName = document.querySelector(".teacher-title");
const duration = document.querySelector(".duration");
const description = document.querySelector(".description");
const joinBtn = document.querySelector(".join-button");
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
async function getClass() {
  const res = await fetch(
    `http://localhost:3000/class/${new URLSearchParams(
      window.location.search
    ).get("id")}`
  );
  return await res.json();
}
async function getTeacherName() {
  const res = await fetch("http://localhost:3000/user");
  return await res.json();
}
getUser(token).then((user) => {
  console.log(user);
  if (user.error) {
    console.log("run");
    window.location.replace("../login");
  } else {
    console.log(greeting);
    greeting.textContent = user.firstName;
    logoutBtn.textContent = "Log Out";
    welcomeBack.textContent = `Welcome back, `;
  }
});
getClass().then(async (classInfo) => {
  console.log(classInfo);
  const teacherInfo = await getTeacherName();
  const teacher = teacherInfo.find((user) => user.id === classInfo.teacher_id);
  classTitle.textContent = classInfo.className;
  teacherName.textContent = `taught by ${teacher.firstName} ${teacher.lastName}`;
  duration.textContent = `${classInfo.duration} minutes`;
  description.textContent = classInfo.description;
});
