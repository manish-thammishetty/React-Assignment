export const redirectToHome = (source) => {

    let path = `/`;
    source.props.history.push(path);
}