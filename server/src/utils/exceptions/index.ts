interface originalErrorCode  {
  code: string
} 
export default class HttpException extends Error {
    public status: number 
    public message: string
    public original: originalErrorCode
    public code: string
    constructor(status: number, message: string, original: originalErrorCode, code: string) {
      super(message)
      this.status = status
      this.message = message
      this.original = original
      this.code = code
    }
}