import React from 'react';
import './EditorPage.css';
import EditorJS from '@editorjs/editorjs';

// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import ImageTool from '@editorjs/image';

import { NFTStorage } from 'nft.storage'
import { CLIENT_EMAIL, doc, PRIVATE_KEY, SHEET_ID } from '../home/HomePage';

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
  content?: any;
  readOnly?: boolean;
  hideSaveButton?: boolean;
  // callback?: (data: any) => void;
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
    this.editor.save().then((outputData) => {
      console.log('Article data: ', outputData)
      // localStorage.setItem('posts', JSON.stringify(outputData));
      this.storePost(JSON.stringify(outputData));
    }).catch((error) => {
      console.log('Saving failed: ', error)
    });
  }

  /**
   * Stores the post to IPFS.
   * @param {any} json the post in json format.
   */
  async storePost(json: any) {
    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: process.env.REACT_APP_NFT_STORAGE_KEY })
    const content    = new Blob([json]);
    const cid        = await nftstorage.storeBlob(content);
    console.log('Article cid: ', cid)

    // send the cid to google sheet
    this.appendSpreadsheet(cid);
  }

  async appendSpreadsheet(cid: string) {
    let url = 'https://ipfs.io/ipfs/' + cid;
    const newRow = { Author: "KZ", Email: 'email', PostURL: url, 
      PostedTime: new Date().toLocaleString(), ApprovedTime: new Date().toLocaleString() };

    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });

      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const result = await sheet.addRow(newRow);
      console.log('result: ', result)

    } catch (e) {
      console.error('Doc Error: ', e);
    }
  };

  render() {
    return (
      <div>
        <div className="editor-container" id="editorjs" />

        {!this.props.hideSaveButton &&
          <div className='button-container'>
            <button className="button-save" onClick={()=>this.onSave()}>Save</button>
          </div>
        }
      </div>
    );
  }
}

export default EditorPage;
