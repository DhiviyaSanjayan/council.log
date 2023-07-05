const greeting = document.querySelector(".greeting-username");
const token = localStorage.getItem("token");
const logoutBtn = document.querySelector(".log-out-button");
const hostLesson = document.querySelector("#hostLesson");
const joinLesson = document.querySelector("#joinLesson");
const welcomeBack = document.querySelector(".welcome-back");
logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("token");
  window.location.replace("../index.html");
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
  if (!user.error) {
    greeting.textContent = user.firstName;
    logoutBtn.textContent = "Log Out";
    welcomeBack.textContent = `Welcome back, `;
  }
});


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
      const response = await fetch(`http://localhost:3000/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const user = await response.json();
        console.log(user)
  
        // Populate the form with user details
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
  
        document.getElementById('change-password-link').addEventListener('click', function(event) {
          event.preventDefault();
          const passwordChangeContainer = document.getElementById('password-change-container');
          if (passwordChangeContainer.style.display === 'none' || passwordChangeContainer.style.display === '') {
            passwordChangeContainer.style.display = 'block';
          } else {
            passwordChangeContainer.style.display = 'none';
          }
        });
        
        document.getElementById('account-form').addEventListener('submit', async (event) => {
          event.preventDefault();
        
          // Retrieve form values
          const username = document.getElementById('username').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const confirmPassword = document.getElementById('confirm-password').value;
          const currentPassword = document.getElementById('current-password').value;
        
          // Perform validation checks
          if ((password !== "" && confirmPassword !== "") && password !== confirmPassword) {
            alert('Password and Confirm Password do not match.');
            return;
          }
        
          // Prepare the updated user data
          const updatedUser = {
            username,
            email,
            currentPassword,
          };
        
          if (password !== "" && confirmPassword !== "" && password === confirmPassword) {
            updatedUser.password = password;
          }
        
          try {
            const response = await fetch(`http://localhost:3000/user/${user.id}`, {
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

  document.getElementById('delete-account-btn').addEventListener('click', (event) => {
    event.preventDefault();
    
    // Display the confirmation text and the "Yes, delete" button
    document.getElementById('delete-confirm-text').style.display = 'block';
    document.getElementById('confirm-delete-account-btn').style.display = 'block';
  });
  
  document.getElementById('confirm-delete-account-btn').addEventListener('click', async (event) => {
    event.preventDefault();
  
    const response = await fetch(`http://localhost:3000/user/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (response.ok) {
      // Successfully deleted account, redirect to the index page
      localStorage.removeItem('token'); // remove the token since the user has deleted their account
      window.location.href = '/client/index.html';
    } else {
      // Handle any errors
      const responseData = await response.json();
      console.error('Failed to delete account:', responseData.error);
    }
  });
  
  document.addEventListener('DOMContentLoaded', fetchUser);
