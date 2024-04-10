import { setID, setRole } from './role.actions';
import { createReducer, on } from "@ngrx/store"

export interface RoleState{
  role_slug: string,
  id: number
}

const initialRoleState:RoleState = {
  role_slug:"employee",
  id: 0
}

export const roleReducer = createReducer(
  initialRoleState,
  on(setRole, (state, { role_slug }) => ({ ...state, role_slug })),
  on(setID, (state, { id }) => ({ ...state, id }))
)
