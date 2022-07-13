import { combineReducers } from "redux";
import events from "./events/reducer";
import pageview from "./pageview/reducers";

export default combineReducers({
  events,
  pageview,
});
