import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatTimestamp } from '../util/util';
import './PostCard.css';

interface PostCardProps {
  metadata: any;
  bgColor?: boolean;
  callback?: (data: any) => void;
}

interface PostCardState {
  // repost: number;
  // likes: number;
  // liked: boolean;
  // reposted: boolean;
}

class PostCard extends React.Component<PostCardProps, PostCardState> {
  
  constructor(props: PostCardProps) {
    super(props);
    
  }

  render() {
    let data = this.props.metadata;

    return (
      <NavLink className="card-link" to={"/post/" + data.id}>
        <div className='card-container'>
          <div className='card-header'>
            {data.author} {formatTimestamp(data.time)}
          </div>

          {data.image &&
            <img className="card-image" src={data.image} />
          }

          <div className='card-title'>
            {data.title}
          </div>

          <div className='card-content'>
            {data.content}
          </div>

          <div className='card-tag'>
            {data.tag}
          </div>
        </div>
      </NavLink>
    );
  }
}

export default PostCard;
