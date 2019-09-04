export interface MessageDataOptions {
  Position?:string;
  Style?:string;
  Duration?: number;
  Animate?: boolean;
  Title?:string;
  imgURL?:string;
  PauseOnHover?: boolean;
}

// Message data for terminal users
export interface MessageData {
  // For html
  html?: string;

  // For string content
  // TODO: remove the literal parts as it's widened anyway
  type?: 'success' | 'info' | 'warning' | 'error' | 'loading' | string;
  style?: 'simple' | 'bar' | 'flip' | 'circle' | string;
  position?:'top';
  content?: string;
}

// Filled version of MessageData (includes more private properties)
export interface MessageDataFilled extends MessageData {
  messageId: string; // Service-wide unique id, auto generated
  state?: 'enter' | 'leave';
  options?: MessageDataOptions;
  createdAt: Date; // Auto created
}
