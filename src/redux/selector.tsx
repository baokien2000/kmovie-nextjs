import { createSelector } from "@reduxjs/toolkit";

export const getIndex = (state: any) => state.test.index;
export const getStatus = (state: any) => state.test.status;