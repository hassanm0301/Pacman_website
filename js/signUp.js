function checkInputEmpty(fieldArr){
    let empty = false
    
    for (let field of fieldArr){
        field.style = "border-color :none"
        if (field.value == ""){
            field.style = "border-color :red"
            empty = true
        }
    }
    if (empty){
        return true
    }
    return false
}

function confirmSignUp(){
    if (typeof(Storage) !== undefined){

        let usernameRegex = /^[A-Za-z\d]{3,12}$/
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W])[A-Za-z\W0-9]{8,}$/

        let password = document.getElementById("passwordSignUp")
        let confirmPassword = document.getElementById("confirmPasswordSignUp")
        let username = document.getElementById("usernameSignUp")
        let email = document.getElementById("emailSignUp")


        if (checkInputEmpty([username, password, confirmPassword, email])){
            return
        }

        if (!usernameRegex.test(username.value)){
            alert("Username should nbe 3-12 alphanumerics only")
            username.style = "border-color: red"
            return
        }

        if (!passwordRegex.test(password.value)){
            alert("password should be at least 8 characters with 1 number, 1 uppercase, 1 lowercase and 1 symbol")
            password.style = "border-color: red"
            return
        }
        
        if (password.value != confirmPassword.value){
            alert("Passwords do not match")
            confirmPassword.style = "border-color: red"
            return
        }
        let user = {}
        user.password = password.value
        user.username = username.value
        user.email = email.value

        if (localStorage[user.username] != undefined){
            alert("This username is already in use")
            username.style = "border-color: red"
            return
        }

        localStorage[user.username] = JSON.stringify(user)

        alert("User created successfully")
        window.location ="http://localhost/websites/Hangman/Index.php"

    }
    else{
        alert("The browser storage is not supported")
        return
    }
}