import {Character} from "./character";

export abstract class Enemy extends Character {
    constructor(srcs) {
        super(srcs);
        this.ballsprite = "sprites/plazmaball.png";
    }

}

