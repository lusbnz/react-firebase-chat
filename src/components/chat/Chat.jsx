import { useState } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';

const Chat = () => {
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [textValue, setTextValue] = useState('');

    const handleOpenEmojiPicker = () => {
        setOpenEmojiPicker(!openEmojiPicker);
    };

    const handleEmoji = (e) => {
        setTextValue(textValue + e.emoji);
        setOpenEmojiPicker(false);
    };

    return (
        <div className='chat'>
            <div className='top'>
                <div className='user'>
                    <img src="./avatar.png" alt="" />
                    <div className='texts'>
                        <span>Lusbnz</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className='icons'>
                    <img src="./phone.png" alt="" />
                    <img src="./video.png" alt="" />
                    <img src="./info.png" alt="" />
                </div>
            </div>
            <div className='center'>
                <div className="message own">
                    <div className='texts'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className='texts'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className='texts'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className='texts'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className='texts'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className='texts'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message own">
                    <div className='texts'>
                        <img src="https://images.pexels.com/photos/26955061/pexels-photo-26955061/free-photo-of-a-person-s-hand-reaching-out-in-a-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className='texts'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className='texts'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="message">
                    <img src="./avatar.png" alt="" />
                    <div className='texts'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
                        <span>1 min ago</span>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <div className='icons'>
                    <img src="./img.png" alt="" />
                    <img src="./camera.png" alt="" />
                    <img src="./mic.png" alt="" />
                </div>
                <input
                    type='text'
                    placeholder='Type a message...'
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                />
                <div className='emoji'>
                    <img
                        src='./emoji.png'
                        alt=""
                        onClick={handleOpenEmojiPicker}
                    />
                    <div className='picker'>
                        <EmojiPicker
                            open={openEmojiPicker}
                            onEmojiClick={handleEmoji}
                        />
                    </div>
                </div>
                <button className='sendButton'>Send</button>
            </div>
        </div>
    )
};

export default Chat;