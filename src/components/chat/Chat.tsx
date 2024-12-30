import { useState } from 'react';
import {
  Arrow,
  ArrowTopIcon,
  ChatIcon,
  FileIcon,
  SatisfiedIcon,
} from 'src/assets/svg';
import { renderMessage } from './parts/renderMessages';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface IChatHistory {
  role: 'user' | 'model';
  parts: unknown;
}

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAt7LC1xRoXNBRki9Rv9PTgh-OcF6xrHNY`;
const CHAT_HISTORY: IChatHistory[] = [];

export const Chat = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {
      content: 'Hey there 👋 How can I help you today?',
      type: 'incoming',
      isThinking: false,
      fileMessage: { data: '', mime_type: '' },
    },
  ]);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleOutgoingMessage = (
    message: string,
    fileMessage: { data: string | undefined; mime_type: string }
  ) => {
    const newMessage = {
      content: message,
      type: 'outgoing',
      isThinking: false,
      fileMessage: {
        data: fileMessage.data ? fileMessage.data : '',
        mime_type: fileMessage.mime_type,
      },
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.currentTarget.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target?.result?.toString().split(',')[1];

        const fileMessage = {
          data: base64String,
          mime_type: file.type,
        };

        handleOutgoingMessage(inputValue, fileMessage);
        setInputValue('');
      };

      e.currentTarget.value = '';
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
    }
  };

  const generateAiResponse = async () => {
    CHAT_HISTORY.push({
      role: 'user',
      parts: [
        { text: inputValue },
        ...(messages[messages.length - 1].fileMessage.data
          ? [{ inline_data: messages[messages.length - 1].fileMessage }]
          : []),
      ],
    });

    const newMessage = {
      content: '...',
      type: 'incoming',
      isThinking: true,
      fileMessage: { data: '', mime_type: '' },
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: CHAT_HISTORY,
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || 'Unknown error occurred');
      }

      const apiResponseText = data.candidates[0].content.parts[0].text.trim();

      CHAT_HISTORY.push({
        role: 'model',
        parts: [{ text: apiResponseText }],
      });

      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...newMessage,
          content: apiResponseText,
          isThinking: false,
        };
        return updatedMessages;
      });
    } catch (error: unknown) {
      console.error('Error generating AI response:', error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          ...newMessage,
          content: "Sorry, I couldn't process your request.",
          isThinking: false,
        };
        return updatedMessages;
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const userMessage = e.currentTarget.value.trim();

    if (e.key === 'Enter' && userMessage) {
      e.preventDefault();
      setInputValue('');
      handleOutgoingMessage(userMessage, { data: '', mime_type: '' });
      generateAiResponse();
    }
  };

  const toggleEmojiPicker = () => setIsEmojiPickerVisible((prev) => !prev);

  const handleEmojiSelect = (emoji: { native: string }) => {
    setInputValue(inputValue + emoji.native);
    toggleEmojiPicker();
  };

  return (
    <div className='bg-red-500 min-h-screen flex items-center justify-center'>
      <div className='w-[420px] bg-white rounded-[15px] shadow-[0_0_128px_0_rgba(0,0,0,0.1),0_32px_64px_-48px_rgba(0,0,0,0.5)] relative'>
        <div className='w-[420px] bg-[#5350C4] p-[15px] flex items-center justify-between flex-shrink-0 rounded-t-[15px]'>
          <div className='flex gap-4 items-center'>
            <ChatIcon
              className='h-9 w-9 bg-white rounded-full p-1.5 flex-shrink-0'
              fill='#5350C4'
            />
            <h2 className='text-[1.31rem] font-semibold'>ChatBot</h2>
          </div>
          <button className='w-10 h-10 relative border-none rounded-full bg-transparent hover:bg-[#3d39ac] transition-all duration-2000'>
            <Arrow
              className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90'
              fill='#fff'
            />
          </button>
        </div>

        <div className='p-[25px] pl-[22px] flex gap-[20px] h-[460px] mb-[82px] overflow-y-auto flex-col'>
          {messages.map((message, index) => {
            return renderMessage(message, index);
          })}
        </div>

        <div className='absolute bottom-0 w-full bg-white px-[22px] py-[20px]'>
          <form
            onSubmit={(e) => e.preventDefault()}
            action='#'
            className='relative flex items-center bg-white outline-[1px] outline-[#cccce5] rounded-[50%] w-full'
          >
            <textarea
              value={inputValue}
              onKeyDown={(e) => handleKeyDown(e)}
              onChange={(e) => handleInputChange(e)}
              className='border-2 border-[#cccccc] outline-none h-[47px] w-full text-black text-[0.95rem] py-[10px] pl-[18px] pr-[120px] resize-none focus:border-[#706db0] rounded-[20px]'
              placeholder='Message...'
            />

            <div className='absolute right-[6px] top-1/2 transform -translate-y-1/2 flex gap-[3px]'>
              <button
                type='button'
                className='h-[35px] w-[35px] border-none transition-all duration-200 ease-in-out text-[#706db0] bg-white rounded-full text-[1.15rem] hover:bg-[#f1f1ff] flex items-center justify-center'
                onClick={toggleEmojiPicker}
              >
                <SatisfiedIcon />
              </button>

              {isEmojiPickerVisible && (
                <div className='absolute bottom-[45px] right-[5px] z-10'>
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    searchPosition='none'
                    previewPosition='none'
                  />
                </div>
              )}

              <div>
                <input
                  type='file'
                  accept='image/*'
                  id='file-input'
                  hidden
                  onChange={(e) => handleFileUpload(e)}
                />
                <button
                  type='button'
                  onClick={() => document.getElementById('file-input')?.click()}
                  className='h-[35px] w-[35px] border-none transition-all duration-200 ease-in-out text-[#706db0] bg-white rounded-full text-[1.15rem] hover:bg-[#f1f1ff] flex items-center justify-center'
                >
                  <FileIcon />
                </button>
              </div>

              <button
                disabled={!inputValue.length}
                type='submit'
                className={`h-[35px] w-[35px] border-none transition-all duration-200 ease-in-out text-white rounded-full text-[1.15rem] 
                ${
                  inputValue.length
                    ? 'bg-[#5b57a0]'
                    : 'bg-[#d3d3d3] cursor-not-allowed'
                } flex items-center justify-center cursor-pointer`}
              >
                <ArrowTopIcon className='text-white' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
