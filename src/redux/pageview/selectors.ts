import { ViewMode } from "../../interfaces/pageviews";
import { createSelector } from "reselect";

export const baseSelector = ({ pageview }) => pageview;

export const pageviewSelector = createSelector(
  baseSelector,
  ({ viewmode }): ViewMode => {
    return viewmode;
  }
);
