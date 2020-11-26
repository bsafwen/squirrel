import { Lawn } from "./lawn";
import { Point } from "./point";
import { Direction } from "./direction";

export class Mower {

  private lawn: Lawn | null = null;

  constructor(private pos: Point, private direction: Direction) {}

  setLawn(lawn: Lawn) {
    this.lawn = lawn;
  }

  getLawn() {
    return this.lawn;
  }

  getDirection() {
    return this.direction;
  }

  getPosition() {
    return this.pos;
  }

  moveForward() {
    if (this.lawn === null) {
      throw new Error('Mower cannot move without being in a lawn.');
    }
    const newPosition = new Point(this.pos.x, this.pos.y);
    switch (this.direction) {
      case Direction.North:
        newPosition.y = newPosition.y + 1;
        break;
      case Direction.East:
        newPosition.x = newPosition.x + 1;
        break;
      case Direction.South:
        newPosition.y = newPosition.y - 1;
        break;
      case Direction.West:
        newPosition.x = newPosition.x - 1;
        break;
      default:
        throw new Error('Unkown direction');
    }
    if (this.lawn.isValid(newPosition)) {
      this.pos = newPosition;
    }
  }

  rotateLeft() {
    switch (this.direction) {
      case Direction.North:
        this.direction = Direction.West;
        break;
      case Direction.East:
        this.direction = Direction.North;
        break;
      case Direction.South:
        this.direction = Direction.East;
        break;
      case Direction.West:
        this.direction = Direction.South;
        break;
      default:
        break;
    }
  }

  rotateRight() {
    switch (this.direction) {
      case Direction.North:
        this.direction = Direction.East;
        break;
      case Direction.East:
        this.direction = Direction.South;
        break;
      case Direction.South:
        this.direction = Direction.West;
        break;
      case Direction.West:
        this.direction = Direction.North;
        break;
      default:
        break;
    }
  }

  stop() {
    if (this.lawn !== null) {
      this.lawn.addObstacle(this.pos);
    }
    console.log(this.pos.x, this.pos.y, this.direction);
  }

  move(input: string) {
    input.split('').forEach((character) => {
      switch (character) {
        case 'F':
          this.moveForward();
          break;
        case 'L':
          this.rotateLeft();
          break;
        case 'R':
          this.rotateRight();
          break;
        default:
          break;
      }
    });
  }

}
