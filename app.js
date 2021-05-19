//Query selector for RoverOne
const roverOneSendPosition = document.querySelector("#roverOne-send-position");
const roverOnePositionX = document.querySelector("#roverOne-position-X");
const roverOnePositionY = document.querySelector("#roverOne-position-Y");
const roverOneDirection = document.querySelector("#roverOne-direction");
const roverOneLanding = document.querySelector("#roverOne-landing");
const roverOneEndMission = document.querySelector("#roverOne-end-mission");

//Query selector for RoverTwo
const roverTwoSendPosition = document.querySelector("#roverTwo-send-position");
const roverTwoPositionX = document.querySelector("#roverTwo-position-X");
const roverTwoPositionY = document.querySelector("#roverTwo-position-Y");
const roverTwoDirection = document.querySelector("#roverTwo-direction");
const roverTwoLanding = document.querySelector("#roverTwo-landing");
const roverTwoEndMission = document.querySelector("#roverTwo-end-mission");

//Event listener for send position
roverOneSendPosition.addEventListener("click", function (event) {
  event.preventDefault();
  roverOne.x = roverOnePositionX.value;
  roverOne.y = roverOnePositionY.value;
  roverOne.compassDirection = roverOneDirection.value;
  roverOneLanding.innerHTML = `
  <p>
    RoverOne paré a l'attérissage en: X: ${roverOne.x}, Y: ${roverOne.y}, direction: ${roverOne.compassDirection}
  </p>`;
});

roverTwoSendPosition.addEventListener("click", function (event) {
  event.preventDefault();
  roverTwo.x = roverTwoPositionX.value;
  roverTwo.y = roverTwoPositionY.value;
  roverTwo.compassDirection = roverTwoDirection.value;
  roverTwoLanding.innerHTML = `
  <p>
    RoverTwo paré a l'attérissage en: X: ${roverTwo.x}, Y: ${roverTwo.y}, direction: ${roverTwo.compassDirection}
  </p>
  <button onclick="startMission()">Partir en mission</button>`;
});

//Plateau
const plateau = new Object({
  x: 0,
  y: 0,
  yMax: 5,
  xMax: 5,
});

//cardinal compass points
const compass = new Object({
  north: 0,
  east: 90,
  south: 180,
  west: 270,
});

//Nasa order
const orderForRover = new Object({
  left: 90,
  right: 90,
  move: 1,
});

//Object for the Rover
class Rover {
  constructor(x, y, compassDirection) {
    this.x = x;
    this.y = y;
    this.compassDirection = compassDirection;
  }
}
const roverOne = new Rover(
  roverOnePositionX,
  roverOnePositionY,
  roverOneDirection
);
const roverTwo = new Rover(
  roverTwoPositionX,
  roverTwoPositionY,
  roverTwoDirection
);

//Oject for the ObjectifMission
class ObjectifMission {
  constructor(x, y, compassDirection) {
    this.x = x;
    this.y = y;
    this.compassDirection = compassDirection;
  }
}
const roverOneObjectifMission = new ObjectifMission(
  plateau.x + 1,
  plateau.y + 3,
  compass.north
);
const roverTwoObjectifMission = new ObjectifMission(
  plateau.x + 5,
  plateau.y + 1,
  compass.east
);

//function for moving rover
const roverTravel = (rover, roverEndMission) => {
  //As long as the rover has not arrived
  while (JSON.stringify(rover) !== JSON.stringify(roverEndMission)) {
    //condition for the position of Y
    rover.y === roverEndMission.y
      ? (rover.y = roverEndMission.y)
      : (rover.y > plateau.yMax
          ? (rover.y = plateau.y)
          : (rover.y = rover.y + orderForRover.move),
        console.log("rover avance de 1 sur Y"));

    //condition for the position of X
    rover.x === roverEndMission.x
      ? (rover.x = roverEndMission.x)
      : (rover.x > plateau.xMax
          ? (rover.x = plateau.x)
          : (rover.x = rover.x + orderForRover.move),
        console.log("rover avance de 1 sur X"));

    //Condition for compass direction
    rover.compassDirection === roverEndMission.compassDirection
      ? (rover.compassDirection = roverEndMission.compassDirection)
      : rover.compassDirection > compass.west
      ? (rover.compassDirection = compass.north)
      : ((rover.compassDirection = rover.compassDirection + orderForRover.left),
        console.log("rover tourne de 90° sur sa gauche"));
  }
};

//function to format the compass
const compassFormatting = (rover, roverEndMission) => {
  rover.compassDirection === compass.north
    ? (rover.compassDirection = "N") && (roverEndMission.compassDirection = "N")
    : rover.compassDirection === compass.east
    ? (rover.compassDirection = "E") && (roverEndMission.compassDirection = "E")
    : rover.compassDirection === compass.south
    ? (rover.compassDirection = "S") && (roverEndMission.compassDirection = "S")
    : rover.compassDirection === compass.west
    ? (rover.compassDirection = "W") && (roverEndMission.compassDirection = "S")
    : "";
};

//function for start mission
const startMission = () => {
  //We look where the rover is
  if (!roverOne.endMission) {
    roverOne.compassDirection = compass.north;
    roverTravel(roverOne, roverOneObjectifMission);
    compassFormatting(roverOne, roverOneObjectifMission);

    roverOne.endMission =
      roverOne.x + " " + roverOne.y + " " + roverOne.compassDirection;

    roverOneEndMission.innerHTML = `RoverOne est arrivé en pos: ${roverOne.endMission}`;
  }

  //If the RoverOne has arrived
  if (roverOne.endMission !== undefined) {
    roverTwoEndMission.innerHTML = `RoverTwo est parti`;
    setTimeout(() => {
      console.log(
        "RoverTwo est prêt à partir depuis la pos: ",
        roverTwo.x + " " + roverTwo.y
      );

      roverTwo.compassDirection = compass.north;
      roverTravel(roverTwo, roverTwoObjectifMission);
      compassFormatting(roverTwo, roverTwoObjectifMission);

      roverTwo.endMission =
        roverTwo.x + " " + roverTwo.y + " " + roverTwo.compassDirection;

      roverTwoEndMission.innerHTML = `RoverTwo est arrivé en pos: ${roverTwo.endMission}`;
    }, 2000);
  }
};
