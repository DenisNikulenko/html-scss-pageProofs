class RegisterPage extends HTMLElement {
    constructor() {
      super()
      this.shadow = this.attachShadow({ mode: "closed" })
  
    }
  
    connectedCallback() {
      // alert('uvaga');
    }
    static get observedAttributes() {
      return ["markup", "css"]
    }
  
    attributeChangedCallback(attrName, oldVal, newVal) {
      fetch(newVal)
        .then(response => response.text())
        .then(response => {
          console.log(response);
          if (attrName === "markup") {
  
          let styles = this.shadow.innerHTML.split("<style>").length === 1 ?
            "" : this.shadow.innerHTML.split("<style>")[1].split("</style>")[0]
  
          this.shadow.innerHTML = response + `<style> ${styles} </style>`;
  
          }
          if (attrName === "css") {
            let html = this.shadow.innerHTML.split("<style>")
  
            let end = html.length === 1 ? "" : html[1].split("</style>")[1]
            this.shadow.innerHTML = html[0] + `<style> ${response}</style>` + end
          }
        })
        .then(() => this.getElems())
    }
  
    getElems() {
      this.userName = this.shadow.querySelector("#name")
      this.userEmail = this.shadow.querySelector("#input-email2")
      this.userPhone = this.shadow.querySelector("#phone")
      this.userPassword = this.shadow.querySelector("#input-password2")
      this.userPhoto = this.shadow.querySelector("#avatarka")
      this.btn = this.shadow.querySelector("#register-button")
      this.preview = this.shadow.querySelector("#preview")
  
      this.userPassword.onchange = function (event) {
        document.cookie = `hash=${Sha256.hash(this.value)}`
      }
  
      this.shadow.querySelector('input[type="file"]').onchange = function (event) {
        let file = event.target.files[0]
        file.type.indexOf("image") === 0 ? this.preview.src = URL.createObjectURL(file) :
          console.error("NOT IMAGE!!!!!")
        
      }.bind(this);
  
      this.btn.onclick = function (event) {
        console.log('click!');
        fetch("https://curasa.glitch.me/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: this.userName.value,
            email: this.userEmail.value,
            phone: this.userPhone.value,
            avatar: this.preview.src,
            passHash: Sha256.hash(this.userPassword)
          })
        })
          .then(response => response.json())
          .then(response => document.cookie = `userId=${response.id}; pass=${response.passHash};`)
      }.bind(this);
    }
  }
  customElements.define("register-page", RegisterPage)
  
  
  