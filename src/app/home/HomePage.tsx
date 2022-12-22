import React from 'react';
import { msOfNow } from '../util/util';
import './HomePage.css';
import PostCard from './PostCard';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { GoogleSpreadsheet } from "google-spreadsheet";

// Config variables
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
export const SHEET_ID = process.env.REACT_APP_SHEET_ID;
export const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
export const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n');

export const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
// console.log('CLIENT_EMAIL', SPREADSHEET_ID,doc)

interface HomePageState {
  posts: any[];
  filterAll: boolean;
  filterFollowing: boolean;
  filterCharacter: boolean;
  filterStoryline: boolean;
  filterBackstory: boolean;
}

class HomePage extends React.Component<{}, HomePageState> {
  
  constructor(props: {}) {
    super(props);
    this.state = {
      posts: [],
      filterAll: false,
      filterFollowing: false,
      filterCharacter: false,
      filterStoryline: false,
      filterBackstory: false,
    };
  }

  componentDidMount() {
    this.getPosts();
  }

  async readPost(url: string) {
    try {
      let resp = await fetch(url);
      let data = await resp.json();
      return data;
    } catch (error) {
      console.log('fetch err:',  error);
    }
  }

  showPosts(data: any) {
    let json =
    {
      id: 1006,
      author: 'Kevin Z',
      image: '',
      title: data.blocks[0].data.text,
      content: data.blocks[1].data.text,
      tag: '#tag-6',
      time: data.time / 1000
    }

    // let posts = [];
    // for (let i = 0; i < json.length; i++) {
    //   posts.push(<PostCard key={i + msOfNow()} metadata={json[i]} />)
    // }
    
    this.state.posts.push(<PostCard key={msOfNow()} metadata={json} />)
    this.setState({ posts: this.state.posts });
  }

  async getPosts() {
    // let userId = Server.user.getName();
    // console.log('userId', userId)
    // let response = await Server.social.getPosts(userId);

    // Read google sheet
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });

      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const rows  = await sheet.getRows();
      // console.log('rows: ', rows)

      for (let i = 0; i < rows.length; i++) {
        const approvedTime = rows[i].ApprovedTime;
        
        if (approvedTime) {
          const postUrl = rows[i].PostURL;
          // console.log('postUrl: ', postUrl)
          let post = await this.readPost(postUrl);
          console.log('post: ', post)
          this.showPosts(post);
        }
      }
    } catch (e) {
      console.error('Error: ', e);
    }
  }

  NoPost = () => {
    return (
      <div className="new-msg-container">
        <div className="new-msg-title">Start a new post</div>
        <div className="new-msg-text">Not any posts in your timeline yet.</div>
      </div>
    )
  }
  
  onFilterAll() {
    this.setState({ filterAll: !this.state.filterAll });
  }
  
  onFilterFollowing() {
    this.setState({ filterFollowing: !this.state.filterFollowing });
  }
  
  onFilterCharacter() {
    this.setState({ filterCharacter: !this.state.filterCharacter });
  }
  
  onFilterStoryline() {
    this.setState({ filterStoryline: !this.state.filterStoryline });
  }
  
  onFilterBackstory() {
    this.setState({ filterBackstory: !this.state.filterBackstory });
  }

  render() {
    // if (!Server.account.isLoggedIn()) 
    //   return (<Navigate to='/login' />);

    return (
      <div>
        <div className='home-banner'>
          <img className="poster-avata" src='/coming-soon.png' />
        </div>
        
        <div className='filter-bottom-line' />

        <div className='filters-container'>
          <div className='filters-buttons'>
            <div className={`filter-text ${this.state.filterAll ? 'active' : ''}`} onClick={() => this.onFilterAll()}>
              All
            </div>

            <div className={`filter-text ${this.state.filterFollowing ? 'active' : ''}`} onClick={() => this.onFilterFollowing()}>
              Following
            </div>

            <div className='filter-div-line' />

            <button className={`filter-button ${this.state.filterCharacter ? 'active' : ''}`} onClick={() => this.onFilterCharacter()}>
              Character
            </button>

            <button className={`filter-button ${this.state.filterStoryline ? 'active' : ''}`} onClick={() => this.onFilterStoryline()}>
              Storyline
            </button>

            <button className={`filter-button ${this.state.filterBackstory ? 'active' : ''}`} onClick={() => this.onFilterBackstory()}>
              Backstory
            </button>
          </div>

          <div className='filters-buttons'>
            <div className='filter-static-text'>View by</div>
            <div className='filter-selected'>Featured</div>
            <div className='filter-dropdown'><BsFillCaretDownFill /></div>
          </div>
        </div>

        <div className='big-container'>
          <div className='posts-container'>
            {this.state.posts.length > 0 
              ? this.state.posts
              : <this.NoPost />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
