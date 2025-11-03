import{YatzyGame}from"./yatzyGame.js";

const game=new YatzyGame();
const diceContainer=document.getElementById("dice-container");
const rollInfo=document.getElementById("roll-info");
const btnRoll=document.getElementById("btn-roll");
const btnEnd=document.getElementById("btn-end");
const btnNew=document.getElementById("btn-new");
const scoreBody=document.getElementById("score-body");
const totalCell=document.getElementById("total");

const DICE_SYMBOLS=["⚀","⚁","⚂","⚃","⚄","⚅"];

function renderDice(vals){
    diceContainer.innerHTML="";
    vals.forEach((v,i)=>{
        const d=document.createElement("div");
        d.className="die";
        if(game.dice.held[i])d.classList.add("held");
        d.textContent=DICE_SYMBOLS[v-1];
        d.addEventListener("click",()=>{game.dice.toggleHold(i);renderDice(vals);});
        diceContainer.appendChild(d);
    });
}
function renderRollsLeft(){rollInfo.textContent=`Rolls left: ${game.rollsLeft}`;}
function renderScoreboard(){
    scoreBody.innerHTML="";
    for(const cat in game.engine.categories){
        const row=document.createElement("tr");
        const catCell=document.createElement("td");
        catCell.textContent=cat;
        const valCell=document.createElement("td");
        valCell.textContent=game.engine.categories[cat];
        row.append(catCell,valCell);
        row.addEventListener("click",()=>{
            if(game.engine.categories[cat]===0){
                const pts=game.score(cat);
                valCell.textContent=pts;
                totalCell.textContent=game.total;
                game.endTurn();
                renderDice(game.dice.getValues());
                renderRollsLeft();
            }
        });
        scoreBody.appendChild(row);
    }
}
btnRoll.addEventListener("click",()=>{
    const vals=game.roll();
    renderDice(vals);
    renderRollsLeft();
});
btnEnd.addEventListener("click",()=>{
    game.endTurn();
    renderDice(game.roll());
    renderRollsLeft();
});
btnNew.addEventListener("click",()=>{
    location.reload();
});
renderDice(game.dice.getValues());
renderRollsLeft();
renderScoreboard();
btnRoll.addEventListener("click", () => {
    const vals = game.roll();
    renderDice(vals);
    renderRollsLeft();

    if (game.rollsLeft === 0) {
        setTimeout(() => {
            alert("No rolls left! Starting a new turn...");
            game.endTurn();
            renderDice(game.dice.getValues());  // show base dice
            renderRollsLeft();                  // properly shows 3
        }, 500);
    }
});
