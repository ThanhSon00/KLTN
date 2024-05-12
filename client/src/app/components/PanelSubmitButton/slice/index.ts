import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { LoadingIndicatorState } from './types';
import { forgotPassword, login, register } from 'services/auth.service';
import { createQuestion, getQuestions } from 'services/question.service';
import { createAnswer, updateAnswerDetail } from 'services/answer.service';
import { fullTextSearch } from 'services/searching.service';

export const initialState: LoadingIndicatorState = {
  display: false,
};

const slice = createSlice({
  name: 'loadingIndicatorState',
  initialState,
  reducers: {},
  extraReducers: builder => {
    const serviceList = [
      login, forgotPassword, register, createQuestion, 
      createAnswer, updateAnswerDetail, getQuestions, fullTextSearch
    ];
    for (const thunk of serviceList) {
      builder.addCase(thunk.pending, state => {
        state.display = true;
      });
      builder.addCase(thunk.fulfilled, state => {
        state.display = false;
      });
      builder.addCase(thunk.rejected, state => {
        state.display = false;
      });
    }
  },
});

export const { actions: Actions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};

export default slice.reducer;
/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
