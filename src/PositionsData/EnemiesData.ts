import {BlocksData} from "./BlocksData";

export class EnemiesData extends BlocksData
{
    data;
    except;

    constructor()
    {
        super();

        // exclusion of enemy creation on the block
        this.except = [
            {
                x: 1210,
                y: 50
            },
            {
                x: 1070,
                y: -50
            },
            {
                x: 332,
                y: 400
            },
        ];
        this.calculate();
    }

    // calculate Y position and check except (to draw enemies)
    calculate()
    {
        this.data.forEach((obj, i) => {

            this.except.forEach((exc) => {
                if (obj.x == exc.x && obj.y == exc.y) {
                    delete this.data[i];
                }
            });

            obj.y -= 50;
        });
    }
}