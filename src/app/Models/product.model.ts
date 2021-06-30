export class Product
{
    reference: number;
    name: string;
    stock: number;
    price: number;
    image_url: string;
    description: string;
    emploi: string;
    ingredient: string;

    constructor(data: any)
    {
        this.reference = data.reference;
        this.name = data.name;
        this.stock = data.stock;
        this.price = data.price;
        this.image_url = data.image_url;
        this.description = data.description;
        this.emploi = data.emploi;
        this.ingredient = data.ingredient;
    }
}