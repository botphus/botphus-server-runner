export type MessageListener<T> = (message: T, sendHandle: any) => void;
export type ExitListener = (code: number) => void;
