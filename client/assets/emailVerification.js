const token = new URLSearchParams(window.location.search).get("token");
if (!token) {
  window.location.replace("../");
}
async function checkToken(token) {
  const res = await fetch(
    `http://localhost:3000/user/checkEmailToken/${token}`
  );
  if (res.ok) {
    setTimeout(() => {
      window.location.replace("../login");
    }, 3000);
  } else {
    setTimeout(() => {
      window.location.replace("../");
    }, 3000);
  }
}
checkToken(token);
