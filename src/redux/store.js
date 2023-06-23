import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; // redux-persist의 persistStore 및 persistReducer 임포트
import storage from 'redux-persist/lib/storage'; // 로컬 스토리지를 사용하는 저장소 선택
import movieReducer from './reducers/movieReducer';

const persistConfig = {
  key: 'root', // 저장된 데이터를 구분하기 위한 키
  storage, // 사용할 저장소
};

const persistedReducer = persistReducer(persistConfig, movieReducer); // persistReducer를 사용하여 지속성이 적용된 리듀서 생성

const store = configureStore({
  reducer: {
    movie: persistedReducer, // 지속성이 적용된 리듀서를 사용
  },
});

const persistor = persistStore(store); // persistor를 생성하여 스토어와 연결

export { store, persistor };