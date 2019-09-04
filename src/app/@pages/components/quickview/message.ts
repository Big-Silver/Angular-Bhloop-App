//Sample Note Class 
export class chatMessage {
    from: string;
    message: string;
    date: any; 
}
  
export class chatHistory{
    username:string;
    status:string;
    img:string;
    img2x:string;
    log:Array<chatMessage>
}