import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { SatisfiedIcon, FileIcon, ArrowTopIcon } from '@shared';
import { TFileMessage } from '../chat.types';

type TMessageInputProps = {
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
  tempFile?: TFileMessage;
  isAnyMessagePending: boolean;
  handleEmojiSelect: (emoji: { native: string }) => void;
  toggleEmojiPicker: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isEmojiPickerVisible: boolean;
};

export const MessageInput = ({
  inputValue,
  isAnyMessagePending,
  handleInputChange,
  tempFile,
  handleKeyDown,
  handleSendMessage,
  handleFileUpload,
  toggleEmojiPicker,
  handleEmojiSelect,
  isEmojiPickerVisible,
}: TMessageInputProps) => {
  const handleSendMessageAndFocus = () => {
    handleSendMessage();
  };

  const handleEmojiSelectClick = (emoji: { native: string }) => {
    handleEmojiSelect(emoji);
  };

  const handleEmojiPickerClick = () => {
    toggleEmojiPicker();
  };

  const handleFileButtonClick = () => {
    document.getElementById('file-input')?.click();
  };

  return (
    <div className='absolute bottom-0 w-full bg-white px-[22px] py-[20px] rounded-b-[15px]'>
      {tempFile?.data && (
        <img
          src={`data:${tempFile.mime_type};base64,${tempFile.data}`}
          alt='Uploaded file'
          className=' w-[100px] border rounded-2xl fixed bottom-[6rem] left-[2rem]'
        />
      )}
      <div className='relative flex items-center bg-white outline-[1px] outline-[#cccce5] rounded-[50%] w-full'>
        <textarea
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          className='hide-scrollbar border-2 border-[#cccccc] outline-none h-auto min-h-[47px] max-h-[90px] w-full text-black text-[0.95rem] py-[10px] pl-[18px] pr-[120px] focus:border-[#706db0] rounded-[20px] resize-none overflow-y-auto'
          placeholder='Message...'
        />

        <div className='absolute right-[6px] top-1/2 transform -translate-y-1/2 flex gap-[3px]'>
          <button
            type='button'
            onClick={handleEmojiPickerClick}
            className='h-[35px] w-[35px] border-none transition-all duration-200 ease-in-out text-[#706db0] bg-white rounded-full text-[1.15rem] hover:bg-[#f1f1ff] flex items-center justify-center'
          >
            <SatisfiedIcon />
          </button>

          {isEmojiPickerVisible && (
            <div className='absolute bottom-[4rem] -right-[0.3rem] md:right-[5px]  z-10'>
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelectClick}
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
              onChange={handleFileUpload}
            />
            <button
              type='button'
              onClick={handleFileButtonClick}
              className='h-[35px] w-[35px] border-none transition-all duration-200 ease-in-out text-[#706db0] bg-white rounded-full text-[1.15rem] hover:bg-[#f1f1ff] flex items-center justify-center'
            >
              <FileIcon />
            </button>
          </div>

          <button
            disabled={isAnyMessagePending || !inputValue.length}
            type='button'
            onClick={handleSendMessageAndFocus}
            className={`ml-[2px] h-[35px] w-[35px] border-none transition-all duration-200 ease-in-out text-white rounded-full text-[1.15rem] 
              ${
                isAnyMessagePending || !inputValue.length
                  ? 'bg-[#d3d3d3] cursor-not-allowed'
                  : 'bg-[#5b57a0]'
              } flex items-center justify-center cursor-pointer}`}
          >
            <ArrowTopIcon className='text-white' />
          </button>
        </div>
      </div>
    </div>
  );
};
