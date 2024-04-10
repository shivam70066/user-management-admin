import {createAction, props} from "@ngrx/store"



export const setRole = createAction(
  '[Role] Set Role',
  props<{ role_slug: string }>()
);

export const setID = createAction(
  '[Role] Set ID',
  props<{ id: number }>()
);
