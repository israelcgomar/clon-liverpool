import React from 'react'

import './SideNavBarToggleBtn.sass'

export const SideNavBarToggleBtn = props => {
  return(
    <button className="btn-sideBar" onClick={props.click}>
      <i className="fas fa-bars"></i>
    </button>
  );
}
