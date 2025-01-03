import { MessageList } from './ui/MessageList';
import { MessageInput } from './ui/MessageInput';
import { commonUISelectors } from 'src/app/store/reducers/common-ui/selectors';
import { setIsChatOpened } from 'src/app/store/reducers/common-ui/dispatchers';
import { useState } from 'react';

import { useAppSelector } from '@shared';
import { usePreventBodyScroll, useChat, ArrowIcon, ChatIcon } from '@shared';

export const Chat = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { isChatOpened } = useAppSelector(commonUISelectors.commonUIInfo);
  usePreventBodyScroll(isHovered);

  const {
    messages,
    inputValue,
    isEmojiPickerVisible,
    setInputValue,
    handleInputChange,
    handleOutgoingMessage,
    setTempFile,
    handleFileUpload,
    generateAiResponse,
    toggleEmojiPicker,
    tempFile,
    handleEmojiSelect,
  } = useChat();

  const isAnyMessagePending = messages.some((msg) => msg.isPending);
  const toggleChatOpenedState = () => setIsChatOpened(!isChatOpened);
  const toggleHoverState = () => setIsHovered((prev) => !prev);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const userMessage = e.currentTarget.value.trim();

    if (isAnyMessagePending) return;

    if (e.key === 'Enter' && (userMessage || tempFile)) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSendMessage = () => {
    if (isAnyMessagePending) return;
    if (inputValue || tempFile) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const message = inputValue.trim();

    handleOutgoingMessage(message, tempFile);
    generateAiResponse();
    setTempFile(undefined);
    setInputValue('');
  };

  return (
    <>
      {!isChatOpened && (
        <>
          <div
            className='fixed bottom-10 right-[0.5rem] md:right-[3rem] z-[9999] flex items-center justify-center cursor-pointer'
            onClick={toggleChatOpenedState}
          >
            <ChatIcon
              className='h-[4rem] w-[4rem] bg-white rounded-full p-1.5 flex-shrink-0'
              fill='#5350C4'
            />
          </div>
        </>
      )}

      <div
        className={`fixed z-[9999] ${
          isChatOpened
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-10 scale-90 pointer-events-none'
        }  bottom-0 right-0 left-0 top-auto md:top-auto md:bottom-10 flex items-center justify-center transition-all duration-500 ease-in-out md:w-[420px] md:h-[600px] md:left-auto md:right-[20px] w-full h-full`}
        onMouseEnter={toggleHoverState}
        onMouseLeave={toggleHoverState}
      >
        <div className='w-full h-full bg-white shadow-[0_0_128px_0_rgba(0,0,0,0.1),0_32px_64px_-48px_rgba(0,0,0,0.5)] relative md:rounded-[15px]'>
          <div className='w-full bg-[#5350C4] p-[15px] flex items-center justify-between flex-shrink-0 md:rounded-t-[15px]'>
            <div className='flex gap-4 items-center'>
              <ChatIcon
                className='h-9 w-9 bg-white rounded-full p-1.5 flex-shrink-0'
                fill='#5350C4'
              />
              <h2 className='text-[1.31rem] font-semibold'>Brainwave AI</h2>
            </div>
            <button
              onClick={toggleChatOpenedState}
              className='w-10 h-10 relative border-none rounded-full bg-transparent hover:bg-[#3d39ac] transition-all duration-200'
            >
              <ArrowIcon
                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90'
                fill='#fff'
              />
            </button>
          </div>

          <MessageList messages={messages} />

          <MessageInput
            tempFile={tempFile}
            isAnyMessagePending={isAnyMessagePending}
            handleFileUpload={handleFileUpload}
            handleEmojiSelect={handleEmojiSelect}
            isEmojiPickerVisible={isEmojiPickerVisible}
            toggleEmojiPicker={toggleEmojiPicker}
            handleKeyDown={handleKeyDown}
            handleSendMessage={handleSendMessage}
            handleInputChange={handleInputChange}
            inputValue={inputValue}
          />
        </div>
      </div>
    </>
  );
};
