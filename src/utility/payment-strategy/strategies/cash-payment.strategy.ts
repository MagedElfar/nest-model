import { Injectable } from '@nestjs/common';
import { PaymentStrategy } from './../payment-strategy.interface';
import { IOrder } from 'src/feachers/orders/order-interface';
import { OrdersService } from 'src/feachers/orders/orders.service';
import { OrderStatus } from 'src/core/constants';
import { OrderScope } from 'src/feachers/orders/order.entity';

@Injectable()
export class CashPaymentStrategy implements PaymentStrategy {

    constructor(private readonly ordersService: OrdersService) { }
    async pay(order: IOrder) {

        try {
            await this.ordersService.update(order.id, {
                status: OrderStatus.CONFIRMED
            })

            return await this.ordersService.findById(order.id, Object.values(OrderScope))
        } catch (error) {
            throw error
        }

    }
}
