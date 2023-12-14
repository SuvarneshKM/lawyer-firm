import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllLawyers } from "../../lib/helper";

interface Lawyer {
  id: number;
  name: string;
  speciality: string;
  firms: string;
  address: string;
  phone: string;
  availableTime: string[];
}

interface LawyersState {
  lawyers: Lawyer[];
  bookedTimeSlots: string[];
}

const initialState: LawyersState = {
  lawyers: [],
  bookedTimeSlots: [],
};

const lawyersSlice = createSlice({
  name: "lawyers",
  initialState,
  reducers: {
    dragDropLawyers: (
      state,
      action: PayloadAction<{ draggedIndex: number; destinationIndex: number }>
    ) => {
      const { draggedIndex, destinationIndex } = action.payload;
      const newLawyers = Array.from(state.lawyers);
      const [removed] = newLawyers.splice(draggedIndex, 1);
      newLawyers.splice(destinationIndex, 0, removed);

      state.lawyers = newLawyers;
    },
    bookTimeSlot: (
      state,
      action: PayloadAction<{ lawyerId: number; timeSlot: string }>
    ) => {
      const { lawyerId, timeSlot } = action.payload;
      const lawyer = state.lawyers.find((l) => l.id === lawyerId);

      if (lawyer) {
        lawyer.availableTime = lawyer.availableTime.filter(
          (slot) => slot !== timeSlot
        );
        state.lawyers = [...state.lawyers];
      }
    },
    unbookTimeSlot: (
      state,
      action: PayloadAction<{ lawyerId: number; timeSlot: string }>
    ) => {
      const { lawyerId, timeSlot } = action.payload;
      const lawyer = state.lawyers.find((l) => l.id === lawyerId);

      if (lawyer) {
        lawyer.availableTime.push(timeSlot);
        state.lawyers = [...state.lawyers];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLawyersAsync.fulfilled, (state, action) => {
      state.lawyers = action.payload;
    });
  },
});

export const fetchLawyersAsync = createAsyncThunk(
  "lawyers/fetchLawyers",
  async () => {
    const response = await getAllLawyers();
    const lawyers = (await response.json()) as Lawyer[];
    return lawyers;
  }
);

export const incrementAsync = createAsyncThunk(
  "counter/incrementAsync",
  async (amount: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

export const { dragDropLawyers, bookTimeSlot, unbookTimeSlot } =
  lawyersSlice.actions;

export default lawyersSlice.reducer;
