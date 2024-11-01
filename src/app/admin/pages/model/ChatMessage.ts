export interface ChatMessage {
    message: string;
    user_id?:number;
    timeStamp?: string | Date;
    partner_id?: number;
}