//Query selector for RoverOne
const roverOneSendPosition = document.querySelector("#roverOne-send-position");
const roverOnePositionX = document.querySelector("#roverOne-position-X");
const roverOnePositionY = document.querySelector("#roverOne-position-Y");
const roverOneDirection = document.querySelector("#roverOne-direction");
const roverOneLanding = document.querySelector("#roverOne-landing");
const roverOneEndMission = document.querySelector("#roverOne-end-mission");

//Query selector for RoverOne mission
const roverOneMissionPositionX = document.querySelector(
  "#roverOne-end-mission-position-X"
);
const roverOneMissionPositionY = document.querySelector(
  "#roverOne-end-mission-position-Y"
);
const roverOneMissionDirection = document.querySelector(
  "#roverOne-end-mission-direction"
);
const roverOneSendMission = document.querySelector(
  "#roverOne-send-position-mission"
);

//Query selector for RoverTwo
const roverTwoSendPosition = document.querySelector("#roverTwo-send-position");
const roverTwoPositionX = document.querySelector("#roverTwo-position-X");
const roverTwoPositionY = document.querySelector("#roverTwo-position-Y");
const roverTwoDirection = document.querySelector("#roverTwo-direction");
const roverTwoLanding = document.querySelector("#roverTwo-landing");
const roverTwoEndMission = document.querySelector("#roverTwo-end-mission");

//Query selector for RoverTwo mission
const roverTwoMissionPositionX = document.querySelector(
  "#roverTwo-end-mission-position-X"
);
const roverTwoMissionPositionY = document.querySelector(
  "#roverTwo-end-mission-position-Y"
);
const roverTwoMissionDirection = document.querySelector(
  "#roverTwo-end-mission-direction"
);
const roverTwoSendMission = document.querySelector(
  "#roverTwo-send-position-mission"
);

//function to format the entry of the user
const formatRoverDirection = (rover, direction) => {
  direction === ("north" || "N")
    ? (rover.compassDirection = compass.north)
    : direction === ("south" || "S")
    ? (rover.compassDirection = compass.south)
    : direction === ("east" || "E")
    ? (rover.compassDirection = compass.east)
    : direction === ("west" || "W")
    ? (rover.compassDirection = compass.west)
    : "";
};

//Event listener for send mission
roverOneSendMission.addEventListener("click", function (event) {
  event.preventDefault();

  //the .value is understood as a string (and can cause problems), the * 1 converted to a number
  roverOneObjectifMission.x = roverOneMissionPositionX.value * 1;
  roverOneObjectifMission.y = roverOneMissionPositionY.value * 1;
  formatRoverDirection(roverOneObjectifMission, roverOneMissionDirection.value);
});

roverTwoSendMission.addEventListener("click", function (event) {
  event.preventDefault();

  roverTwoObjectifMission.x = roverTwoMissionPositionX.value * 1;
  roverTwoObjectifMission.y = roverTwoMissionPositionY.value * 1;
  formatRoverDirection(roverTwoObjectifMission, roverTwoMissionDirection.value);
});

//Event listener for send position
roverOneSendPosition.addEventListener("click", function (event) {
  event.preventDefault();

  // Assignment of values
  roverOne.x = roverOnePositionX.value * 1;
  roverOne.y = roverOnePositionY.value * 1;
  formatRoverDirection(roverOne, roverOneDirection.value);

  roverOneLanding.innerHTML = `
  <p>
  RoverOne paré à l'atterrissage en: X: ${roverOne.x}, Y: ${roverOne.y}, direction: ${roverOneDirection.value}
  </p>`;
});

roverTwoSendPosition.addEventListener("click", function (event) {
  event.preventDefault();

  // Assignment of values
  roverTwo.x = roverTwoPositionX.value * 1;
  roverTwo.y = roverTwoPositionY.value * 1;
  formatRoverDirection(roverTwo, roverTwoDirection.value);

  roverTwoLanding.innerHTML = `
  <p>
    RoverTwo paré à l'atterrissage en: X: ${roverTwo.x}, Y: ${roverTwo.y}, direction: ${roverTwoDirection.value}
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
  north: "N",
  east: "E",
  south: "S",
  west: "W",
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
//Default value
const roverOne = new Rover(plateau.x + 1, plateau.y + 2, compass.north);
const roverTwo = new Rover(plateau.x + 3, plateau.y + 3, compass.east);

//Oject for the ObjectifMission
class ObjectifMission {
  constructor(x, y, compassDirection) {
    this.x = x;
    this.y = y;
    this.compassDirection = compassDirection;
  }
}
//Default value
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
    roverMoveOnY(rover, roverEndMission);
    //condition for the position of X
    roverMoveOnX(rover, roverEndMission);
    //Condition for compass direction
    roverTurn(rover, roverEndMission);
  }
};

const roverMoveOnY = (rover, roverEndMission) => {
  // We check the value of Y
  rover.y === roverEndMission.y
    ? (rover.y = roverEndMission.y)
    : (rover.y > plateau.yMax
        ? (rover.y = plateau.y)
        : (rover.y = rover.y + orderForRover.move),
      console.log("Le rover avance de 1 sur Y"));
};

const roverMoveOnX = (rover, roverEndMission) => {
  // We check the value of X
  rover.x === roverEndMission.x
    ? (rover.x = roverEndMission.x)
    : (rover.x > plateau.xMax
        ? (rover.x = plateau.x)
        : (rover.x = rover.x + orderForRover.move),
      console.log("Le rover avance de 1 sur X"));
};

const roverTurn = (rover, roverEndMission) => {
  // We check the value of the direction
  rover.compassDirection === roverEndMission.compassDirection
    ? (rover.compassDirection = roverEndMission.compassDirection)
    : roverEndMission.compassDirection === compass.north
    ? (rover.compassDirection = compass.north)
    : roverEndMission.compassDirection === compass.south
    ? (rover.compassDirection = compass.south)
    : roverEndMission.compassDirection === compass.east
    ? (rover.compassDirection = compass.east)
    : roverEndMission.compassDirection === compass.west
    ? (rover.compassDirection = compass.west)
    : "";
};

//function for start mission
const startMission = () => {
  //We look where the rover is
  if (!roverOne.endMission) {
    roverOneEndMission.innerHTML = `RoverOne est prêt à partir depuis la pos: X: ${roverOne.x}, Y:${roverOne.y}, direction:${roverOne.compassDirection}`;

    setTimeout(() => {
      roverOneEndMission.innerHTML = `RoverOne est parti`;
    }, 1000);

    roverTravel(roverOne, roverOneObjectifMission);

    roverOne.endMission =
      roverOne.x + " " + roverOne.y + " " + roverOne.compassDirection;

    setTimeout(() => {
      roverOneEndMission.innerHTML = `RoverOne est arrivé en pos: ${roverOne.endMission}`;
    }, 2000);
  }

  //If the RoverOne has arrived
  if (roverOne.endMission !== undefined) {
    roverTwoEndMission.innerHTML = `RoverTwo est prêt à partir depuis la pos: X: ${roverTwo.x}, Y:${roverTwo.y}, direction:${roverTwo.compassDirection}`;

    setTimeout(() => {
      roverTwoEndMission.innerHTML = `RoverTwo est parti`;
    }, 2000);

    roverTravel(roverTwo, roverTwoObjectifMission);

    roverTwo.endMission =
      roverTwo.x + " " + roverTwo.y + " " + roverTwo.compassDirection;

    setTimeout(() => {
      roverTwoEndMission.innerHTML = `RoverTwo est arrivé en pos: ${roverTwo.endMission}`;

      //Reset to make a mission behind
      delete roverOne.endMission;
      delete roverTwo.endMission;
    }, 3000);
  }
};
