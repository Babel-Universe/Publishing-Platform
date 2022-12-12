import React from 'react';
import './PostPage.css';
import EditorJS from '@editorjs/editorjs';

// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import ImageTool from '@editorjs/image';


class PostPage extends React.Component<{}, {}> {
  
  protected editor: any;

  constructor(props: {}) {
    super(props)
  
  }

  componentDidMount() {
    let id = window.location.pathname.substring(6);
    console.log('post', id)

    // fake data
    const placeholder = [
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

    this.initEditor(placeholder);
  }

  initEditor(content: any) {
    this.editor = new EditorJS({
      /**
       * Enable/Disable the read only mode
       */
      readOnly: true,

      /**
       * Id of Element that should contain Editor instance
       */
      holder: 'editorjs',

      /** 
       * Available Tools list. 
       * Pass Tool's class or Settings object for each Tool you want to use 
       */ 
      tools: {
        header: Header,
        image: ImageTool,
        list: List,
      }, 

      /**
       * Saved data that should be rendered
       */
      data: {
        blocks: content
      }
    });
  }

  render() {
    return (
      <div>
        <div className="editor-container" id="editorjs" />
      </div>
    );
  }
}

export default PostPage;
