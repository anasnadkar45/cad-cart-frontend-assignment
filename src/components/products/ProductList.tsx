import { ProductData } from '@/lib/types'
import React from 'react'
import { ProductCard } from './ProductCard'

export const ProductList = ({ products }: { products: ProductData[] }) => {
    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map((product) =>(
                <ProductCard key={product.id} product={product as ProductData}/>
            ))}
        </div>
    )
}
