document.addEventListener("DOMContentLoaded", function () {
    let fieldHeight = 10000;
    let fieldWidth = fieldHeight;
    let pondRadius = (fieldWidth / 2);
    let pondCenterX = (fieldWidth / 2);
    let pondCenterY = (fieldHeight / 2);

    let shotsInsidePond = 0;
    let totalShotsToFire = 4000000000; // Four billion

    let resultsArray = [];

    function functionChain() {

        function isCoordinateWithinCircle(trueOrFalse) {
            if (trueOrFalse === true) {
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
            let randomX = Math.floor(Math.random() * (fieldWidth + 1));
            let randomY = Math.floor(Math.random() * (fieldHeight + 1));
            distanceFromCenterOfPond(randomX, randomY);
        };
        plotRandomCoordinate();
    };

    function displayResults() {
        let ratioOfInsideToTotal = (shotsInsidePond / totalShotsToFire);
        let approximationOfPi = (ratioOfInsideToTotal * 4);
        resultsArray.push(approximationOfPi);
        if (resultsArray.length < 10) {
            currentShot = 0;
            runLoop();
            let message = "Approximation of Pi after " + totalShotsToFire + " iterations:" + approximationOfPi;
            console.log(message);
        } else {
            let sumOfAllApproximations = 0;
            resultsArray.forEach(function (item) {
                sumOfAllApproximations += item;
            });
            let averageOfArrayValues = (sumOfAllApproximations / resultsArray.length);
            console.log("Average after " + resultsArray.length + "runs: " + averageOfArrayValues);
        }
    };

    function runLoop() {
        while (currentShot < totalShotsToFire) {
            if ((currentShot % 10000000) === 0) {
                console.log("Current shot: " + currentShot);
            }
            functionChain();
            currentShot++;
        }
        displayResults();
    }

    let currentShot = 0;

    function runProgram() {
        let startTime = new Date;
        startTime = startTime.getTime();
        console.log(startTime);
        runLoop();
        let endTime = new Date;
        endTime = endTime.getTime();
        let timeElapsed = (endTime - startTime);
        let timeElapsedInSeconds = (timeElapsed / 1000);
        let timeElapsedInMinutes = (timeElapsedInSeconds / 60);
        console.log(timeElapsedInMinutes);
    };

    runProgram();

});