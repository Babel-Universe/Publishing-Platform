import React from 'react';
import './EditorPage.css';
import EditorJS from '@editorjs/editorjs';

// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import ImageTool from '@editorjs/image';


// temp
const placeholder = [
  {
    type: "header",
    data: {
    }
  },
  // {
  //   type : 'paragraph',
  //   data : {
  //     text : 'Tell your story...'
  //   }
  // },
  // {
  //   type: 'image',
  //   data: {
  //     file: {
  //       url : "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg"
  //     },
  //     caption: 'a caption',
  //     stretched: false,
  //     withBorder: true,
  //     withBackground: false,
  //   }
  // },
];

interface EditorPageProps {
  readOnly?: boolean;
  content?: any;
}

class EditorPage extends React.Component<EditorPageProps, {}> {
  
  protected editor;

  constructor(props: EditorPageProps) {
    super(props)
  
    this.editor = new EditorJS({
      /**
       * Enable/Disable the read only mode
       */
      readOnly: this.props.readOnly,

      /**
       * Id of Element that should contain Editor instance
       */
      holder: 'editorjs',

      /** 
       * Available Tools list. 
       * Pass Tool's class or Settings object for each Tool you want to use 
       */ 
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Title...'
          },
          shortcut: 'CMD+SHIFT+H'
        },
        
        image: ImageTool,
        list: List,
      }, 

      /**
       * Saved data that should be rendered
       */
      data: {
        blocks: this.props.content ? this.props.content : placeholder
      }
    });
  }

  onSave() {
    // console.log('SAVE DATA', data);
    this.editor.save().then((outputData) => {
      console.log('Article data: ', outputData)
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }

  render() {
    return (
      <div>
        <div className="editor-container" id="editorjs" />

        <div className='button-container'>
          <button className="button-save" onClick={()=>this.onSave()}>Save</button>
        </div>
      </div>
    );
  }
}

export default EditorPage;
