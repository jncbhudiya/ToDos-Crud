// src/store/apiStore.ts
type ApiState = {
  loading: boolean;
  error: string | null;
};

type ApiAction =
  | { type: "API_REQUEST" }
  | { type: "API_SUCCESS" }
  | { type: "API_ERROR"; payload: string }
  | { type: "API_RESET" };

const initialState: ApiState = {
  loading: false,
  error: null,
};

const apiReducer = (
  state: ApiState = initialState,
  action: ApiAction
): ApiState => {
  switch (action.type) {
    case "API_REQUEST":
      return { ...state, loading: true, error: null };
    case "API_SUCCESS":
      return { ...state, loading: false };
    case "API_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "API_RESET":
      return initialState;
    default:
      return state;
  }
};

let currentState = initialState;
const subscribers: Array<() => void> = [];

export const dispatch = (action: ApiAction) => {
  currentState = apiReducer(currentState, action);
  subscribers.forEach((subscriber) => subscriber());
};

export const getApiState = (): ApiState => currentState;

export const subscribe = (callback: () => void) => {
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index !== -1) subscribers.splice(index, 1);
  };
};
