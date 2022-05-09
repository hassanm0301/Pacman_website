
// opens menu is closed and close it if opened
function toggleMenu(){
    var menu = document.getElementById("menu")
    var menuBtn = document.getElementById("menuBtn")
    if (menu.style.display == "none"){
        menu.style.display = "block"
        menuBtn.style.transform = "rotate(90deg)"
    }
    else{
        menu.style.display = "none"
        menuBtn.style.transform = "rotate(0deg)"
    }
}

// opens login popup if closed and closes it if opened
function toggleLogin(){
    var login = document.getElementById("loginPopup")
    if (login.style.display == "none"){
        login.style.display = "block"
    }
    else{
        login.style.display = "none"
    }
}