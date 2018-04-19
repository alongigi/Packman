$(document).ready(function (e) {

    $('#loginForm').validate({
        rules: {
            loginUserName: {
                required: true
            },
            loginPassword: {
                required: true
            },
        },
    });

    $("#loginForm").submit(function (event) {
        event.preventDefault();
        const form = $("#loginForm");
        if (form.valid(event)) {
            loginUser();
        }
    });

});

function loginUser(event) {
    if (!isValidUserData()) {
        alert("User is not exist");
        return;
    }
    moveTo("preGame");
}

function isValidUserData() {
    const userName = document.getElementById("loginUserName").value;
    const userPassword = document.getElementById("loginPassword").value;
    const userData = {userName, userPassword};

    return isUserExist(userData);
}

function isUserExist(userData) {
    for (let i = 0; i < users.length; i++) {
        if (isUserValid(userData, users[i])) {
            return true;
        }
    }
    return false;
}

function isUserValid(userData, user) {
    return user.userName === userData.userName && user.password === userData.password;
}