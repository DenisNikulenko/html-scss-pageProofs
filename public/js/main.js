// import '../js/registration'
const regBtn = document.getElementById('regBtn');
console.log(regBtn)
regBtn.onclick = function(event) {
  let regpage = document.body.appendChild(document.createElement("register-page"));
  regpage.setAttribute("markup", "../public/chunks/registration.html");
  regpage.setAttribute("css", "../public/css/registration.css");
}




// const ava = document.body.appendChild(new Image(150));
// const userId = document.cookie.split('; ')
//     .filter(item => item.indexOf('userId') === 0)[0].split('=')[1];

// let currentUser = null;

// userId
//   ? fetch(`https://curasa.glitch.me/users/${userId}`)
//     .then(response => response.json())
//     .then(user => currentUser = user)
//     .then(() => ava.src = currentUser.avatar)
//   : null
