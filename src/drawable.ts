import {Size} from "./size";
import {ObjectPosition} from "./position";

export class Drawable
{
    size: Size;
    texture: HTMLImageElement;
    position: ObjectPosition;
    cameraC: number; // Camera coef

    constructor(src: string)
    {
        this.texture = new Image();
        this.texture.src = src;
        this.position = new ObjectPosition();
        this.size = null;
        this.cameraC = 1;
    }

    draw(ctx: CanvasRenderingContext2D, camera): void
    {
        if (!this.size) {
            ctx.drawImage(
                this.texture,
                this.position.x - camera.position.x * this.cameraC,
                this.position.y - camera.position.y * this.cameraC
            );
        } else {
            ctx.drawImage(
                this.texture,
                this.position.x - camera.position.x * this.cameraC,
                this.position.y - camera.position.y * this.cameraC,
                this.size.width,
                this.size.height
            );
        }
    }
}