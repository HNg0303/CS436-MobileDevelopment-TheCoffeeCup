export interface Coffee {
    id: number;
    name: string;
    type: string;
    price: number;
    image: string;
    points: number;
    description: string;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    loyalty_points: number;
    profile_image?: string;
    num_badges: number;
}

export interface Order {
    id: number;
    customerId: number;
    coffeeId: number;
    quantity: number;
    totalPrice: number;
    orderDate: string;
    shot: 'single' | 'double';
    size: 'small' | 'medium' | 'large';
    ice: '25%' | '50%' | 'Full Ice';
    select: 'iced' | 'hot';
}

export interface OrderHistory {
    id: number;
    customerId: number;
    coffeeId: number;
    quantity: number;
    totalAmount: number;
    created_at: string;
    status: 'completed' | 'cancelled' | 'refunded' | 'pending';
}


export interface Reward {
    id: number;
    name: string;
    description: string;
    points_required: number;
    type: string;
}