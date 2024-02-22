function signUp() {
  const userData = {
    userName: document.getElementById("signUpName").value,
    userEmail: document.getElementById("signUpEmail").value,
    userPassword: document.getElementById("signUpPassword").value,
  };
  //console.log(userName);
  document.getElementById("signUpEmail").value = "";
  document.getElementById("signUpName").value = "";
  document.getElementById("signUpPassword").value = "";

  fetch("http://localhost:8080/postbook/webapi/twitter/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}

function signIn() {
  const userEmailInput = document.getElementById("signInEmail");
  const userPasswordInput = document.getElementById("signInPassword");
  const userData = {
    userEmail: userEmailInput.value,
    userPassword: userPasswordInput.value,
  };
  document.getElementById("signInEmail").value = "";
  userPasswordInput.value = "";
  //console.log(userName);

  fetch("http://localhost:8080/postbook/webapi/twitter/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    });
}
