import React from 'react';
import { Link } from 'react-router-dom';
import { getPostDetails, deletePost } from '../ServiceLayer/PostsService';
import Comment from './Comment'
import Error from './Common/Error'
import { PostDetails, DeletePost } from '../Shared/Constants'
import { redirectToHome } from '../Shared/Navigation';

class Post extends React.Component {

    constructor(props) {
        super(props);

        this.handlePostDelete = this.handlePostDelete.bind(this);

        this.state = {
            isDataFetched: false,
            fetchComments: false,
            errorDetails: {
                isErrorOccuredPostDetails: false,
                isErrorInDeletePost: false,
                postDetailsError: '',
                deleteError: '',
            },
            post: {
                id: 0,
                title: '',
                body: ''
            },
        };
    }

    componentDidMount() {

        let getPostDetailsCallback = (response, errorFlag) => {

            let newState = errorFlag ?
                {
                    ...this.state,
                    errorDetails: {
                        ...this.state.errorDetails,
                        postDetailsError: true,
                        postDetailsError: response.message
                    }
                } :
                {
                    ...this.state,
                    post: {
                        id: response.data.id,
                        title: response.data.title,
                        body: response.data.body
                    },
                    isDataFetched: true
                }

            this.setState(newState);
        }

        getPostDetails(this.props.match.params.postID, getPostDetailsCallback)
    }

    handlePostDelete() {
        let that = this;
        let deletePostCallback = (response, errorFlag) => {

            if (errorFlag) {
                this.setState({
                    ...this.state,
                    errorDetails: {
                        ...this.state.errorDetails,
                        isErrorInDeletePost: true,
                        deleteError: response.message
                    }
                });
            }
            else {
                redirectToHome(that);
            }
        }

        deletePost(this.props.match.params.postID, deletePostCallback)
    }

    render() {
        return this.state.errorDetails.isErrorOccuredPostDetails ?
            <>
                <Error source={PostDetails} message={this.state.errorDetails.postDetailsError} />
            </> :
            
            !this.state.isDataFetched ? <div className="center"><b>Loading Post Details...</b></div> :

            <>
                <table className="table-border">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>body</th>
                            <th>Links</th>
                            <th>Delete</th>
                        </tr>
                        <tr>
                            <td>
                                <div >{this.state.post.title}</div>
                            </td>
                            <td>
                                <div > {this.state.post.body}</div>
                            </td>
                            <td>
                                <div >
                                    <Link to={`/postDetails/${this.props.match.params.postID}`}
                                        onClick={() => this.setState({ ...this.state, fetchComments: true })}>
                                        Fetch Comments
                                    </Link></div>
                            </td>
                            <td>
                                <div ><button onClick={this.handlePostDelete}>Delete</button></div>
                            </td>
                        </tr>
                    </tbody>

                </table>
                <div>
                    {this.state.fetchComments &&
                        <div>
                            <div className="center"><b>Comments : </b></div>
                            <Comment postID={this.state.post.id} />
                        </div>
                    }
                </div>
                {
                    this.state.errorDetails.isErrorInDeletePost ?
                    
                    <div>
                        <Error source={DeletePost} message={this.state.errorDetails.deleteError} />
                    </div>
                    : null
                }
            </>
    }
}

export default Post;