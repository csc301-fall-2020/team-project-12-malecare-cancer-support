import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebardata';
import './sidebar.css';
import { IconContext } from 'react-icons';
import mentorIcon from "../../images/mentorIcon.svg";
import heartIcon from "../../images/heartIcon.svg";
import {CurUserContext} from "../../curUserContext";
import {getUser} from "../../actions/serverRequests";

class SideBar extends React.Component {
    static contextType= CurUserContext;
    constructor(props) {
        super(props);
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

    getUserProfileImage = async (userId) => {
        const response = await getUser(this.context.getCurrentUser().accessToken, userId);
        const data = response.responseData;
        const profileImage = data.user.profileImage;
        return profileImage;
    }
  
    render () {
        return (
        <>
            <IconContext.Provider value={{ color: '#e74b1a'}}>
            <div className='sidebar'>
                <div>
                    <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={this.showSidebar} />
                    </Link>
                </div>
                <div></div>
                <div >
                    <h1 className='logo'>CancerChat</h1>
                </div>
                <div>
                <img
                  className="mentorIcon"
                  src={mentorIcon}
                  alt="Switch to mentoring mode"
                />
                <img
                  className="heartIcon"
                  src={heartIcon}
                  alt="Switch to dating mode"
                />
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
                <img src={this.getUserProfileImage(this.context.getCurrentUser().userId)}></img>
                {SidebarData.map((item, index) => {
                if (item.title == 'Logout'){
                    return (
                        <li key={index} className={item.cName} onClick={() => this.context.logout()}>
                            <Link to={item.path}>
                            {item.icon}
                            <span className="sidebar-item-title">{item.title}</span>
                            </Link>
                        </li>
                    )
                } else {
                    return (
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                        {item.icon}
                        <span className="sidebar-item-title">{item.title}</span>
                        </Link>
                    </li>
                    );}
                })
                }
                </ul>
            </nav>
            </IconContext.Provider>
        </>
        );
    }
  }
  
  SideBar.contextType = CurUserContext;

  export default SideBar;