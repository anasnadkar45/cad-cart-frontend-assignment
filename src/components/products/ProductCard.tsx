"use client"

import type { ProductData } from "@/lib/types"
import React, { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Image from "next/image"
import { Star } from "lucide-react"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { useDispatch } from "react-redux"
import { addToCart } from "@/app/utils/redux/slices/CartSlice"
import Link from "next/link"

export const ProductCard = ({ product }: { product: ProductData }) => {
  const [imgSrc, setImgSrc] = useState(product.images[0] || "/placeholder.svg")
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();

  function AddToCart(e: React.MouseEvent) {
    e.stopPropagation()
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1, image: product.images[0] }))
  }

  return (
    <Card className="flex flex-col justify-between">
      <Link href={`/product/${product.id}`}>
        <CardHeader>
          <div className="relative w-full h-48 bg-secondary rounded-md">
            <Image
              src={imgSrc || "/placeholder.svg"}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover rounded-lg p-2 transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"
                }`}
              loading="lazy"
              onError={() => setImgSrc("/placeholder.svg")}
              onLoadingComplete={() => setIsLoading(false)}
            />
            {isLoading && <Skeleton className="absolute inset-0 rounded-lg" />}
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle>{product.title}</CardTitle>
          <p className="line-clamp-2 text-muted-foreground">{product.description}</p>
          <div className="flex items-center justify-between">
            <h1>${product.price}</h1>
            <div className="flex items-center gap-3">
              <Star />
              <span>{product.rating}</span>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter>
        <Button className="w-full" onClick={AddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}

