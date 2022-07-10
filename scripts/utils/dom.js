export const isCellOccupied = (el) => (el.classList.contains('filled-in')
    || !el.classList.contains('cell'));
