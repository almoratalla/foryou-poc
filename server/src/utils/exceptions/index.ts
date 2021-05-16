interface originalErrorCode  {
  code: string
} 
export default class HttpException extends Error {
    public status: number 
    public message: string
    public original: originalErrorCode
    constructor(status: number, message: string, original: originalErrorCode) {
      super(message)
      this.status = status
      this.message = message
      this.original = original
    }
}