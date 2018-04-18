import {ObjectPosition} from "../Position";
import {Size} from "../Size";

export class DrawableSet
{
    srcs: object;
    position: ObjectPosition;
    size: Size;
    textures: object;

    constructor(srcs: object)
    {
        this.srcs = srcs;
        this.position = new ObjectPosition();
        this.size = null;
        this.textures = {};
    }

    // Creating and loading images
    loadTextures()
    {
        for (var name in this.srcs) {
            this.textures[name] = new Image();
            this.textures[name].src = this.srcs[name];
        }
    }

    // Drawing object into a canvas
    draw(ctx: CanvasRenderingContext2D, name: string, camera): void
    {
        if (!this.size) {
            ctx.drawImage(
                this.textures[name],
                this.position.x - camera.position.x,
                this.position.y - camera.position.y
            );
        } else {
            ctx.drawImage(
                this.textures[name],
                this.position.x - camera.position.x,
                this.position.y - camera.position.y,
                this.size.width,
                this.size.height
            );
        }
    }
}