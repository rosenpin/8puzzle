export function createInitialState(): number[] {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8];
}

export function shufflePuzzle(state: number[]): number[] {
    let newState: number[];
    do {
        newState = [...state];
        for (let i = newState.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newState[i], newState[j]] = [newState[j], newState[i]];
        }
    } while (!isSolvable(newState));
    console.log(newState);
    return newState;//[0,1,2,3,4,5,8,6,7];
}

export function isSolvable(state: number[]): boolean {
    const flatState = state.filter(num => num !== 8);
    let inversions = 0;

    for (let i = 0; i < flatState.length - 1; i++) {
        for (let j = i + 1; j < flatState.length; j++) {
            if (flatState[i] > flatState[j]) {
                inversions++;
            }
        }
    }

    return inversions % 2 === 0;
}