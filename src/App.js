import React from 'react'

import AppContextProvider from './contextProvider/AppContextProvider'
import MainView from './components/MainView'
import './App.css'

const App = () => (
  <AppContextProvider>
    <MainView />
  </AppContextProvider>
)

export default App;
