import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store'

type SliceState = string

const initialState: SliceState = ''

const guessSlice = createSlice({
  name: 'guess',
  initialState,
  reducers: {
    addCurrentGuess: (state, action: PayloadAction<string>) => {
      return state + action.payload
    },
    backspaceGuess: (state) => {
      return state.slice(0, -1)
    },
    clearGuess: (state) => {
      return ''
    },
  },
})

export const { addCurrentGuess, backspaceGuess, clearGuess } =
  guessSlice.actions

export const selectGuess = (state: RootState) => state.guess

export default guessSlice.reducer