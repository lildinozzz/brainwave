export enum EMessageTypeVariants {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
  THINKING = 'thinking',
}

export type TMessage = {
  content?: string;
  type: EMessageTypeVariants;
  isPending: boolean;
  fileMessage?: TFileMessage;
};

export type TFileMessage = {
  data: string;
  mime_type: string;
};

export type TPayment = {
  id: string;
  title: string;
  duration?: string;
  description: string;
  price: string;
  features: string[];
};
