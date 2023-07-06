const token = new URLSearchParams(window.location.search).get("token");
if (!token) {
  window.location.replace("../");
}
async function checkToken(token) {
  const res = await fetch(
    `http://localhost:3000/user/checkEmailToken/${token}`
  );
  if (res.ok) {
    const showVerified = document.querySelector(".verified");
    showVerified.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("../login");
    }, 3000);
  } else {
    const showInvalid = document.querySelector(".invalid-token");
    showInvalid.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("../");
    }, 3000);
  }
}
checkToken(token);
