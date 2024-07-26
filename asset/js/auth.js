//const url =  "http://localhost:4000" // "https://food-recipe-admin-server-ae75c769cee1.herokuapp.com" //

const url = "https://food-admin-dashboard.onrender.com";

const signUp = document.querySelector(".signUp");
const login = document.querySelector(".login");

function addShortPopup(msg, status) {
  let img = "correct.png";
  if (status == "fail") {
    img = "Error.webp";
  }
  let body = document.querySelector("body");
  let text = `<div class="running_pop active">
  <img src="./asset/images/${img}" alt="" />
  <p>${msg}</p>
  <span class="close">X</span>
</div>`;

  body.insertAdjacentHTML("afterbegin", text);
  setTimeout(removePopup, 1000);
}

function removePopup() {
  body.removeChild(document.querySelector(".running_pop"));
}
// login
async function signUpUser(userData) {
  try {
    [userName, email, password, confPassword] = userData;

    const data = {
      name: userName.value,
      email: email.value,
      password: password.value,
      passwordConfirm: confPassword.value,
    };

    const result = await fetch(`${url}/api/auth/signup-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    
    if(!result.ok) {
      throw new Error("Authentication Failed!")
    }
    addShortPopup("Register Success", "correct");
    const response = await result.json();
    localStorage.setItem("token", response.token);

    window.location.href = "rescipeMainpage.html";
  } catch (err) {
   
    addShortPopup(err.message, "fail");
  }
}

//login
async function loginUser(userData) {
  console.log(userData);
  [email, password] = userData;
  console.log(email);
  try {
    
  
    // signUp.disabled=true;

    const data = {
      email: email.value,
      password: password.value,
    };
    const result = await fetch(`${url}/api/auth/login-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const response = await result.json();

    if (response.status === "fail") {
      throw new Error("Authentication Failed!");
      // addShortPopup(response.message);
    }
    addShortPopup("Logo Success", "correct");
    localStorage.setItem("token", response.token);

    window.location.href = "rescipeMainpage.html";
  } catch (err) {
    // addErrorPopup(err.message);
    console.log(err);
    addShortPopup(err.message, "fail");
    return;
  }
}

signUp.addEventListener("submit", function (e) {
  e.preventDefault();
  signUpUser(e.target);
});

login.addEventListener("submit", function (e) {
  e.preventDefault();
  loginUser(e.target);
});
