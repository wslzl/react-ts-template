import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["userReducer"],
};

const persist = persistReducer(persistConfig, rootReducer);

const store = createStore(persist);

const persistor = persistStore(store);

export { store, persistor };
