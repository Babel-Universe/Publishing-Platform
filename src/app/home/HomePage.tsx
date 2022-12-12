import React from 'react';
import { msOfNow } from '../util/util';
import './HomePage.css';
import PostCard from './PostCard';
import { BsFillCaretDownFill } from 'react-icons/bs';


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

  async getPosts() {
    // let userId = Server.user.getName();
    // console.log('userId', userId)
    // let response = await Server.social.getPosts(userId);

    // FACk DATA
    let json = [
      {
        id: 1000,
        author: 'Author Name',
        image: '/coming-soon.png',
        title: 'Lnsectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis ',
        content: 'This is content This is content This is content This is content This is content This is content ',
        tag: '#tag-1',
        time: 1670300807
      },
      {
        id: 1001,
        author: 'Author Name',
        image: '',
        title: 'Lnsectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis ',
        content: 'This is content This is content This is content This is content This is content This is content ',
        tag: '#tag-1',
        time: 1670300807
      },
      {
        id: 1002,
        author: 'Author Name',
        image: '/coming-soon.png',
        title: 'This is a title',
        content: 'This is content This is content This is content This is content This is content This is content ',
        tag: '#tag-1',
        time: 1670300807
      },
      {
        id: 1003,
        author: 'Author Name',
        image: '/coming-soon.png',
        title: 'This is a title',
        content: 'This is content This is content This is content This is content This is content This is content ',
        tag: '#tag-1',
        time: 1670300807
      },
    ];

    //-----------------
    // TEMP CODE - testing post
    let fake_post = JSON.parse(localStorage.getItem('posts'));
    console.log('post', fake_post)

    if (fake_post) {
      let fake_json =
      {
        id: 1006,
        author: 'Kevin Z',
        image: '',
        title: fake_post.blocks[0].data.text,
        content: fake_post.blocks[1].data.text,
        tag: '#tag-6',
        time: fake_post.time / 1000
      }
  
      json.unshift(fake_json);
    }

    //-----------------
    let posts = [];
    for (let i = 0; i < json.length; i++) {
      posts.push(<PostCard key={i + msOfNow()} metadata={json[i]} />)
    }
    
    this.setState({ posts: posts });
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
