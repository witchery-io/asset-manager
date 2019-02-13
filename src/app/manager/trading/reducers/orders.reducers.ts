import * as OrdersActions from '@trading/actions/orders.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Order } from '@app/shared/intefaces/order.interface';

export interface State extends EntityState<Order> {
  isLoading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (model: Order) => model.orderNumber,
});

export const initialState: State = adapter.getInitialState({
  isLoading: false,
  error: null,
});

export function reducer(state: State = initialState, action: OrdersActions.Actions): State {
  switch (action.type) {
    case OrdersActions.LOAD_ORDERS: {
      return {...state, isLoading: true};
    }
    case OrdersActions.UPDATE_ORDERS: {
      return state;
    }
    case OrdersActions.UPDATE_ORDER_ITEMS: {
      return adapter.updateMany(action.payload.orders.map(changes => ({id: changes.orderNumber, changes})), state);
    }
    case OrdersActions.ORDERS_LOADED: {
      return adapter.addAll(action.payload.orders, {...state, isLoading: false, error: null});
    }
    case OrdersActions.ORDERS_NOT_LOADED: {
      return {...state, error: action.payload.error, isLoading: false};
    }
    default: {
      return state;
    }
  }
}
