import {Drawable} from "./Draw/Drawable";
import {Size} from "./Size";
import {Screen} from "./Screen";

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

    // Drawing object into a canvas
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