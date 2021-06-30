export class Care
{
    id: number;
    name: string;
    duration: number;
    price: number;
    description: string;

    constructor(data: any)
    {
        this.id = data.id;
        this.name = data.name;
        this.duration = data.duration;
        this.price = data.price;
        this.description = data.description;
    }
}