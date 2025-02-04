import { cn } from '@/lib/utils'
import { ShoppingBag, ShoppingCart } from 'lucide-react'
import React from 'react'
import { ModeToggle } from './ModeToggle'
import { CartSheet } from '../cart/CartSheet'

export const Topbar = ({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div className='flex items-center w-full h-20 border-b px-4'>
            <div className={cn('flex items-center justify-between w-full max-w-7xl mx-auto text-3xl font-bold text-muted-foreground', className)}>
                {children}
                <div className='flex items-center gap-3'>
                    <ModeToggle />
                    <CartSheet />
                </div>
            </div>
        </div>
    )
}
