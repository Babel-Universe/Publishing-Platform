import React from 'react';
import EditorPage from '../editor/EditorPage';
import './WritingPage.css';

interface WritingPageProps {
  // metadata?: any;
  // callback?: (data: any) => void;
}

interface WritingPageState {
  // posts: any[];
}

class WritingPage extends React.Component<WritingPageProps, WritingPageState> {
  
  constructor(props: WritingPageProps) {
    super(props);
    this.state = {
      // posts: [],
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
