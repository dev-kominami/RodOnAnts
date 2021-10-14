type Directions = 'left' | 'right';

class Ant {
    id: number;
    speed: number
    directions: Directions
    position: number
    constructor(id: number, directions: Directions, position: number) {
        this.id = id
        this.speed = 1.0
        this.directions = directions
        this.position = position
    }
    
    walk() {
        switch(this.directions) {
            case 'left':
                this.position = this.position - this.speed/2;
                break;
            case 'right':
                this.position = this.position + this.speed/2;
                break;
            default:
                throw new Error(`directions error. 定義されてない。 ${this.directions}`)
        }
    }
    
    switchDirections() {
        switch(this.directions) {
            case 'left':
                this.directions = 'right';
                break;
            case 'right':
                this.directions = 'left';
                break;
            default:
                throw new Error(`switchDirections error. 定義されてない。 ${this.directions}`)
        }
    }
}

class Rod {
    readonly length: number
    constructor() {
        this.length = 99;
    }
}

class RodOnAnts {
    rod :Rod;
    ants: Ant[];
    interbal: number = 1.0;
    constructor(rod:Rod ) {
        this.rod = rod;
        this.ants = [];
    }
    
    async init() {
        let beforeDirections: Directions = 'left';
        let position: number = 0.0;
        let directions: Directions;
        for ( let i = 0 ; i <= rod.length; i++ ) {
            if (beforeDirections === 'left') {
                directions = 'right';
            } else {
                directions = 'left';
            }
            this.ants.push(new Ant(i ,directions, position))
            beforeDirections = directions
            position = position + this.interbal
        }
    }
    
    fallAnt() {
        this.ants = this.ants.filter(ant => ant.position > 0 && ant.position < this.rod.length );
    }
    
    clash() {
        const switchedIds: Ant[] = [];
        let beforeAnt: Ant;
        
        this.ants.forEach(ant => {
            const switchedId = switchedIds.filter(s => s.id === ant.id);
            if(beforeAnt && switchedId.length === 0 && ant.position === beforeAnt.position) {
                ant.switchDirections();
                beforeAnt.switchDirections();
                switchedIds.push(ant, beforeAnt);
            }
            beforeAnt = ant;
        })
    }
}

const rod = new Rod();
const rodOnAnts = new RodOnAnts(rod);
rodOnAnts.init().then(async () => {
    
    let c = 0
    while(rodOnAnts.ants.length > 0 ) { 
        for await (const ant of rodOnAnts.ants ) {
            ant.walk();
        }
        await rodOnAnts.fallAnt();
        await rodOnAnts.clash();
        c ++;
        console.log('残りの蟻', rodOnAnts.ants.length);
    }
    console.log('全ての蟻が落ちるまでかかった時間',`${c * 0.5}s`);
});




