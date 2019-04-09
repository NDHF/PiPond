document.addEventListener("DOMContentLoaded", function () {
    let fieldHeight = 1000;
    let fieldWidth = fieldHeight;
    let pondRadius = (fieldWidth / 2);
    let pondCenterX = (fieldWidth / 2);
    let pondCenterY = (fieldHeight / 2);

    let shotsInsidePond = 0;
    let totalShotsToFire = 1000;

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
        let message = "Approximation of Pi after " + totalShotsToFire + " iterations:" + approximationOfPi;
        console.log(message);
    };

    function runProgram() {
        let currentShot = 0;
        while (currentShot < totalShotsToFire) {
            functionChain();
            currentShot++;
        }
        displayResults();
    };

    runProgram();

});