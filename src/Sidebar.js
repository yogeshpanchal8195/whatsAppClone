import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, MoreVert, DonutLarge, Chat } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';
import { useParams } from 'react-router-dom';

function Sidebar(props) {

    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => {
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        })
    }, []);

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) => {
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        })
    }, [rooms]);

    var roomId=window.location.pathname.slice(7);;
    useEffect(() => {
        roomId = window.location.pathname.slice(7);
    }, [window.location.pathname])


    return (
        <div className={`sidebar ${roomId ? 'sidebarMbParam' : ''} `} >
            <div className="sidebar_header">
                <Avatar src={user.photoURL} />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_search_container">
                    <SearchOutlined />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat addNewChat={true} />
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
