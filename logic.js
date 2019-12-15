console.log(
    "WELCOME TO THE PI POND" + "\n" +
    "Copyright 2019 Nicholas Bernhard"
);

document.addEventListener("DOMContentLoaded", function () {

    // QUALITY-OF-LIFE FUNCTIONS 

    function getById(id) {
        return document.getElementById(id);
    }

    // VERY IMPORTANT GLOBAL VARIABLES

    let pondCanvas = getById("pondCanvas");

    //     The whole function relies on the fieldWidth variable. 
    // Larger integers will offer a more accurate approximation 
    // of Pi, but will take longer to calculate.
    const fieldWidth = 10000;

    // VARIABLES FOR CONTROLLING SIZE AND SCALING OF CANVAS ELEMENT

    let screenWidth = window.innerWidth;
    let canvasWidth;
    if ((window.innerWidth > window.innerHeight) && (window.innerWidth > 1201)) {
        canvasWidth = (screenWidth);
    } else if (window.innerWidth < window.innerHeight) {
        canvasWidth = (screenWidth * .4); 
        // For mobile, portrait, CSS sets canvas to 40% of screen width
    }
    let canvasRadius = (canvasWidth / 2);

    // Set width and height of canvas element
    pondCanvas.width = canvasWidth;
    pondCanvas.height = canvasWidth;

    // This variable is used in the drawCannonball function to
    // control scaling.
    let visualizationNumber = Math.floor(fieldWidth / canvasWidth);

    let pondRadius = (fieldWidth / 2);
    let pondCenterX = (fieldWidth / 2);
    let pondCenterY = (fieldWidth / 2);
    let shotsInsidePond = 0;
    let totalShotsFired = 0;
    
    // LOAD STORED VALUES, IF THEY EXIST

    let shotsInsidePondSTORED = localStorage.getItem("shotsInsidePond");
    let totalShotsFiredSTORED = localStorage.getItem("totalShotsFired");
    if ((shotsInsidePondSTORED !== null) && (totalShotsFiredSTORED !== null)) {
        shotsInsidePond = parseInt(shotsInsidePondSTORED);
        totalShotsFired = parseInt(totalShotsFiredSTORED);
        getById("shotsInsidePondSpan").innerHTML = shotsInsidePond;
        getById("totalShotsFiredSpan").innerHTML = totalShotsFired;
        let piApprox = (shotsInsidePond / totalShotsFired) * 4;
        getById("approximationOfPiSpan").innerHTML = piApprox;
    }

    // VARIABLES FOR AUDIO ASSETS

    let cannonFire = new Audio("assets/cannonFire.wav");
    let thud = new Audio("assets/thud.wav");
    let thudIsPlaying = false;
    let splash = new Audio("assets/splash.wav");
    let splashIsPlaying = false;

    // VARIABLES AND FUNCTIONS FOR DRAWING CANVAS ELEMENT

    let ctx = pondCanvas.getContext("2d"); // Lets you draw in canvas element

    // This variable is used clear the interval of the drawCannonball function
    let counter = 0; 

    function drawPond(firstTime) {
        // Without the firstTime argument, the canvas element
        // will appear to flash on loading.
        if (firstTime !== true) {
            ctx.clearRect(0, 0, canvasWidth, canvasWidth);
        }
        ctx.beginPath();
        ctx.fillStyle = "#009933";
        ctx.fillRect(0, 0, canvasWidth, canvasWidth);
        ctx.beginPath();
        ctx.arc(canvasRadius, canvasRadius, canvasRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "#00FFFF";
        ctx.fill();
    }
    // The function below draws the pond for the first time. 
    drawPond(true);

    function updateShotsFired() {
        getById("totalShotsFiredSpan").innerHTML = totalShotsFired;
    };

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

        //    This function creates the random coordinates for each shot,
        // and determines whether it falls within the circle or not.
        // All the core math is done here, subsequent functions 
        // are dedicated to visualizing the results. 

        //    You may run the function chain in a while-loop to simulate
        // a large number of shots quickly, and then call the displayResults
        // function.
        function functionChain() {

            totalShotsFired += 1;
            updateShotsFired();

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
                randomX = Math.floor(Math.random() * (fieldWidth + 1));
                randomY = Math.floor(Math.random() * (fieldWidth + 1));
                distanceFromCenterOfPond(randomX, randomY);
            };
            plotRandomCoordinate();
        };

        //     This function determines the path of the cannonball,
        // in order to animate it with the drawCannonball function.
        // The cannonball will always fire from the opposite corner
        // of its target coordinates. For example, if the random
        // coordinate is in the top-left, the cannonball will fire
        // from the bottom-right. 
        function determineRandomCoordinatesQuadrant() {
            let leftHalf = ((randomX >= 0) && (randomX <= pondRadius));
            let rightHalf = ((randomX >= (pondRadius + 1)) && (randomX <= fieldWidth));
            let upperHalf = ((randomY >= 0) && (randomY <= pondRadius));
            let lowerHalf = ((randomY >= (pondRadius + 1)) && (randomY <= fieldWidth));

            let upperLeft = (leftHalf && upperHalf);
            let upperRight = (rightHalf && upperHalf);
            let lowerRight = (rightHalf && lowerHalf);
            let lowerLeft = (leftHalf && lowerHalf);

            if (upperLeft) {
                x = fieldWidth;
                y = fieldWidth;
                originOfCannonball = "c";
            } else if (upperRight) {
                x = 0;
                y = fieldWidth;
                originOfCannonball = "d";
            } else if (lowerRight) {
                x = 0;
                y = 0;
                originOfCannonball = "a";
            } else if (lowerLeft) {
                x = fieldWidth;
                y = 0;
                originOfCannonball = "b";
            }
        }

        //     This function displays the new calculation of Pi. It is called
        // inside the drawCannonball function, after the cannonball has
        // reached its target coordinate and the proper audio asset
        // has been played. 
        function displayResults() {
            getById("shotsInsidePondSpan").innerHTML = shotsInsidePond;
            let ratioOfInsideToTotal = (shotsInsidePond / totalShotsFired);
            let approximationOfPi = (ratioOfInsideToTotal * 4);
            // SAVE VALUES TO LOCAL STORAGE
            localStorage.setItem("shotsInsidePond", shotsInsidePond);
            localStorage.setItem("totalShotsFired", totalShotsFired);
            // DISPLAY OTHER VALUES
            getById("numberOfIterationsSpan").innerHTML = totalShotsFired;
            getById("approximationOfPiSpan").innerHTML = approximationOfPi;
        };

        // This function animates the cannonball flying across the canvas.
        // It is called using a setInterval method.
        function drawCannonball() {
            ctx.clearRect(0, 0, canvasWidth, canvasWidth);
            counter += 1;
            if (counter === 160) {
                clearInterval(draw);
                counter = 0;
            }
            drawPond();
            if ((Math.abs(randomX - x) > 30) && (Math.abs(randomY - y) > 30)) {
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
                    y = (y - (y - randomY) * .1);
                    x = (x + (randomX - x) * .1);
                }
                ctx.beginPath();
                // The visualization number allows the animation to scale 
                // based on screen size.
                let cannonballRadius = 10;
                if ((window.innerWidth > window.innerHeight) && (window.innerWidth > 1201)) {
                    cannonballRadius = 45;
                } else if (window.innerWidth < window.innerHeight) {
                    cannonballRadius = 5;
                    // For mobile, portrait, CSS sets canvas to 40% of screen width
                }
                ctx.arc((x / visualizationNumber), (y / visualizationNumber), cannonballRadius, 0, 2 * Math.PI);
                ctx.fillStyle = "black";
                ctx.fill();
            } else {
                ctx.font = "30px Arial";
                if ((window.innerWidth > window.innerHeight) && (window.innerWidth > 1201)) {
                    ctx.font = "90px Arial";
                } else if (window.innerWidth < window.innerHeight) {
                    ctx.font = "10px Arial";
                    // For mobile, portrait, CSS sets canvas to 40% of screen width
                }
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
                ctx.fillText(soundEffectText, (x / visualizationNumber), (y / visualizationNumber));
                displayResults();
            }
        }
        functionChain();
        determineRandomCoordinatesQuadrant();
        // Variable used to clear the interval
        let draw = setInterval(drawCannonball, 30);
    }
    setInterval(fireAway, 5000);

});