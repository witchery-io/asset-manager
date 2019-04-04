import * as OrdersActions from '@trading/actions/orders.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Order } from '@app/shared/intefaces/order.interface';
import * as dotProp from 'dot-prop-immutable';

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
      return adapter.updateMany(action.payload.orders.map(changes => ({id: changes.orderNumber, changes})), state);
    }
    case OrdersActions.UPDATE_ORDER: {
      return adapter.updateOne({id: action.payload.orderNumber, changes: action.payload}, state);
    }
    case OrdersActions.ORDERS_LOADED: {
      return adapter.addAll(action.payload.orders, {...state, isLoading: false, error: null});
    }
    case OrdersActions.ORDERS_NOT_LOADED: {
      return {...state, error: action.payload.error, isLoading: false};
    }
    case OrdersActions.ORDER_DELETE: {
      return adapter.removeOne(action.payload, state);
    }
    case OrdersActions.SUB_ORDER_DELETE: {
      const subId = action.payload;
      const orders = Object.values(state.entities);

      /*
      * TODO: will be changed
      * */
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].subOrders.length; j++) {
          if (orders[i].subOrders[j].orderNumber === subId) {
            return dotProp.delete(state, `entities.${orders[i].orderNumber}.subOrders.${j}`);
          }
        }
      }

      return state;
    }
    case OrdersActions.ORDER_ADD: {
      return adapter.addOne(action.payload, state);
    }
    default: {
      return state;
    }
  }
}
