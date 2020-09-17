import React, { useState, useEffect } from 'react';
import "./Sidebar.css";
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, MoreVert, DonutLarge, Chat } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {

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


    return (
        <div className="sidebar">
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
