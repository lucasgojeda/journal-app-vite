import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux';

import { store } from './store/store';
import { JournalApp } from './JournalApp'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <JournalApp />
    </Provider>
  </React.StrictMode>
)
