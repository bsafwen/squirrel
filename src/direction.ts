export enum Direction {
  North = 'N',
  East = 'E',
  South = 'S',
  West = 'W',
}

export const parseDirection = (input: string): Direction => {
  switch (input) {
    case 'N':
      return Direction.North;
    case 'E':
      return Direction.East;
    case 'S':
      return Direction.South;
    case 'W':
      return Direction.West;
    default:
      return Direction.North;
  }
}
