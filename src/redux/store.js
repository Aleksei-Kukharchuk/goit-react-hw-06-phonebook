import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import phonebookReducer from './phonebook/phonebook-reducer';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, 
} from 'redux-persist'
import phonebookPersistConfig from './phonebook/phonebooks-persist-config'

const middleware = [...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }), logger]

const store = configureStore({
    reducer: {phonebook: persistReducer(phonebookPersistConfig, phonebookReducer)},
    middleware,
    devTools: process.env.NODE_ENV === "development"
})

const persistor = persistStore(store)

// eslint-disable-next-line import/no-anonymous-default-export
export default {store, persistor};