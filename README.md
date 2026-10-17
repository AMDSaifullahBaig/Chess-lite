# chess-lite

A chess-lite built with plain HTML, CSS and JavaScript. No libraries, no frameworks.

Drag a piece, drop it on a square, and the board checks the move against the rules of that piece before it happens.

**Live demo:** https://chess-lite-steel.vercel.app/

## Features

- Board generated from a short position string
- Drag and drop movement
- Turn order (white moves first)
- Movement rules for every piece: pawn, knight, bishop, rook, queen and king
- Sliding pieces cannot jump over other pieces
- Legal squares are highlighted while you drag (a dot for a move, a ring for a capture)
- Captured pieces are shown in the side panels with a count for each piece type

## Project structure

```
chess-board/
├── index.html
├── board_generation.js   # board, drag and drop, highlighting, captured pieces
├── piece_logic.js        # move rules (isValid)
├── styling.css
├── layout.css
└── assets/               # piece images, named like black-pawn.svg
```

## How it works

### board_generation.js

Creates the board and its layout, including the side info panels.

- `piece_array`: a list holding the piece data for each of the 64 tiles (`null` when empty)
- `init_pieces`: sets up the pieces and returns the ready `piece_array`
- `ShowMoves(from)`: checks all 64 tiles and marks the valid ones with `validmove`, or `capture` if a piece is already there
- `ClearMoves()`: removes those markers so old move info never mixes with new
- `AddCaptured(piece)`: adds a captured piece to the side panel, or raises its count if it is already there

### piece_logic.js

- `isValid(piece_array, from, to)`: checks whether the piece can be dropped on the new position. Returns `true` or `false`
- `isClear()` (inside `isValid`): checks that nothing is blocking the path to the destination

### The position string

The starting position is a string where rows are separated by `|`. Lowercase letters are black pieces, uppercase are white, and a digit is a run of empty squares.

```js
const seq = "rnbqkbnr|pppppppp|8|8|8|8|PPPPPPPP|RNBQKBNR";
```

## Planned

- Pawn promotion
- Check, checkmate and stalemate
- Castling and en passant
- Move history

This board is the first part of a bigger plan: a chess AI model and, later, an online version.

## License

This project is licensed under the terms of the [LICENSE](LICENSE) file.