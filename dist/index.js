"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
class Ant {
    constructor(id, directions, position) {
        this.id = id;
        this.speed = 1.0;
        this.directions = directions;
        this.position = position;
    }
    walk() {
        switch (this.directions) {
            case 'left':
                this.position = this.position - this.speed / 2;
                break;
            case 'right':
                this.position = this.position + this.speed / 2;
                break;
            default:
                throw new Error(`directions error. 定義されてない。 ${this.directions}`);
        }
    }
    switchDirections() {
        switch (this.directions) {
            case 'left':
                this.directions = 'right';
                break;
            case 'right':
                this.directions = 'left';
                break;
            default:
                throw new Error(`switchDirections error. 定義されてない。 ${this.directions}`);
        }
    }
}
class Rod {
    constructor() {
        this.length = 99;
    }
}
class RodOnAnts {
    constructor(rod) {
        this.interbal = 1.0;
        this.rod = rod;
        this.ants = [];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            let beforeDirections = 'left';
            let position = 0.0;
            let directions;
            for (let i = 0; i <= rod.length; i++) {
                if (beforeDirections === 'left') {
                    directions = 'right';
                }
                else {
                    directions = 'left';
                }
                this.ants.push(new Ant(i, directions, position));
                beforeDirections = directions;
                position = position + this.interbal;
            }
        });
    }
    fallAnt() {
        this.ants = this.ants.filter(ant => ant.position > 0 && ant.position < this.rod.length);
    }
    clash() {
        const switchedIds = [];
        let beforeAnt;
        this.ants.forEach(ant => {
            const switchedId = switchedIds.filter(s => s.id === ant.id);
            if (beforeAnt && switchedId.length === 0 && ant.position === beforeAnt.position) {
                ant.switchDirections();
                beforeAnt.switchDirections();
                switchedIds.push(ant, beforeAnt);
            }
            beforeAnt = ant;
        });
    }
}
const rod = new Rod();
const rodOnAnts = new RodOnAnts(rod);
rodOnAnts.init().then(() => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    let c = 0;
    while (rodOnAnts.ants.length > 0) {
        try {
            for (var _b = (e_1 = void 0, __asyncValues(rodOnAnts.ants)), _c; _c = yield _b.next(), !_c.done;) {
                const ant = _c.value;
                ant.walk();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        yield rodOnAnts.fallAnt();
        yield rodOnAnts.clash();
        c++;
        console.log('残りの蟻', rodOnAnts.ants.length);
    }
    console.log('全ての蟻が落ちるまでかかった時間', `${c * 0.5}s`);
}));
//# sourceMappingURL=index.js.map