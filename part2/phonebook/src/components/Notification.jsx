const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }
  return <div className={ error ? 'notification error' : 'notification success'
}  >
          { message }
        </div >;
}

export default Notification