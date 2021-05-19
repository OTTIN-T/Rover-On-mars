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

//function to format the entry of the user
const roverDirection = (rover, direction) => {
  direction === ("north" || "N")
    ? ((rover.compassDirection = compass.north),
      console.log("direction", direction))
    : direction === ("south" || "S")
    ? ((rover.compassDirection = compass.south),
      console.log("direction", direction))
    : direction === ("east" || "E")
    ? ((rover.compassDirection = compass.east),
      console.log("direction", direction))
    : direction === ("west" || "W")
    ? ((rover.compassDirection = compass.west),
      console.log("direction", direction))
    : "";
};

//Event listener for send position
roverOneSendPosition.addEventListener("click", function (event) {
  event.preventDefault();
  // delete roverOne.x
  // delete roverOne.y
  // delete roverOne.compassDirection
  // delete roverOne.endMission
  roverOne.x = roverOnePositionX.value;
  roverOne.y = roverOnePositionY.value;
  // roverOne.compassDirection = roverDirection(roverOne, roverOneDirection.value);
  roverDirection(roverOne, roverOneDirection.value);
  roverOneLanding.innerHTML = `
  <p>
  RoverOne paré à l'atterrissage en: X: ${roverOne.x}, Y: ${roverOne.y}, direction: ${roverOneDirection.value}
  </p>`;
});

roverTwoSendPosition.addEventListener("click", function (event) {
  event.preventDefault();
  // delete roverTwo.x
  // delete roverTwo.y
  // delete roverTwo.compassDirection
  // delete roverTwo.endMission
  roverTwo.x = roverTwoPositionX.value;
  roverTwo.y = roverTwoPositionY.value;
  roverDirection(roverTwo, roverTwoDirection.value);
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
        console.log("Le rover avance de 1 sur Y"));

    //condition for the position of X
    rover.x === roverEndMission.x
      ? (rover.x = roverEndMission.x)
      : (rover.x > plateau.xMax
          ? (rover.x = plateau.x)
          : (rover.x = rover.x + orderForRover.move),
        console.log("Le rover avance de 1 sur X"));

    //Condition for compass direction
    rover.compassDirection === roverEndMission.compassDirection
      ? (rover.compassDirection = roverEndMission.compassDirection)
      : rover.compassDirection > compass.west
      ? (rover.compassDirection = compass.north)
      : ((rover.compassDirection = rover.compassDirection + orderForRover.left),
        console.log("Le rover tourne de 90° sur sa gauche"));
  }
};

//function to format the compass
const compassFormatting = (rover, roverEndMission) => {
  rover.compassDirection === compass.north
    ? (rover.compassDirection = "N")
    : rover.compassDirection === compass.east
    ? (rover.compassDirection = "E")
    : rover.compassDirection === compass.south
    ? (rover.compassDirection = "S")
    : rover.compassDirection === compass.west
    ? (rover.compassDirection = "W")
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
    compassFormatting(roverOne, roverOneObjectifMission);

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
    compassFormatting(roverTwo, roverTwoObjectifMission);

    roverTwo.endMission =
      roverTwo.x + " " + roverTwo.y + " " + roverTwo.compassDirection;
    setTimeout(() => {
      roverTwoEndMission.innerHTML = `RoverTwo est arrivé en pos: ${roverTwo.endMission}`;

      roverOne.compassDirection = roverOneObjectifMission.compassDirection;
      delete roverOne.endMission;

      roverTwo.compassDirection = roverTwoObjectifMission.compassDirection;
      delete roverTwo.endMission;
    }, 3000);
  }
};
