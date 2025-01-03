import { ChatIcon } from '@shared';
import { useEffect, useRef } from 'react';
import { TMessage } from '../chat.types';

type TMessageListProps = {
  messages: TMessage[];
};

export const MessageList = ({ messages }: TMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='p-[25px] pl-[22px] flex gap-[20px] h-[460px] mb-[82px] overflow-y-auto flex-col rounded-b-[15px]'>
      {messages.map((message, index) => {
        const IS_OUTGOING = message.type === 'outgoing';
        const MESSAGE_CLASS = IS_OUTGOING
          ? 'p-[12px_16px] max-w-[75%] text-[0.95rem] bg-[#5350C4] rounded-[13px_13px_3px_13px] text-white ml-[10px] break-words'
          : 'p-[12px_16px] max-w-[75%] text-[0.95rem] bg-[#f2f2ff] rounded-[13px_13px_13px_3px] text-black ml-[10px] break-words';

        const IS_FILE_MESSAGE =
          message.fileMessage &&
          message.fileMessage.mime_type.startsWith('image/');

        return (
          <div
            key={index}
            className={`flex ${
              IS_OUTGOING ? 'items-end justify-end' : 'items-start'
            }`}
          >
            {!IS_OUTGOING && (
              <ChatIcon
                className='h-9 w-9 bg-[#5350C4] rounded-full p-1.5 self-end flex-shrink-0 mb-[2px]'
                fill='#fff'
              />
            )}

            {message.isPending && (
              <div className='p-[12px_16px] max-w-[75%] text-[0.95rem] bg-[#f2f2ff] text-black rounded-[13px_13px_13px_3px] ml-[10px]'>
                <div className='flex gap-[4px] py-[5px]'>
                  <div className='h-[7px] w-[7px] rounded-full bg-[#6f6bc2] animate-dotPulse delay-02s'></div>
                  <div className='h-[7px] w-[7px] rounded-full bg-[#6f6bc2] animate-dotPulse delay-03s'></div>
                  <div className='h-[7px] w-[7px] rounded-full bg-[#6f6bc2] animate-dotPulse delay-04s'></div>
                </div>
              </div>
            )}

            {!message.isPending && !IS_FILE_MESSAGE && (
              <div className={MESSAGE_CLASS}>{message.content}</div>
            )}

            {!message.isPending && IS_FILE_MESSAGE && message.fileMessage && (
              <div className='flex flex-col gap-3 items-end'>
                <img
                  src={`data:${message.fileMessage.mime_type};base64,${message.fileMessage.data}`}
                  alt='Uploaded file'
                  className='w-[150px] border rounded-2xl '
                />
                <div className={`${MESSAGE_CLASS}`}>{message.content}</div>
              </div>
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};
