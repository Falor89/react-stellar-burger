import { rootReducer } from '../../services/reducers/index';
import { ThunkAction } from 'redux-thunk';
import { ThunkDispatch } from 'redux-thunk';
import { TActualIngredientsActions } from '../../services/actions/constructor';
import { TActualModalActions } from '../../services/actions/modal';
import { TOrderActions } from '../../services/actions/order';
import { TUserActions } from '../../services/actions/user';
import { TSocketActions } from '../../services/actions/wsSocket';
import { TLoadingActions } from '../../services/actions/ingredients';
import { Action, ActionCreator } from 'redux';

export type TApplicationActions = TActualIngredientsActions | TActualModalActions
    | TOrderActions | TUserActions
    | TSocketActions | TLoadingActions

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    undefined,
    TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

type TBackground = {
    readonly hash: string;
    readonly key: string;
    readonly pathname: string;
    readonly search: string;
    readonly state: undefined;
};

export interface IAboutOrderProps {
    background?: undefined | TBackground
}