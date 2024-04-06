import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { Saga } from './saga';
import { Question } from './types';
import { createQuestion } from 'services/question.service';

export const initialState: Question[] = [];

const slice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const { actions: QuestionActions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: Saga });
  return { actions: slice.actions };
};
