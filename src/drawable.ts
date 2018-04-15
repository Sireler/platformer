import {Size} from "./size";
import {ObjectPosition} from "./position";

export class Drawable
{
    size: Size;
    texture: HTMLImageElement;
    position: ObjectPosition;

    constructor(src: string)
    {
        this.texture = new Image();
        this.texture.src = src;
        this.position = new ObjectPosition();
        this.size = null;
    }

    draw(ctx: CanvasRenderingContext2D): void
    {
        if (!this.size) {
            ctx.drawImage(
                this.texture,
                this.position.x,
                this.position.y
            );
        } else {
            ctx.drawImage(
                this.texture,
                this.position.x,
                this.position.y,
                this.size.width,
                this.size.height
            );
        }
    }
}