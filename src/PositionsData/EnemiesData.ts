import {BlocksData} from "./BlocksData";

export class EnemiesData extends BlocksData
{
    data;

    constructor()
    {
        super();
        this.calculate();
    }

    // calculate Y position
    calculate()
    {
        this.data.forEach((obj) => {
            obj.y -= 50;
        });
    }
}