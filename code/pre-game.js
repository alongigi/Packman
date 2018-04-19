$(document).ready(function (e) {

    $('#preGameForm').validate({
        rules: {
            numberOfBalls: {
                required: true,
                min: 50,
                max: 90,
            },
            gameDuration: {
                required: true,
                min: 60,
            },
            numberOfMonsters: {
                required: true,
                min: 1,
                max: 3,
            },
        },
    });

    $("#preGameForm").submit(function (event) {
        event.preventDefault();

        const form = $("#preGameForm");

        if (form.valid(event)) {
            moveTo("game");

            startGame(getGameData());
        }
    });

    function getGameData() {
        const numberOfBalls = document.getElementById("numberOfBalls").value;
        const gameDuration = document.getElementById("gameDuration").value;
        const numberOfMonsters = document.getElementById("numberOfMonsters").value;

        return {numberOfBalls, gameDuration, numberOfMonsters};
    }
});