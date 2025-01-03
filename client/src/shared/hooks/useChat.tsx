import { readFileAsBase64 } from '@utils';
import axios from 'axios';
import { useState } from 'react';
import {
  TFileMessage,
  TMessage,
  EMessageTypeVariants,
} from 'src/widgets/ui/chat/chat.types';

const CHAT_HISTORY: IChatHistory[] = [];
const API_KEY = import.meta.env.VITE_CHAT_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

interface IParts {
  text: string;
  inline_data?: { data: string; mime_type: string };
}

interface IChatHistory {
  role: 'user' | 'model';
  parts: (IParts | { [key: string]: unknown })[];
}

export const useChat = () => {
  const [inputValue, setInputValue] = useState('');
  const [tempFile, setTempFile] = useState<TFileMessage | undefined>(undefined);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [messages, setMessages] = useState<TMessage[]>([
    {
      content: 'Hey there 👋 How can I help you today?',
      type: EMessageTypeVariants.INCOMING,
      isPending: false,
    },
  ]);

  const toggleEmojiPicker = () => setIsEmojiPickerVisible((prev) => !prev);
  const handleEmojiSelect = (emoji: { native: string }) => {
    setInputValue((prev) => prev + emoji.native);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const handleOutgoingMessage = (
    message: string,
    fileMessage?: TFileMessage
  ) => {
    const newMessage: TMessage = {
      content: message,
      type: EMessageTypeVariants.OUTGOING,
      isPending: false,
      fileMessage: {
        data: fileMessage?.data || '',
        mime_type: fileMessage?.mime_type || '',
      },
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    try {
      const base64String = await readFileAsBase64(file);

      const fileMessage = { data: base64String, mime_type: file.type };

      setTempFile(fileMessage);

      e.target.value = '';
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAIResponse = async (): Promise<string> => {
    const requestData = { contents: CHAT_HISTORY };

    const { data } = await axios.post(API_URL, requestData);

    const apiResponseText = data.candidates[0].content.parts[0].text.trim();

    return apiResponseText;
  };

  const addToChatHistory = ({ role, parts }: IChatHistory) => {
    CHAT_HISTORY.push({ role, parts });
  };

  const updateMessageWithResponse = (responseText: string) => {
    const newMessage: TMessage = {
      content: responseText,
      type: EMessageTypeVariants.INCOMING,
      isPending: false,
    };

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1] = newMessage;
      return updatedMessages;
    });

    addToChatHistory({ role: 'model', parts: [{ text: responseText }] });
  };

  const generateAiResponse = async () => {
    const userHistoryData: IChatHistory = {
      role: 'user',
      parts: [
        { text: inputValue },
        ...(tempFile?.data
          ? [
              {
                inline_data: {
                  data: tempFile?.data,
                  mime_type: tempFile?.mime_type,
                },
              },
            ]
          : []),
      ],
    };

    addToChatHistory(userHistoryData);

    const newMessage: TMessage = {
      type: EMessageTypeVariants.INCOMING,
      isPending: true,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const apiResponseText = await fetchAIResponse();
      updateMessageWithResponse(apiResponseText);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        updateMessageWithResponse(error.response?.data.error.message);
      }
    }
  };

  return {
    messages,
    inputValue,
    isEmojiPickerVisible,
    setInputValue,
    handleInputChange,
    handleOutgoingMessage,
    tempFile,
    handleFileUpload,
    generateAiResponse,
    toggleEmojiPicker,
    setTempFile,
    handleEmojiSelect,
  };
};
