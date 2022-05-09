checklogin()

function checklogin(){
    if (sessionStorage["loggedIn"] != null){
        let username = sessionStorage["loggedIn"]
        let loginPopup = document.getElementById("loginPopup")

        while (loginPopup.firstChild){
            loginPopup.removeChild(loginPopup.firstChild)
        }
        loginPopup.style = "height: 150px"

        let loggedInText = document.createElement("p")
        let logOutBtn = document.createElement("button")

        loggedInText.innerHTML = "Logged in as " + username
        logOutBtn.innerHTML = "Log Out"

        loginPopup.appendChild(loggedInText)
        loginPopup.appendChild(logOutBtn)
        logOutBtn.onclick = ()=>{logOut()}

        loginPopup.style.display = "none"
        
    }
}


function login(){
    if (Storage !== undefined){
        let username = document.getElementById("usernameLogin").value
        let password = document.getElementById("passwordLogin").value

        if (localStorage[username] == undefined){
            alert("This username does not exist")
            return
        }
        
        let userStorage = JSON.parse(localStorage[username])

        if (userStorage.password != password){
            alert("The password does not match the username")
            return
        }

        alert("Logged in successfully")
        sessionStorage.setItem("loggedIn", username)
        window.location.reload()
        
    }
    else{
        alert("browser storage not supported")
    }
}


function logOut(){
    if (sessionStorage["loggedIn"] == null){
        return
    }

    sessionStorage.removeItem("loggedIn")
    window.location.reload()
}
