import { Mower } from '../src/mower';
import { Point } from '../src/point';
import { Direction } from '../src/direction';
import { Lawn } from '../src/lawn';

describe('Rotate to the right', () => {
  beforeAll(() => {
  })
  it("should rotate to east from north", async () => {
    const mower = new Mower(new Point(0, 0,), Direction.North);
    mower.rotateRight();
    expect(mower.getDirection()).toBe(Direction.East);
  });
  it("should rotate to south from east", async () => {
    const mower = new Mower(new Point(0, 0,), Direction.East);
    mower.rotateRight();
    expect(mower.getDirection()).toBe(Direction.South);
  });
  it("should rotate to west from south", async () => {
    const mower = new Mower(new Point(0, 0,), Direction.South);
    mower.rotateRight();
    expect(mower.getDirection()).toBe(Direction.West);
  });
  it("should rotate to north from west", async () => {
    const mower = new Mower(new Point(0, 0,), Direction.West);
    mower.rotateRight();
    expect(mower.getDirection()).toBe(Direction.North);
  });
});

describe('Rotate to the left', () => {
  beforeAll(() => {
  })
  it("should rotate to east from south", async () => {
    const mower = new Mower(new Point(0, 0,), Direction.South);
    mower.rotateLeft();
    expect(mower.getDirection()).toBe(Direction.East);
  });
  it("should rotate to south from east", async () => {
    const mower = new Mower(new Point(0, 0,), Direction.West);
    mower.rotateLeft();
    expect(mower.getDirection()).toBe(Direction.South);
  });
  it("should rotate to west from south", async () => {
    const mower = new Mower(new Point(0, 0,), Direction.North);
    mower.rotateLeft();
    expect(mower.getDirection()).toBe(Direction.West);
  });
  it("should rotate to north from west", async () => {
    const mower = new Mower(new Point(0, 0,), Direction.East);
    mower.rotateLeft();
    expect(mower.getDirection()).toBe(Direction.North);
  });
});


describe('Moving in lawn\'s boundary', () => {
  it('should move up north one step', async () => {
    const mower = new Mower(new Point(0, 0), Direction.North);
    const lawn = new Lawn(new Point(1, 1));
    mower.setLawn(lawn);
    mower.moveForward();
    expect(mower.getPosition()).toStrictEqual(new Point(0, 1));
  });
  it('should move up east one step', async () => {
    const mower = new Mower(new Point(0, 0), Direction.East);
    const lawn = new Lawn(new Point(1, 1));
    mower.setLawn(lawn);
    mower.moveForward();
    expect(mower.getPosition()).toStrictEqual(new Point(1, 0));
  });
  it('should move up west one step', async () => {
    const mower = new Mower(new Point(1, 1), Direction.West);
    const lawn = new Lawn(new Point(1, 1));
    mower.setLawn(lawn);
    mower.moveForward();
    expect(mower.getPosition()).toStrictEqual(new Point(0, 1));
  });
  it('should move up south one step', async () => {
    const mower = new Mower(new Point(1, 1), Direction.South);
    const lawn = new Lawn(new Point(1, 1));
    mower.setLawn(lawn);
    mower.moveForward();
    expect(mower.getPosition()).toStrictEqual(new Point(1, 0));
  });
});

describe('Moving outside of lawn\'s boundary', () => {
  it('should not move up north one step', async () => {
    const mower = new Mower(new Point(1, 1), Direction.North);
    const lawn = new Lawn(new Point(1, 1));
    mower.setLawn(lawn);
    mower.moveForward();
    expect(mower.getPosition()).toStrictEqual(new Point(1, 1));
  });
  it('should not move up east one step', async () => {
    const mower = new Mower(new Point(1, 0), Direction.East);
    const lawn = new Lawn(new Point(1, 1));
    mower.setLawn(lawn);
    mower.moveForward();
    expect(mower.getPosition()).toStrictEqual(new Point(1, 0));
  });
  it('should not move up west one step', async () => {
    const mower = new Mower(new Point(0, 1), Direction.West);
    const lawn = new Lawn(new Point(1, 1));
    mower.setLawn(lawn);
    mower.moveForward();
    expect(mower.getPosition()).toStrictEqual(new Point(0, 1));
  });
  it('should move up south one step', async () => {
    const mower = new Mower(new Point(0, 0), Direction.South);
    const lawn = new Lawn(new Point(1, 1));
    mower.setLawn(lawn);
    mower.moveForward();
    expect(mower.getPosition()).toStrictEqual(new Point(0, 0));
  });
});
describe('Mowers should not collide', () => {
  it('1. mower1 should not collide with mower2', async () => {
    const mower1 = new Mower(new Point(1, 1), Direction.North);
    const lawn = new Lawn(new Point(5, 5));
    mower1.setLawn(lawn);
    mower1.moveForward();
    mower1.stop();
    expect(mower1.getPosition()).toStrictEqual(new Point(1, 2));
    expect(mower1.getDirection()).toStrictEqual(Direction.North);
    const mower2 = new Mower(new Point(0, 0), Direction.North);
    mower2.setLawn(lawn);
    mower2.moveForward();
    mower2.moveForward();
    mower2.rotateRight();
    mower2.moveForward();
    mower2.stop();
    expect(mower2.getPosition()).toStrictEqual(new Point(0, 2));
    expect(mower2.getDirection()).toStrictEqual(Direction.East);
  });
  it('2. mower1 should not collide with mower2', async () => {
    const mower1 = new Mower(new Point(1, 2), Direction.North);
    const lawn = new Lawn(new Point(5, 5));
    mower1.setLawn(lawn);
    mower1.move('LFLFLFLFF');
    mower1.stop();
    expect(mower1.getPosition()).toStrictEqual(new Point(1, 3));
    expect(mower1.getDirection()).toStrictEqual(Direction.North);
    const mower2 = new Mower(new Point(3, 3), Direction.East);
    mower2.setLawn(lawn);
    mower2.move('FFRFFRFRRF');
    mower2.stop();
    expect(mower2.getPosition()).toStrictEqual(new Point(5, 1));
    expect(mower2.getDirection()).toStrictEqual(Direction.East);
  });
});