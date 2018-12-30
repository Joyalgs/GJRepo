import * as StackTraceParser from 'error-stack-parser'

export interface IError {
    time?: string
    url?: string
    status?: String
    message?: string
    stack?: StackTraceParser.StackFrame[]
    errorType?: ErrorType
}

export enum ErrorType {
    Offline = 'Offline',
    UIError = 'UIError',
    APIError = 'APIError',
    APIDown = 'APIDown',
    Unknown = 'Unknown'
}