import React, { Component } from 'react';
import {Provider} from 'react-redux';
import './index.css';
import { BrowserRouter,Route } from 'react-router-dom';
import Header from './common/header';
import Home from './pages/home';
import Detail from './pages/detail/loadable.js';
import Write from './pages/write';
import Login from './pages/login';
//需要使用store里面的数据，引用store
import store from './store';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <div>
           
            <BrowserRouter>
                <Header/>
                <Route path='/' exact component={Home}></Route>
                <Route path='/login' exact component={Login}></Route>
                <Route path='/write' exact component={Write}></Route>
                <Route path='/detail/:id' exact component={Detail}></Route>

            </BrowserRouter>
         </div>
      </Provider>
    );
  }
}

export default App;
