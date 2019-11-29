const BOARD_X_START = -1 / 30;
const BOARD_X_END = 1 / 30;
const BOARD_Y_START = -3 * 2;
const BOARD_Y_END = 2.5 * 2;

const FREQ_MIN = 65;
const FREQ_MAX = 1046;

let board = JXG.JSXGraph.initBoard('jxgbox', {
    boundingbox: [BOARD_X_START, BOARD_Y_END, BOARD_X_END, BOARD_Y_START],
    axis: true
});

let sineA = board.create(
    'slider',
    [
        [BOARD_X_END / 16 * 1, BOARD_Y_START - BOARD_Y_START / 16 * 3],
        [BOARD_X_END / 16 * 8, BOARD_Y_START - BOARD_Y_START / 16 * 3],
        [FREQ_MIN, 440, FREQ_MAX],
    ],
    {
        name: 'Sine A',
        snapWidth: 1,
    }
);

let sineB = board.create(
    'slider',
    [
        [BOARD_X_END / 16 * 1, BOARD_Y_START - BOARD_Y_START / 16 * 1],
        [BOARD_X_END / 16 * 8, BOARD_Y_START - BOARD_Y_START / 16 * 1],
        [FREQ_MIN, 262, FREQ_MAX],
    ],
    {
        name: 'Sine B',
        snapWidth: 1,
    }
);

board.create('functiongraph', [x => {
    let a = sineA.Value();
    let b = sineB.Value();

    return Math.sin(x * a * 2 * Math.PI) + Math.sin(x * b * 2 * Math.PI);
}]);

document.querySelectorAll('.js-piano-a .piano__key').forEach(pianoKeyEl => {
    pianoKeyEl.addEventListener('click', (ev) => {
        sineA.setValue(ev.target.dataset.freq);
        board.update();
    });
});

document.querySelectorAll('.js-piano-b .piano__key').forEach(pianoKeyEl => {
    pianoKeyEl.addEventListener('click', (ev) => {
        sineB.setValue(ev.target.dataset.freq);
        board.update();
    });
});
