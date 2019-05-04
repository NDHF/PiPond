let fieldWidth;
let pondRadius;
let pondCenterX;
let pondCenterY;
let shotsInsidePond = 0;
let totalShotsFired = 0;

let distanceX;
let distanceY;
let c;

let aSquared;
let bSquared;
let cSquared;

function functionChain() {

    function isCoordinateWithinCircle(trueOrFalse) {
        if (trueOrFalse === true) {
                shotIsInsidePond = true;
                shotsInsidePond = (shotsInsidePond + 1);
        }
    };

    function distanceFromCenterOfPond(randomX, randomY) {

        distanceX = (randomX - pondCenterX);
        distanceY = (randomY - pondCenterY);

        function pythagoreanTheorem() {
            aSquared = Math.pow(distanceX, 2);
            bSquared = Math.pow(distanceY, 2);
            cSquared = (aSquared + bSquared);
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

let i = 0;

function runProgram(widthOfField, numberOfShots) {
    fieldWidth = widthOfField;
    pondRadius = (fieldWidth / 2);
    pondCenterX = pondRadius;
    pondCenterY = pondRadius;
    while (i < numberOfShots) {
        functionChain();
        i += 1;
    }
    let approximationOfPi = ((shotsInsidePond / numberOfShots) * 4);
    console.log("Number of shots fired: " + numberOfShots + "\n" +
        "Shots inside pond: " + shotsInsidePond + "\n" +
        "Approximation of Pi: " + approximationOfPi
    );
}

runProgram(200, 4000000000);