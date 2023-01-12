
interface ErrorMessageProps {
    error: string

}
const ErrorMsg = ({ error }: ErrorMessageProps) => {
    return (
        <p className='text-center' >{error}</p>
    )
}

export default ErrorMsg;