import{Dice}from"./dice.js";
import{YatzyEngine}from"./yatzyEngine.js";

export class YatzyGame{
    constructor(){
        this.dice=new Dice();
        this.engine=new YatzyEngine();
        this.rollsLeft=3;
        this.total=0;
    }
    roll(){if(this.rollsLeft>0){this.rollsLeft--;return this.dice.roll();}return this.dice.getValues();}
    endTurn(){this.rollsLeft=3;this.dice.resetHolds();}
    score(category){
        const vals=this.dice.getValues();
        const pts=this.engine.calculateScore(category,vals);
        this.engine.categories[category]=pts;
        this.total=Object.values(this.engine.categories).reduce((a,b)=>a+b,0);
        return pts;
    }
}
