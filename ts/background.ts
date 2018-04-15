import {Drawable} from "./drawable";
import {Size} from "./size";
import {Screen} from "./screen";

export class Background extends Drawable
{
    size: Size;

    constructor(src: string)
    {
        super(src);
        let screenSize = new Screen();
        this.size = new Size(
            screenSize.width,
            screenSize.height
        );
    }

    draw(ctx: CanvasRenderingContext2D): void
    {
        super.draw(ctx);
    }
}