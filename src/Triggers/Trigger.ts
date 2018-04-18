import {ObjectPosition} from "../position";
import {Size} from "../size";
import {Drawable} from "../drawable";

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

    get center() {
        return new ObjectPosition(
            this.position.x + this.size.width / 2,
            this.position.y + this.size.height / 2
        );
    }

    draw(ctx, camera) {
        if (this.drawable) {
            this.drawable.draw(ctx, camera);
        }
    }

    abstract onTrigger(obj);

    checkHit(obj)
    {
        var distance = this.center.distance(obj.center);
        if (distance < this.radius) {
            this.onTrigger(obj);
        }
    }
}
