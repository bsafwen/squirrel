import { AutomaticLawnMower } from './automatic_lawn_mower';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let inputStrings: string[] = [];

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', () => {
    inputStrings = inputString.trim().split('\n').map(str => str.trim());
    const automaticLawnMower = new AutomaticLawnMower();
    automaticLawnMower.run(inputStrings);
});
