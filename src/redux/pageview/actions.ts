import { ViewMode } from "../../interfaces/pageviews";

export const SET_PAGE_VIEW_MODE = "pageview/SET_PAGE_VIEW_MODE";

export interface PageViewAction<T> {
  type: string;
  payload: T;
}

export const setPageViewOption = (
  option: ViewMode
): PageViewAction<ViewMode> => {
  return { type: SET_PAGE_VIEW_MODE, payload: option };
};
