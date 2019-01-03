import React from 'react';
import { SecondLinkNav } from './SecondLinkNav'

import './SecondNavbar.sass';


export const SecondNavbar = props => <div className="wrapper second__nav__bar">
           <nav>
             <ul>
               <SecondLinkNav to="/articles" text="Agregar Articulos" icon="fas fa-plus-circle" />
               <SecondLinkNav to="/newArticles" text="Nuevos Articulos" icon="fas fa-shopping-basket" />
               <SecondLinkNav to="/all-articles" text="Articulos Livepool" icon="fas fa-shopping-basket" />
             </ul>
           </nav>
         </div>;
