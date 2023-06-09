import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware,compose} from 'redux'
import {persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import reducer from './reducers'
import reduxThunk from 'redux-thunk'





const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


const store=createStore(reducer, composeEnhancers( applyMiddleware(reduxThunk)))
ReactDOM.render(
<Provider store={store}>
<PersistGate loading={null} persistor={persistStore(store)}>
  <App/>
  </PersistGate>
</Provider> ,  
    document.getElementById("root"))