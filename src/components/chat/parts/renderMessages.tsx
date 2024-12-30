import { ChatIcon } from 'src/assets/svg';

export const renderMessage = (
  message: {
    content: string;
    type: string;
    isThinking: boolean;
    fileMessage: {
      data: string;
      mime_type: string;
    };
  },
  index: number
) => {
  const IS_OUTGOING = message.type === 'outgoing';
  const messageClass = IS_OUTGOING
    ? 'p-[12px_16px] max-w-[75%] text-[0.95rem] bg-[#5350C4] rounded-[13px_13px_3px_13px] text-white flex flex-col items-end ml-auto'
    : 'p-[12px_16px] max-w-[75%] text-[0.95rem] bg-[#f2f2ff] text-black rounded-[13px_13px_13px_3px] ml-[10px]';

  const renderFile =
    message.fileMessage && message.fileMessage.mime_type.startsWith('image/');

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

      {message.isThinking && (
        <div className='p-[12px_16px] max-w-[75%] text-[0.95rem] bg-[#f2f2ff] text-black rounded-[13px_13px_13px_3px] ml-[10px]'>
          <div className='flex gap-[4px] py-[5px]'>
            <div className='h-[7px] w-[7px] rounded-full bg-[#6f6bc2] animate-dotPulse delay-02s'></div>
            <div className='h-[7px] w-[7px] rounded-full bg-[#6f6bc2] animate-dotPulse delay-03s'></div>
            <div className='h-[7px] w-[7px] rounded-full bg-[#6f6bc2] animate-dotPulse delay-04s'></div>
          </div>
        </div>
      )}

      {!message.isThinking && !renderFile && (
        <div className={messageClass}>{message.content}</div>
      )}

      {!message.isThinking && renderFile && (
        <img
          src={`data:${message.fileMessage.mime_type};base64,${message.fileMessage.data}`}
          alt='Uploaded file'
          className='w-[150px] border rounded-2xl '
        />
      )}
    </div>
  );
};
