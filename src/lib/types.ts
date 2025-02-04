export type ProductData = {
    id: number;
    title: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    availabilityStatus: string;
    minimumOrderQuantity: number;
    returnPolicy: string;
    warrantyInformation: string;
    shippingInformation: string;
    sku: string;
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    tags: string[];
    images: string[];
    thumbnail: string;
    meta: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    reviews: { [key: string]: any }[];
};
