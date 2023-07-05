const greeting = document.querySelector(".greeting-username");
const token = localStorage.getItem("token");
const logoutBtn = document.querySelector(".log-out-button");
const hostLesson = document.querySelector("#hostLesson");
const joinLesson = document.querySelector("#joinLesson");
const welcomeBack = document.querySelector(".welcome-back");

logoutBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  window.location.replace("./login");
});

async function getUser(token) {
  try {
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

    if (!res.ok) {
      throw new Error("Failed to fetch user");
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Failed to fetch user" };
  }
}

async function fetchUser() {
  if (!token) {
    // Redirect to login page if no token is found
    window.location.href = '/client/login';
    return;
  }

  const user = await getUser(token);

  if (!user.error) {
    greeting.textContent = user.firstName;
    logoutBtn.textContent = "Log Out";
    welcomeBack.textContent = `Welcome back, `;
  } else {
    // Redirect to login page if user details retrieval fails
    window.location.href = '/client/login';
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const user = await response.json();

      // Populate the form with user details
      document.getElementById('username').value = user.username;
      document.getElementById('email').value = user.email;

      document.getElementById('account-form').addEventListener('submit', async (event) => {
        event.preventDefault();
      
        // Retrieve form values
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
      
        // Perform validation checks
        if (password !== confirmPassword) {
          alert('Password and Confirm Password do not match.');
          return;
        }
      
        // Prepare the updated user data
        const updatedUser = {
          username,
          email,
          password,
        };
      
        try {
          const response = await fetch('http://localhost:3000/user/:id', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedUser),
          });
      
          if (response.ok) {
            alert('User information updated successfully.');
          } else {
            alert('Failed to update user information.');
          }
        } catch (error) {
          console.error('Error updating user:', error);
          alert('An error occurred while updating user information.');
        }
      });
    } else {
      // Redirect to login page if user details retrieval fails
      window.location.href = '/client/login';
    }
  } catch (error) {
    console.error('Error retrieving user details:', error);
    alert('An error occurred while retrieving user details.');
    window.location.href = '/client/login';
  }
}

document.addEventListener('DOMContentLoaded', fetchUser);
