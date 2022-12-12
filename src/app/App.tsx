import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import SitePage from './SitePage';
import HomePage from './home/HomePage';
import './App.css';
import WritingPage from './writing/WritingPage';
import PostPage from './post/PostPage';

interface AppState {
  userUpdated: number;
  initialized: boolean;
};

class App extends React.Component<{}, AppState> {
  constructor(props = {}) {
    super(props);

    this.state = {
      userUpdated: 0,
      initialized: false
    }

    // Server.init();
    // this.setInitialized = this.setInitialized.bind(this);
    // this.userUpdated = this.userUpdated.bind(this);
  }

  setInitialized() {
    this.setState({initialized: true});
  }

  userUpdated() {
    this.setState({userUpdated: this.state.userUpdated+1});
  }

  render() {
    // if (!this.state.initialized)
    //   return (<LoadingPage setInitialized={this.setInitialized} />);

    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SitePage />}>
            <Route index element={<HomePage />} />
            <Route path='/writing' element={<WritingPage />} />
            <Route path='/post/:id' element={<PostPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
