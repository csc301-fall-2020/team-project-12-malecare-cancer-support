import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebardata';
import './sidebar.css';
import { IconContext } from 'react-icons';

class SideBar extends React.Component {
    constructor() {
        super();
        this.state = {
            sidebar: false
        }
    }

  
    showSidebar = () => {
        this.setState((prev) => {
            return {
                sidebar: !prev.sidebar
            }
        })
    }
  
    render () {
        return (
        <>
            <IconContext.Provider value={{ color: 'black' }}>
            <div className='sidebar'>
                <div>
                    <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={this.showSidebar} />
                    </Link>
                </div>
                <div >
                    <h1>CancerChat</h1>
                </div>
                <div>

                </div>
            </div>
            <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={this.showSidebar}>
                <li className='sidebar-toggle'>
                    <Link to='#' className='menu-bars'>
                    <AiIcons.AiOutlineClose />
                    </Link>
                </li>
                {SidebarData.map((item, index) => {
                    return (
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                        {item.icon}
                        <span className="sidebar-item-title">{item.title}</span>
                        </Link>
                    </li>
                    );
                })}
                </ul>
            </nav>
            </IconContext.Provider>
        </>
        );
    }
  }
  
  export default SideBar;