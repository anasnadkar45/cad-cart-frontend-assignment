"use client"
import { RootState } from "@/app/utils/redux/store"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Skeleton } from "../ui/skeleton"
import Image from "next/image"
import { removeFromCart, updateQuantity } from "@/app/utils/redux/slices/CartSlice"

export const CartSheet = () => {
    const cart = useSelector((state: RootState) => state.CartReducer)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()

    function incrementQuantity(product: any) {
        dispatch(updateQuantity({ id: product.id, quantity: product.quantity + 1 }))
    }

    function decrementQuantity(product: any) {
        if (product.quantity > 1) {
            dispatch(updateQuantity({ id: product.id, quantity: product.quantity - 1 }))
        }
    }

    function removeItem(product: any) {
        dispatch(removeFromCart(product.id))
    }

    const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="p-0 relative h-fit hover:bg-transparent">
                    <ShoppingBag />
                    <span className="absolute -top-3 -right-3 bg-yellow-400 rounded-full px-1.5 h-fit">{cart.length}</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-full lg:max-w-[800px] max-h-[100vh] overflow-y-auto p-4 space-y-4">
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                </SheetHeader>
                {cart.length > 0 ? (
                    <div className="space-y-2 p-4 bg-card border rounded-lg">
                        {cart.map((product) => (
                            <div key={product.id} className="grid grid-cols-7 gap-4 border-b pb-2">
                                <div className="relative col-span-2 w-full h-48 bg-secondary rounded-md">
                                    <Image
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className={`object-cover rounded-lg p-2 transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"
                                            }`}
                                        loading="lazy"
                                        onLoadingComplete={() => setIsLoading(false)}
                                    />
                                    {isLoading && <Skeleton className="absolute inset-0 rounded-lg" />}
                                </div>
                                <div className="col-span-5 flex flex-col justify-between">
                                    <div className="w-full flex justify-between items-center">
                                        <h1 className="text-muted-foreground text-xl font-medium">{product.title}</h1>
                                        <span className="font-bold text-2xl">${(product.price * product.quantity).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Button size="icon" onClick={() => decrementQuantity(product)}>-</Button>
                                            <span>{product.quantity}</span>
                                            <Button size="icon" onClick={() => incrementQuantity(product)}>+</Button>
                                        </div>
                                        <Button variant="destructive" onClick={() => removeItem(product)}>Delete</Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="h-[400px] w-full flex justify-center items-center border rounded-lg">
                        Your Cart is empty
                    </div>
                )}
                {cart.length > 0 && (
                    <div className="text-right font-semibold text-lg mt-4">
                        Total Price: <span className="text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                )}
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" className="w-full">Checkout</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
