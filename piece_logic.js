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

    const isClear=()=>
        {
         const sign=Math.sign(to_row-from_row)*8+Math.sign(to_column-from_column);
         for (let i=from+sign;i!=to;i+=sign)
            if (piece_array[i])
                return false;
        return true;
        }
    if (to_piece && from_piece.color==to_piece.color) return false;
    switch(from_piece.piece)
    {
        case "rook":
            return (row_diff==0 || column_diff==0) && isClear();
        case "knight":
            return (row_diff==2 && column_diff==1)||(row_diff==1 && column_diff==2) && isClear();
        case "bishop":
            return (row_diff==column_diff) && isClear();
        case "king":
            return (row_diff<=1 && column_diff<=1) && isClear();
        case "queen":
            return (row_diff==0 || column_diff==0 || row_diff==column_diff)  && isClear();
        case "pawn":
            {
                const dir=from_piece.color=="white"?-1:1;
                const start=from_piece.color=="white"?6:1;
                const moved=to_row-from_row;
                if (column_diff==1 && moved==dir)
                    return piece_array[to]!=null  && isClear();;
                if (column_diff==0 && piece_array[to]==null)
                {
                    if (moved==dir)return true;
                    if (start==from_row && moved==2*dir && piece_array[from+dir*8]==null)
                        return true  && isClear();
                }
                return false;
            }
    }
    console.log(piece_array);
return false;
}

export const isInCheck=(piece_array,color)=>
{
    const king=piece_array.findIndex(p=>p && p.color==color && p.piece=="king");
    const enemy=color=="black"?"white":"black";
    for (let i=0;i<64;i++)
    {
        const p=piece_array[i];
        if (p && p.color==enemy && isValid(piece_array,i,king))
            return true;
    }
    return false;
}

export const isLegal=(piece_array,from,to)=>
{
    if (!isValid(piece_array,from,to))return false;
    const copy=[... piece_array];
    copy[to]=copy[from];
    copy[from]=null;
    return !isInCheck(copy,piece_array[from].color);
}

export const HasLegalMove=(piece_array,color)=>
{
    for (let i=0;i<64;i++)
    {
        const piece=piece_array[i];
        if (piece && piece.color==color)
        {
            for (let j=0;j<64;j++)
            {
                if (isLegal(piece_array,i,j))
                    return true;
            }
        }
    }
    return false;   
}