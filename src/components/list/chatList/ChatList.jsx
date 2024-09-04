import { useState } from 'react';
import './chatList.css';

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);

    const handleAddMode = () => {
        setAddMode(!addMode);
    };

    return (
        <div className='chatList'>
            <div className='search'>
                <div className="searchBar">
                    <img src='./search.png' alt='search' />
                    <input type='text' placeholder='Search' />
                </div>
                <img
                    src={addMode ? `./minus.png` : `./plus.png`}
                    alt='plus'
                    className='add'
                    onClick={handleAddMode}
                />
            </div>
            <div className='item'>
                <img src="./avatar.png" alt="avatar" />
                <div className='texts'>
                    <span>Lusbnz</span>
                    <p>hello world</p>
                </div>
            </div>
            <div className='item'>
                <img src="./avatar.png" alt="avatar" />
                <div className='texts'>
                    <span>Lusbnz</span>
                    <p>hello world</p>
                </div>
            </div>
            <div className='item'>
                <img src="./avatar.png" alt="avatar" />
                <div className='texts'>
                    <span>Lusbnz</span>
                    <p>hello world</p>
                </div>
            </div>
            <div className='item'>
                <img src="./avatar.png" alt="avatar" />
                <div className='texts'>
                    <span>Lusbnz</span>
                    <p>hello world</p>
                </div>
            </div>
        </div>
    )
};

export default ChatList;