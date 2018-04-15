import {Drawable} from "./drawable";
import {Size} from "./size";
import {Screen} from "./screen";

export class Background extends Drawable
{
    size: Size;
    screenSize: Screen;

    constructor(src: string)
    {
        super(src);
        this.screenSize = new Screen();
        this.size = new Size(
            this.screenSize.width,
            this.screenSize.height
        );
    }

    draw(ctx: CanvasRenderingContext2D, camera): void
    {
        this.position.normalize(this.screenSize);
        var offsetX = camera.position.x * this.cameraC;
        offsetX = offsetX - (offsetX % this.screenSize.width);
        this.position.x = offsetX;

        super.draw(ctx, camera);

        this.position.x -= this.screenSize.width;
        super.draw(ctx, camera);
        this.position.x += this.screenSize.width * 2;
        super.draw(ctx, camera);
    }
}