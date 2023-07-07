const bodyTitle = document.querySelector(".body-title");
const teacherName = document.querySelector(".teacher-title");
const dateTime = document.querySelector(".date-time");
const duration = document.querySelector(".duration");
const address = document.querySelector(".address");
const studentList = document.querySelector(".student-list");
const token = localStorage.getItem("token");
const greeting = document.querySelector(".greeting-username");
const welcomeBack = document.querySelector(".welcome-back");
const logoutBtn = document.querySelector(".log-out-button");
const currentClassId = parseInt(
  new URLSearchParams(window.location.search).get("id")
);
async function getName(id) {
  const res = await fetch(`http://localhost:3000/user/${id}`);
  return await res.json();
}
async function getAllRegistrations() {
  const res = await fetch("http://localhost:3000/registration");
  return await res.json();
}
async function getClass(id) {
  const res = await fetch(`http://localhost:3000/class/${id}`);
  return await res.json();
}
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
  } else {
    window.location.replace("./login");
  }
});
getClass(currentClassId).then(async (classInfo) => {
  const teacher = await getName(classInfo.teacher_id);
  bodyTitle.textContent = classInfo.className;
  teacherName.textContent = `${teacher.firstName} ${teacher.lastName}`;
  dateTime.textContent = `${classInfo.classTime.slice(
    0,
    10
  )}, ${classInfo.classTime.slice(11, 16)}`;
  duration.textContent = `${classInfo.duration} minutes`;

  address.textContent = classInfo.address;
});
getAllRegistrations().then((data) => {
  const currentClassReg = data.filter(
    (el) => el.classId === currentClassId && el.role === "student"
  );
  currentClassReg.forEach(async (row) => {
    const currentStudent = await getName(row.userId);
    console.log(currentStudent);
    const p = document.createElement("p");
    p.className = "student-list-name";
    p.textContent = `${currentStudent.firstName} ${currentStudent.lastName}`;
    studentList.append(p);
  });
});
