import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectRoleState = (state:AppState) => state.role_slug

export const selectRole = createSelector(
  selectRoleState,
  (state)=>state.role_slug
)

export const selectID = createSelector(
  selectRoleState,
  (state)=>state.id
)
