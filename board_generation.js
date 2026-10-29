import {isLegal,isInCheck,HasLegalMove} from "./piece_logic.js";
let piece_array=[];
const piece_map={"r":"rook","b":"bishop","n":"knight","k":"king","q":"queen","p":"pawn"};
const seq = "rnbqkbnr|pppppppp|8|8|8|8|PPPPPPPP|RNBQKBNR";
const boardstate=document.querySelector(".board");
const panel=document.querySelectorAll(".infopanel");
const left_panel=panel[0];
const right_panel=panel[1];
let dragged=null;
let dragged_from=null;
let turn="white";
let gameover=false;

const captured={};

let promoting=false;
const promotion_box=document.getElementById("promotion");

const EndTurn=()=>
{
    turn=turn=="black"?"white":"black";
    if (!HasLegalMove(piece_array,turn))
    {
        gameover=true;
        if (isInCheck(piece_array,turn))
            ShowStatus(`Checkmate, ${turn=="white"?"black":"white"} wins`,true);
        else
            ShowStatus("Stalemate, it's a draw",true);
    }
    else if (isInCheck(piece_array,turn))
        ShowStatus(`${turn} is in check`);
};

const AskPromotion=(piece,element)=>
{
    promoting=true;
    promotion_box.innerHTML="";
    for (const name of ["queen","rook","bishop","knight"])
    {
        const choice=document.createElement("div");
        choice.className="PromoChoice";
        choice.style.backgroundImage=`url(assets/${piece.color}-${name}.svg)`;
        choice.addEventListener("click",()=>
        {
            piece.piece=name;
            element.className=`piece ${piece.color}-${name}`;
            element.style.backgroundImage=`url(assets/${piece.color}-${name}.svg)`;
            promotion_box.classList.remove("show");
            promoting=false;
            EndTurn();
        });
        promotion_box.appendChild(choice);
    }
    promotion_box.classList.add("show");
};

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




const status_box=document.getElementById("status");
let status_timer=null;
const ShowStatus=(text)=>
{
    status_box.textContent=text;
    status_box.classList.add("show");
    clearTimeout(status_timer);
    status_timer=setTimeout(()=>status_box.classList.remove("show"),2000);
}
const ShowMoves=(from)=>
{
    for (let i=0;i<64;i++)
    {
        if (isLegal(piece_array,from,i))
        boardstate.children[i].classList.add(piece_array[i]?"capture":"validmove");
    }
}
const ClearMoves=()=>
{
    for (const sq of boardstate.children)
    {
        sq.classList.remove("capture","validmove")
    }
}
const AddCaptured=(piece)=>
{
    const left_panel=document.getElementById("left_panel");
    const right_panel=document.getElementById("right_panel");
    const key=`${piece.color}-${piece.piece}`;
    if (!captured[key])
    {
        const row=document.createElement("div");
        row.className="CapturedRow";
        const icon=document.createElement("div");
        icon.className="CapturedPanel";
        icon.style.backgroundImage=`url('assets/${key}.svg')`;
        const label=document.createElement("span");
        row.appendChild(icon);
        row.appendChild(label);
        (piece.color=="white"?left_panel:right_panel).appendChild(row);
        captured[key]={count:0,label:label};
    }
    captured[key].count++;
    captured[key].label.textContent=`: ${captured[key].count}`;
};

for (let i=0;i<8;i++)
{
    for (let j=0;j<8;j++)
    {
        let piece_data=piece_array[i*8+j];
        const square=document.createElement("div")
        square.className=(i+j)%2==0?"white-tile":"black-tile";
        square.dataset.index=i*8+j;
        square.addEventListener("dragover",(e)=>e.preventDefault())
        square.addEventListener("drop",(e)=>
            {
                if (dragged)
                {
                    const dragged_to=+square.dataset.index;
                    if (dragged_from!=dragged_to && isLegal(piece_array,dragged_from,dragged_to))
                    {
                        if (piece_array[dragged_to])
                            AddCaptured(piece_array[dragged_to]);
                        piece_array[dragged_to]=piece_array[dragged_from];
                        piece_array[dragged_from]=null;
                        square.innerHTML="";
                        square.appendChild(dragged);
                        const landed=piece_array[dragged_to];
                        const piece_element=dragged;

                        if (landed.piece=="pawn" && (dragged_to<8 || dragged_to>=56))
                            AskPromotion(landed,piece_element);
                        else
                            EndTurn();
                    }
                    dragged=null;
                    dragged_from=null;
                }   
            }
        )
        if (piece_data!=null)
        {
            const piece_div=document.createElement("div");
            piece_div.className = `piece ${piece_data.color}-${piece_data.piece}`;
            piece_div.style.backgroundImage = `url(assets/${piece_data.color}-${piece_data.piece}.svg)`;
            piece_div.draggable=true;
            piece_div.addEventListener("dragstart",(e)=>{
                if (gameover||promoting||turn!=piece_data.color)
                {
                    e.preventDefault();
                    return;
                }
                dragged=piece_div;
                dragged_from=+piece_div.parentElement.dataset.index;
                ShowMoves(dragged_from);
            });
            square.appendChild(piece_div);
            piece_div.addEventListener("dragend",ClearMoves);
        }
        boardstate.appendChild(square);
    }
}