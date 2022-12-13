export type GlobalExceptionType = 'net error'

export class GlobalException {
    type: GlobalExceptionType;
    content: string;
    constructor(type: GlobalExceptionType, content:string = '') {
        this.type = type
        this.content = content
    }
}