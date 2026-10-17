# Chess Board

A small chess board in plain HTML, CSS and JavaScript. It draws the board, lets you drag and drop pieces, and checks each move before it happens.

## board_generation.js

Creates the board and its layout, including the side info panels.

- `piece_array`: a list holding the piece data for each of the 64 tiles (`null` when the tile is empty).
- `init_pieces`: sets up the pieces and returns the ready `piece_array`.
- `piece_data`: the data stored for one tile.
- `square`: the tile `div`, used to change the tile's properties and position.
- `piece_div`: the `div` placed inside a square to show the piece.
- `ShowMoves(from)`: goes through all 64 tiles and checks whether the move is valid. A valid tile gets the class `validmove`, or `capture` if a piece is already standing there.
- `ClearMoves()`: removes those classes, so old markers never get mixed up with the new move info.

## piece_logic.js

- `isValid(piece_array, from, to)`: checks whether the piece can be dropped on the new position. Returns `true` or `false`.
- `isClear()` (inside `isValid`): checks whether the path to the destination is free of pieces in the way.
