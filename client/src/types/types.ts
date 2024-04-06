import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from './RootState';
import { UnknownAction } from 'redux';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  UnknownAction
>;
