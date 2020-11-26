import { Point } from './point';

export class Lawn {
  private obstacles: Point[] = [];
  constructor(private upperRight: Point) {
    this.upperRight = upperRight;
  }
  
  addObstacle(p: Point) {
    this.obstacles.push(p);
  }

  isInLawn(p: Point): boolean {
    return p.x >= 0 && p.x <= this.upperRight.x && p.y >= 0 && p.y <= this.upperRight.y;
  }

  isObstacle(p: Point): boolean {
    return this.obstacles.find((obstacle) => p.x === obstacle.x && p.y === obstacle.y) !== undefined;
  }

  isValid(p: Point): boolean {
    return this.isInLawn(p) && !this.isObstacle(p);
  }

}