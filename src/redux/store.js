import { configureStore } from '@reduxjs/toolkit'           	  	//툴킷 임포트
import movieReducer from './reducers/movieReducer';      	 	
 		

const store = configureStore({
    reducer:{  							
      movie : movieReducer
    }
})
export default store;	