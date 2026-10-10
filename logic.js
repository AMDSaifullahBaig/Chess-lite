let piece_array=[];
const piece_map={"r":"rook","b":"bishop","n":"knight","k":"king","q":"queen","p":"pawn"};
const seq = "rnbqkbnr|pppppppp|8|8|8|8|PPPPPPPP|RNBQKBNR";
const boardstate=document.querySelector(".board");

const init_pieces=(seq)=>{
    let piece_array=[];
    const rows=seq.split("|");
    for (let i of rows)
    {
        for (let j of i)
        {
            let isBlack=true;
            if (!isNaN(j))
            {
                const num=parseInt(j);
                for (let k=0;k<num;k++)
                {
                    piece_array.push(null);
                }
            }
            else
            {
                if (j==j.toUpperCase())
                    isBlack=false;
                piece_array.push({"color":isBlack?"black":"white","piece":piece_map[j.toLowerCase()]});
            }
        }
    }
    return piece_array;
}
piece_array=init_pieces(seq);


for (let i=0;i<8;i++)
{
    for (let j=0;j<8;j++)
    {
        const square=document.createElement("div")
        square.className=(i+j)%2==0?"white-tile":"black-tile";
        let piece_data=piece_array[i*8+j];
        if (piece_data!=null)
        {
            const piece_div=document.createElement("div");
            piece_div.className = `piece ${piece_data.color}-${piece_data.piece}`;
            piece_div.style.backgroundImage = `url(assets/${piece_data.color}-${piece_data.piece}.svg)`;
            square.appendChild(piece_div);
        }
        boardstate.appendChild(square);
    }
}