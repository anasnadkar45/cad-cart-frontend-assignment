"use client"
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/utils/redux/slices/CartSlice';
import { ProductData } from '@/lib/types';
import { Topbar } from '@/components/global/Topbar';

const ProductDetail = ({
    params,
}: {
    params: { id: string };
}) => {
    const { toast } = useToast();
    const dispatch = useDispatch()

    const [product, setProduct] = useState<ProductData>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!params.id) return;  // Don't fetch data if id is not available

        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/${params.id}`);
                const data = await response.json();
                setProduct(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    function AddToCart(e: React.MouseEvent) {
        e.stopPropagation()
        dispatch(addToCart({ id: product?.id, title: product?.title, price: product?.price, quantity: 1, image: product?.images[0] }))
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Skeleton className="h-[400px] w-full" />
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-3/4" />
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-10 w-32" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <Topbar>
                <h1 className='font-bold text-xl'>{product.title}</h1>
            </Topbar>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="aspect-square bg-secondary rounded-lg p-3">
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-3xl font-bold">{product.title}</h2>
                            <p className="text-2xl font-bold mt-2 text-muted-foreground">${product.price}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-muted-foreground">Description</h3>
                            <p className="text-gray-600">{product.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-yellow-400">★</span>
                            <span className="font-medium">{product.rating}</span>
                        </div>
                        <Button
                            size="lg"
                            onClick={AddToCart}
                            className="w-full md:w-auto"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;
