import React from 'react';
import { Link } from 'react-router-dom';
import './LinkNav.sass';

export const LinkNav =({ to, icon, text, img }) => {
  let txt = text;
  if(icon){
    return (
      <div className='link-elment'>
        <li>
          <Link to={to}>
            <i className={icon}></i>
          </Link>
        </li>
      </div>
      )
  }
  if(txt){
    return(
      <div className='link-elment'>
          <li>
              <Link to={to}>
                <span>{text}</span>
              </Link>
          </li>
      </div>
    );
  }
  if(img){
    return(
      <div className='link-elment'>
          <li>
              <Link to={to}>
                <img src={img} alt='userphoto'/>
              </Link>
          </li>
      </div>
    );
  }
}