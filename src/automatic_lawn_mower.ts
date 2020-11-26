import { Lawn } from './lawn';
import { Point } from './point';
import { parseDirection } from './direction';
import { Mower } from './mower';

export class AutomaticLawnMower {
  
  run(input: string[]) {
    const lawn = this.getLawn(input[0]);
    for (let i = 1; i + 1 < input.length; i += 2) {
      const mower = this.getMower(input[i]);
      mower.setLawn(lawn);
      mower.move(input[1 + i]);
      mower.stop();
    }
  }

  private getUpperRightPoint(coordinates: string): Point {
    const tokens = coordinates.split(' ');
    const x = +tokens[0];
    const y = +tokens[1];
    return new Point(x, y);
  }

  private getLawn(input: string) {
    const upperRight = this.getUpperRightPoint(input);
    return new Lawn(upperRight);
  }

  private getMower(input: string) {
    const tokens = input.split(' ');
    const x = +tokens[0];
    const y = +tokens[1];
    const dir = parseDirection(tokens[2]);
    return new Mower(new Point(x, y), dir);
  }

}