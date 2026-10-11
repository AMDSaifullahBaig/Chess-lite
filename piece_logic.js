export const isValid=(piece_array,from,to)=>
{
    const from_piece=piece_array[from];
    const to_piece=piece_array[to];
    const from_row=Math.floor(from/8);
    const from_column=from%8;
    const to_row=Math.floor(to/8);
    const to_column=to%8;

    const row_diff=Math.abs(from_row-to_row);
    const column_diff=Math.abs(from_column-to_column);
    if (to_piece && from_piece.color==to_piece.color) return false;
    switch(from_piece.piece)
    {
        case "rook":
            return (row_diff==0 || column_diff==0)
        case "knight":
            return (row_diff==2 && column_diff==1)||(row_diff==1 && column_diff==2);
        case "bishop":
            return (row_diff==column_diff);
        case "king":
            return (row_diff<=1 && column_diff<=1)
        case "queen":
            return (row_diff==0 || column_diff==0 || row_diff==column_diff);
        case "pawn":
            {
                const dir=from_piece.color=="white"?-1:1;
                const start=from_piece.color=="white"?6:1;
                const moved=to_row-from_row;
                if (column_diff==1 && moved==dir)
                    return piece_array[to]!=null;
                if (column_diff==0 && piece_array[to]==null)
                {
                    if (moved==dir)return true;
                    if (start==from_row && moved==2*dir && piece_array[from+dir*8]==null)
                        return true;
                }
                return false;
            }
    }
    console.log(piece_array);
return false;
}