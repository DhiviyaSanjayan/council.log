const greeting = document.querySelector(".greeting-username");
const token = localStorage.getItem("token");
const logoutBtn = document.querySelector(".log-out-button");
const hostLesson = document.querySelector("#hostLesson");
const welcomeBack = document.querySelector(".welcome-back");
const classTitle = document.querySelector(".body-title");
const teacherName = document.querySelector(".teacher-title");
const dateTime = document.querySelector(".date-time");
const duration = document.querySelector(".duration");
const description = document.querySelector(".description");
const address = document.querySelector(".address");
const joinBtn = document.querySelector(".join-button");
let classId = new URLSearchParams(window.location.search).get("id")
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
async function checkRegisteredBefore() {
  const res = await fetch("http://localhost:3000/registration");
  return await res.json();
}
getUser(token).then((user) => {
  if (!user.error && user.isVerified) {
    greeting.textContent = user.firstName;
    logoutBtn.textContent = "Log Out";
    welcomeBack.textContent = `Welcome back, `;
    getClass().then(async (classInfo) => {
      console.log(classInfo);
      const teacherInfo = await getTeacherName();
      const teacher = teacherInfo.find(
        (user) => user.id === classInfo.teacher_id
      );
      classTitle.textContent = classInfo.className;
      teacherName.textContent = `taught by ${teacher.firstName} ${teacher.lastName}`;
      dateTime.textContent = `${classInfo.classTime.slice(
        0,
        10
      )}, ${classInfo.classTime.slice(11, 16)}`;
      duration.textContent = `${classInfo.duration} minutes`;
      description.textContent = classInfo.description;
      address.textContent = classInfo.address;
      // check if the user is the teacher of the course
      if (user.id === teacher.id) {
        console.log("run");
        joinBtn.classList.add("delete-danger");
        joinBtn.textContent = "Delete Lesson";
        joinBtn.addEventListener("click", async () => {
          const res = await fetch(
            `http://localhost:3000/class/${classInfo.id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            alert("Your Lesson has been removed.");
            window.location.replace("../");
          }
        });
      } else {
        joinBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          const registerRecord = await checkRegisteredBefore();
          const currentClass = await getClass();
          const currentUser = await getUser(token);
          const filteredRecord = registerRecord.filter(
            (el) =>
              el.userId === currentUser.id && el.classId === currentClass.id
          );

          if (filteredRecord.length > 0) {
            if (filteredRecord[0].role === "student") {
              return alert("You have already register to the course.");
            } else if (filteredRecord[0].role === "teacher") {
              return alert("You are the teacher of this class!");
            }
          }
          const res = await fetch("http://localhost:3000/registration", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: currentUser.id,
              classId: currentClass.id,
              role: "student",
            }),
          });
          const data = await res.json();
          if (res.status === 201) {
            alert("You have successfully registered to the class!");
          }
          console.log(data);
        });
        logoutBtn.addEventListener("click", (e) => {
          e.preventDefault();
          localStorage.removeItem("token");
          window.location.replace("../login");
        });
      }
    });
  } else {
    window.location.replace("../login");
  }
});



// Obtain the address from your API route
fetch(`http://localhost:3000/class/${classId}/address`)
  .then(response => response.json())
  .then(data => {
    const address = data.address;


    console.log(`ADDRESS IS${encodeURIComponent(address)}`)
    // Use Mapbox Geocoding API to retrieve coordinates for the address
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWxsaW90Y2xvd2VzIiwiYSI6ImNsanJhbjIwajBndHQzanM1OGx2d2w1azMifQ.ut8qjqZGltsfhsImDTS1Sw`)
      .then(response => response.json())
      .then(data => {
        const coordinates = data.features[0].geometry.coordinates; // Extract the coordinates from the response

        // Initialize the map with the obtained coordinates
        mapboxgl.accessToken = 'pk.eyJ1IjoiZWxsaW90Y2xvd2VzIiwiYSI6ImNsanJhbjIwajBndHQzanM1OGx2d2w1azMifQ.ut8qjqZGltsfhsImDTS1Sw';
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: coordinates,
          zoom: 15
        });

        // Add a marker to the map at the specified coordinates
        new mapboxgl.Marker({
          color: 'red' // Customize the marker color if desired
        })
        .setLngLat(coordinates)
        .addTo(map);
    })
    .catch(error => {
      console.error('Error retrieving coordinates:', error);
    });
})
.catch(error => {
  console.error('Error retrieving address:', error);
});
