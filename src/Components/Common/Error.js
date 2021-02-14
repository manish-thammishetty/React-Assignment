function Error(props) {

  return (

    <>
      <div className="alert alert-danger text-center">
        Error occured while processing "{props.source}" with message "{props.message}"
      </div>
    </>
  );
}

export default Error;