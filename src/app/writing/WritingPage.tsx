import React from 'react';
import EditorPage from '../editor/EditorPage';
import './WritingPage.css';

// interface WritingPageProps {
//   metadata?: any;
//   bgColor?: boolean;
//   callback?: (data: any) => void;
// }

interface WritingPageState {
  posts: any[];
}

class WritingPage extends React.Component<{}, WritingPageState> {
  
  constructor(props: {}) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <EditorPage />
      </div>
    );
  }
}

export default WritingPage;
