import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserResponse} from "../../models/User";


interface AuthState {
    accessToken: string | null;
    user: UserResponse | null;
    // refreshToken: string | null;
}

const initialState: AuthState = {
    accessToken: null,
    user: null,
    // refreshToken: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setUser: (state, action: PayloadAction<UserResponse>) => {
            state.user = action.payload
        },
        // updateRefreshToken: (state, action: PayloadAction<string>) => {
        //     state.refreshToken = action.payload;
        // },
        // updateParticipant: (state, action: PayloadAction<ParticipantResponse>) => {
        //     state.participant = action.payload;
        // },
        resetAuthState: (state) => {
            state.accessToken = null;
            state.user = null;
            // state.refreshToken = null;
        }
    },
});

export const {
    resetAuthState,
    updateAccessToken,
    setUser
// updateParticipant, updateRefreshToken, resetAuthState
}
    = authSlice.actions;

export default authSlice.reducer;