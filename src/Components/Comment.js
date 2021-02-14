import React from 'react';
import { getPostComments } from '../ServiceLayer/PostsService';
import Error from './Common/Error'
import { PostComments } from '../Shared/Constants'

class Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isDataFetched: false,
            errorDetails: {
                isErrorOccured: false,
                message: ''
            },
            postID: 0,
            comments: []
        };
    }

    componentDidMount() {
        let getPostCommentsCallback = (response, errorFlag) => {

            let newState = errorFlag ?
                {
                    ...this.state,
                    errorDetails: {
                        isErrorOccured: true,
                        message: response.message
                    }
                } :
                {
                    ...this.state,
                    comments: response.data,
                    isDataFetched: true
                }

            this.setState(newState);
        }

        getPostComments(this.props.postID, getPostCommentsCallback)
    }

    render() {
        return this.state.errorDetails.isErrorOccured ?

            <div>
                <Error source={PostComments} message={this.state.errorDetails.message} />
            </div> :

            !this.state.isDataFetched ?

            <div className="center"><b>Loading Post Details...</b></div> :

            <table className="table-border">
                <tbody>
                    <tr>
                        <th>Comment Text</th>
                    </tr>
                    {this.state.comments.map((x) => (
                        <tr key={x.id}>
                            <td> {x.body} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    }
}

export default Comment;