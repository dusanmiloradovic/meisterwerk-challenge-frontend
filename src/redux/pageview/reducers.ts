import { ViewMode, PageListInfo } from "../../interfaces/pageviews";
import { SET_PAGE_VIEW_MODE, PageViewAction } from "./actions";

export interface PageViewState {
  viewmode: ViewMode;
  pageListInfo?: PageListInfo;
}

const initialState: PageViewState = {
  viewmode: "calendar",
};

const reducer = (state = initialState, action: PageViewAction<any>) => {
  switch (action.type) {
    case SET_PAGE_VIEW_MODE:
      return {
        ...state,
        viewmode: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
