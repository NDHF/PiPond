document.addEventListener("DOMContentLoaded", function () {

    let pondRadius = 100;
    let pondCenterX = 100;
    let pondCenterY = 100;
    let shotsInsidePond = 0;
    let totalShotsFired = 0;

    let cannonFire = new Audio("assets/cannonFire.wav");
    let thud = new Audio("assets/thud.wav");
    let thudIsPlaying = false;
    let splash = new Audio("assets/splash.wav");
    let splashIsPlaying = false;

    function getById(id) {
        return document.getElementById(id);
    }

    let pondCanvas = getById("pondCanvas");
    let ctx = pondCanvas.getContext("2d");

    function drawPond(firstTime) {
        if (firstTime !== true) {
            ctx.clearRect(0, 0, 200, 200);
        }
        ctx.beginPath();
        ctx.fillStyle = "#009933";
        ctx.fillRect(0, 0, 200, 200);
        ctx.beginPath();
        ctx.arc(100, 100, 100, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#00FFFF";
        ctx.fill();
    }
    drawPond(true);

    let counter = 0;

    function fireAway() {

        splashIsPlaying = false;
        thudIsPlaying = false;
        cannonFire.play();

        let randomX = 0;
        let randomY = 0;
        let x = 0;
        let y = 0;
        let originOfCannonball = "a";

        let shotIsInsidePond = false;

        totalShotsFired += 1;

        function functionChain() {

            function isCoordinateWithinCircle(trueOrFalse) {
                if (trueOrFalse === true) {
                    shotIsInsidePond = true;
                    shotsInsidePond = (shotsInsidePond + 1);
                }
            };

            function distanceFromCenterOfPond(randomX, randomY) {

                let distanceX = (randomX - pondCenterX);
                let distanceY = (randomY - pondCenterY);

                let c;

                function pythagoreanTheorem() {
                    let aSquared = Math.pow(distanceX, 2);
                    let bSquared = Math.pow(distanceY, 2);
                    let cSquared = (aSquared + bSquared);
                    c = Math.sqrt(cSquared);
                }
                pythagoreanTheorem();
                isCoordinateWithinCircle((c < pondRadius));
            };

            function plotRandomCoordinate() {
                randomX = Math.floor(Math.random() * (200 + 1));
                randomY = Math.floor(Math.random() * (200 + 1));
                distanceFromCenterOfPond(randomX, randomY);
            };
            plotRandomCoordinate();
        };

        function determineRandomCoordinatesQuadrant() {
            let leftHalf = ((randomX >= 0) && (randomX <= 100));
            let rightHalf = ((randomX >= 101) && (randomX <= 200));
            let upperHalf = ((randomY >= 0) && (randomY <= 100));
            let lowerHalf = ((randomY >= 101) && (randomY <= 200));

            let upperLeft = (leftHalf && upperHalf);
            let upperRight = (rightHalf && upperHalf);
            let lowerRight = (rightHalf && lowerHalf);
            let lowerLeft = (leftHalf && lowerHalf);

            if (upperLeft) {
                x = 200;
                y = 200;
                originOfCannonball = "c";
            } else if (upperRight) {
                x = 0;
                y = 200;
                originOfCannonball = "d";
            } else if (lowerRight) {
                x = 0;
                y = 0;
                originOfCannonball = "a";
            } else if (lowerLeft) {
                x = 200;
                y = 0;
                originOfCannonball = "b";
            }
        }

        function drawCannonball() {
            ctx.clearRect(0, 0, 200, 200);
            counter += 1;
            if (counter === 160) {
                clearInterval(draw);
                counter = 0;
            }
            drawPond();
            if ((Math.abs(randomX - x) > 3) && (Math.abs(randomY - y) > 3)) {
                if (originOfCannonball === "a") {
                    x = (x + (randomX - x) * .1);
                    y = (y + (randomY - y) * .1);
                } else if (originOfCannonball === "b") {
                    x = (x - (x - randomX) * .1);
                    y = (y + (randomY - y) * .1);
                } else if (originOfCannonball === "c") {
                    x = (x - (x - randomX) * .1);
                    y = (y - (y - randomY) * .1);
                } else if (originOfCannonball === "d") {
                    x = (x + (randomX - x) * .1);
                    y = (y - (y + randomY) * .1);
                }
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = "black";
                ctx.fill();
            } else {
                ctx.font = "15px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                let soundEffectText;
                if (shotIsInsidePond === true) {
                    soundEffectText = "splash";
                    if (splashIsPlaying === false) {
                        splashIsPlaying = true;
                        splash.play();
                    }
                } else if (shotIsInsidePond === false) {
                    soundEffectText = "thud";
                    if (thudIsPlaying === false) {
                        thudIsPlaying = true;
                        thud.play();
                    }
                }
                ctx.fillText(soundEffectText, x, y);
            }
        }

        function displayResults() {
            getById("totalShotsFiredSpan").innerHTML = totalShotsFired;
            getById("shotsInsidePondSpan").innerHTML = shotsInsidePond;
            let ratioOfInsideToTotal = (shotsInsidePond / totalShotsFired);
            let approximationOfPi = (ratioOfInsideToTotal * 4);
            getById("numberOfIterationsSpan").innerHTML = totalShotsFired;
            getById("approximationOfPiSpan").innerHTML = approximationOfPi;
        };
        functionChain();
        displayResults();
        determineRandomCoordinatesQuadrant();
        let draw = setInterval(drawCannonball, 30);
    }
    // fireAway();
    setInterval(fireAway, 5000);

});