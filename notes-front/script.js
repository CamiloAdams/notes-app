const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  // window.location.href = "../shop/index.html";
}

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});

function login() {
  const email = document.getElementById("emaill").value;
  const password = document.getElementById("passwordl").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/api/auth/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(
    JSON.stringify({
      email: email,
      password: password,
    }),
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (this.status == "200") {
        localStorage.setItem("jwt", objects["token"]);
        Swal.fire({
          text: "Successful login",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#0b0217",
        }).then((result) => {
          if (result.isConfirmed) {
            const rol = objects["roles"];
            if (rol.indexOf("user") != -1) {
              localStorage.setItem("role", "user");
            } else if (rol.indexOf("admin") != -1) {
              localStorage.setItem("role", "admin");
            } else {
              // window.location.href = "./login.html";
            }
            alert("logueado");
            // window.location.href = "../shop/index.html";
          }
        });
      } else {
        Swal.fire({
          text: "Invalid password",
          icon: "error",
          confirmButtonColor: "#0b0217",
          confirmButtonText: "OK",
        });
      }
    }
  };
  return false;
}

function register() {
  // if (
  //   document.getElementById("passwordr") !=
  //     document.getElementById("passwordr_confirm")
  // ) {
  //   Swal.fire({
  //     text: "“Passwords do not match.",
  //     icon: "error",
  //     confirmButtonColor: "#0b0217",
  //     confirmButtonText: "OK",
  //   });
  //   return;
  // }
  const username = document.getElementById("usernamer").value;
  const email = document.getElementById("emailr").value;
  const password = document.getElementById("passwordr").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/api/auth/register");
  xhttp.setRequestHeader(
    "Content-Type",
    "application/json;charset=UTF-8",
  );
  xhttp.send(
    JSON.stringify({
      username: username,
      email: email,
      password: password,
    }),
  );
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      if (this.status == "200") {
        localStorage.setItem("jwt", objects["token"]);
        Swal.fire({
          text: "Registro Exitoso",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("jwt");
            // window.location.href = "./succes_register.html";
          }
        });
      } else {
        Swal.fire({
          text: "Error",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };
}
