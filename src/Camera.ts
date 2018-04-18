import {ObjectPosition} from "./Position";

/**
 * Camera for track the player
 */
export class Camera
{
    position: ObjectPosition;

    constructor()
    {
        this.position = new ObjectPosition();
    }
}