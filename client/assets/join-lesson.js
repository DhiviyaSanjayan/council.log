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
    greeting.textContent = user.firstName;
    logoutBtn.textContent = "Log Out";
    welcomeBack.textContent = `Welcome back, `;
  }
});
getClasses().then(async (data) => {
  const teacherInfo = await getTeacherName();
  console.log(new Date(data[0].classTime));
  const futureLesson = data.filter(
    (el) => new Date(el.classTime).getTime() > new Date().getTime()
  );

  futureLesson.forEach((el) => {
    const tr = document.createElement("tr");
    const classCell = document.createElement("td");

    classCell.innerHTML = `<a href="../class-detail/?id=${el.id}">${el.className}</a>`;
    const categoryCell = document.createElement("td");
    categoryCell.textContent = el.category;
    const teacherCell = document.createElement("td");
    const teacherName = teacherInfo.find((user) => user.id === el.teacher_id);
    console.log(teacherName);
    teacherCell.textContent = `${teacherName.firstName} ${teacherName.lastName}`;

    tr.append(classCell);
    tr.append(categoryCell);
    tr.append(teacherCell);

    table.append(tr);
  });
});
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  window.location.replace("../login");
});


mapboxgl.accessToken = 'pk.eyJ1IjoiZWxsaW90Y2xvd2VzIiwiYSI6ImNsanJhbjIwajBndHQzanM1OGx2d2w1azMifQ.ut8qjqZGltsfhsImDTS1Sw'; // Replace 'YOUR_ACCESS_TOKEN' with your actual access token

// Create a new map instance
const map = new mapboxgl.Map({
  container: 'map', // Specify the container element ID
  style: 'mapbox://styles/mapbox/streets-v11', // Specify the map style
  center: [0, 0], // Initial center longitude and latitude
  zoom: 10 // Initial zoom level
});


// Obtain the address from your API route
fetch('/class/6/address')
  .then(response => response.json())
  .then(data => {
    const address = data.address;

    // Use Mapbox Geocoding API to retrieve coordinates for the address
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZWxsaW90Y2xvd2VzIiwiYSI6ImNsanJhbjIwajBndHQzanM1OGx2d2w1azMifQ.ut8qjqZGltsfhsImDTS1Sw`)
      .then(response => response.json())
      .then(data => {
        const coordinates = data.features[0].geometry.coordinates; // Extract the coordinates from the response

        // Initialize the map with the obtained coordinates
        mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';
        const map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: coordinates,
          zoom: 10
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
