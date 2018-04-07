$(document).ready(function (e) {

    $(function () {
        $("#registrationBirthDay").datepicker();
    });

    $('#registrationForm').validate({
        rules: {
            registrationUserName: {
                pattern: '^[a-zA-Z]*$',
                required: true
            },
            registrationPassword: {
                pattern: '^(?=.*\\d)(?=.*[a-zA-Z]).{8,200}$',
                required: true
            },
            registrationFirstName: {
                pattern: '^[a-zA-Z]*$',
                required: true
            },
            registrationLastName: {
                pattern: '^[a-zA-Z]*$',
                required: true
            },
            registrationEmail: {
                email: true,
                required: true,
            },
            registrationBirthDay: {
                date: true,
                required: true,
            },

        },
    });

    $("#registrationForm").submit(function (event) {
        event.preventDefault();
        const form = $("#registrationForm");
        if (form.valid()) {
            createAccount();
        }
    });


});

function createAccount() {
    const userName = document.getElementById("registrationUserName").value;
    const userPassword = document.getElementById("registrationPassword").value;
    const userFirstName = document.getElementById("registrationFirstName").value;
    const userLastName = document.getElementById("registrationLastName").value;
    const userMail = document.getElementById("registrationEmail").value;
    const userBirthDay = document.getElementById("registrationBirthDay").value;

    const user = {userName, userPassword, userFirstName, userLastName, userMail, userBirthDay};
    users.push(user);

    moveTo("login");
}