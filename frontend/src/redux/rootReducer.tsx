import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import theme from "./slices/theme";
import auth from "./slices/auth";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  whitelist: [],
  blacklist: [],
};

const themePersistConfig = {
  key: "theme",
  storage,
  keyPrefix: "redux-",
  blacklist: [],
};
const authPersistConfig = {
  key: "auth",
  storage,
  keyPrefix: "redux-",
  blacklist: [],
};

const rootReducer = combineReducers({
  theme: persistReducer(themePersistConfig, theme),
  auth: persistReducer(authPersistConfig, auth),
});

export { rootPersistConfig, rootReducer };
