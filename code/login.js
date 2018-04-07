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
    moveTo("game");
    startGame();
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
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