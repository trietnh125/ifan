if (localStorage.getItem("currentUser")) {
  location.href = "./index.html";
}
let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!localStorage.getItem("users")) {
    alert("No user found");
  } else {
    let users = JSON.parse(localStorage.getItem("users"));

    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let existingUser = null;
    users.forEach((element) => {
      if (element.email === email.value.trim()) {
        if (element.password === password.value.trim()) {
          existingUser = element;
        }
      }
    });

    if (existingUser) {
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      location.href = "./index.html";
    } else {
      alert("Email or password is incorrect");
    }
  }
});
