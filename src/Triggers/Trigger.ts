import {ObjectPosition} from "../Position";
import {Size} from "../Size";
import {Drawable} from "../Draw/Drawable";

export abstract class Trigger {
    position: ObjectPosition;
    size: Size;
    radius: number;
    drawable: Drawable;

    constructor(position: ObjectPosition, size: Size) {
        this.position = position;
        this.size = size;
        this.drawable = null;
        this.radius = (size.width < size.height) ? size.width / 2 : size.height / 2;
    }

    // returns center of the object
    get center() {
        return new ObjectPosition(
            this.position.x + this.size.width / 2,
            this.position.y + this.size.height / 2
        );
    }

    // Drawing object into a canvas
    draw(ctx, camera) {
        if (this.drawable) {
            this.drawable.draw(ctx, camera);
        }
    }

    // method for implementing contact with object
    abstract onTrigger(obj);

    // checking the contact of objects
    checkHit(obj)
    {
        var distance = this.center.distance(obj.center);
        if (distance < this.radius) {
            this.onTrigger(obj);
        }
    }
}
