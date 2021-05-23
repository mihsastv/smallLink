export interface ResultInterface {
    result: 'success' | 'error'
    message?: string
    [key: string]: any
}
