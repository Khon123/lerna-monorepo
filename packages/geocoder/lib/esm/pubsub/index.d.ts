import { EventType } from "./enums";
declare type Callback = (param?: any) => void;
declare function addListener(eventName: EventType, callback: Callback): {
    remove: () => any;
};
declare function emit(eventName: EventType, params: Record<string, any> | string): void;
declare const _default: {
    Type: typeof EventType;
    emit: typeof emit;
    addListener: typeof addListener;
};
export default _default;
