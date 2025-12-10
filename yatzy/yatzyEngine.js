export class YatzyEngine{
    constructor(){
        this.categories={
            Ones:0, Twos:0, Threes:0, Fours:0, Fives:0, Sixes:0,
            "Three of a Kind":0, "Four of a Kind":0,
            "Full House":0, "Small Straight":0, "Large Straight":0,
            Chance:0, Yatzy:0
        };
    }
    calculateScore(category,vals){
        const counts=[1,2,3,4,5,6].map(n=>vals.filter(v=>v===n).length);
        const sum=vals.reduce((a,b)=>a+b,0);
        switch(category){
            case"Ones":return counts[0]*1;
            case"Twos":return counts[1]*2;
            case"Threes":return counts[2]*3;
            case"Fours":return counts[3]*4;
            case"Fives":return counts[4]*5;
            case"Sixes":return counts[5]*6;
            case"Three of a Kind":return counts.some(c=>c>=3)?sum:0;
            case"Four of a Kind":return counts.some(c=>c>=4)?sum:0;
            case"Full House":return counts.includes(3)&&counts.includes(2)?25:0;
            case"Small Straight":return this.hasStraight(counts,4)?30:0;
            case"Large Straight":return this.hasStraight(counts,5)?40:0;
            case"Chance":return sum;
            case"Yatzy":return counts.includes(5)?50:0;
            default:return 0;
        }
    }
    hasStraight(counts,len){
        const seq=counts.map(c=>c>0?1:0).join("");
        return seq.includes("1111")&&len===4||seq.includes("11111")&&len===5;
    }
}
