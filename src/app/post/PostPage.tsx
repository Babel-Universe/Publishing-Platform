import React from 'react';
import './PostPage.css';
import EditorPage from '../editor/EditorPage';


interface PostPageState {
  content: any;
}

class PostPage extends React.Component<{}, PostPageState> {
  
  protected editor: any;

  constructor(props: {}) {
    super(props);
    this.state = {
      content: ''
    };
  }

  componentDidMount() {
    let id = window.location.pathname.substring(6);
    console.log('post', id)

    let content = [
      {
        type: "header",
        data: {
          text: 'This is a title'
        }
      },
      {
        type : 'paragraph',
        data : {
          text : 'This is a story...'
        }
      },
      {
        type: 'image',
        data: {
          file: {
            url : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg"
          },
          caption: 'a caption',
          stretched: false,
          withBorder: true,
          withBackground: false,
        }
      },
    ];

    // TEMP CODE - testing post
    let fake_post = JSON.parse(localStorage.getItem('posts'));
    if (fake_post) {
      if (id == '1006') {
        content = fake_post.blocks;
      }
    }

    this.setState({ content: content });
  }

  render() {
    return (
      <div>
        {this.state.content &&
          <EditorPage readOnly={true} content={this.state.content} hideSaveButton={true} />
        }
      </div>
    );
  }
}

export default PostPage;
