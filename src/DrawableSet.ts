import {ObjectPosition} from "./position";
import {Size} from "./size";

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

    // Создание и загрузка изображений
    loadTextures()
    {
        for (var name in this.srcs) {
            this.textures[name] = new Image();
            this.textures[name].src = this.srcs[name];
        }
    }

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