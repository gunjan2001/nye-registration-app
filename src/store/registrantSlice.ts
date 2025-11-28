import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Registrant {
  id: string;
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attending: string;
  adults: number;
  kids: number;
  kidAges: number[];
  message?: string;
  createdAt: string;
}

interface State {
  list: Registrant[];
}

const initialState: State = {
  list: [],
};

const registrantSlice = createSlice({
  name: "registrants",
  initialState,
  reducers: {
    addRegistrant: (state, action: PayloadAction<Registrant>) => {
      state.list.push(action.payload);
    },
    deleteRegistrant: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addRegistrant, deleteRegistrant } = registrantSlice.actions;
export default registrantSlice.reducer;
