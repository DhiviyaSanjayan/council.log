const greeting = document.querySelector(".greeting-username");
const token = localStorage.getItem("token");
const logoutBtn = document.querySelector(".log-out-button");
const welcomeBack = document.querySelector(".welcome-back");

async function getUser(token) {
  const res = await fetch("http://localhost:3000/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      token,
    }),
  });
  const result = await res.json();
  return result;
}
getUser(token).then((user) => {
  if (user.error) {
    window.location.replace("../login");
  } else {
    greeting.textContent = user.firstName;
    logoutBtn.textContent = "Log Out";
    welcomeBack.textContent = `Welcome back, `;
  }
});
document
  .getElementById("create-lesson-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const category = document.getElementById("category").value;
    const className = document.getElementById("class-name").value;
    const classTime = document.getElementById("class-time").value;
    const duration = document.getElementById("duration").value;
    const description = document.getElementById("description").value;
    const address = document.getElementById("address").value;
    let teacherId;

    try {
      teacherId = localStorage.getItem("userId");




        const classData = {
            category,
            class_name: className,
            class_time: classTime,
            address,
            duration,
            description,
            teacher_id: teacherId,
        };

        const classResponse = await fetch("http://localhost:3000/class", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(classData),
        });

        if (classResponse.ok) {
            const data = await classResponse.json();
            console.log(data);
            alert("Class created successfully!");
            window.location.replace("./client/index.html");

        } else {
            const errorResponse = await classResponse.json();
            console.error("Error:", errorResponse);
            alert("An error occurred while creating the class. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while creating the class. Please try again.");
      }
   
  });
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  window.location.replace("../login");
});
