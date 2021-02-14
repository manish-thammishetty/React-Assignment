import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import { getUserPosts } from '../ServiceLayer/PostsService';
import Error from './Common/Error'
import {UserPostsDetails} from '../Shared/Constants'


class UserPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            filteredPosts: [],
            isDataFetched: false,
            errorDetails: {
                isErrorOccured: false,
                message: ''
            },
            filterDetails: {
                post: ''
            }
        };
    }

    componentDidMount() {

        let getUserPostsCallback = (response, errorFlag) => {

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
                    posts: response.data,
                    filteredPosts: response.data,
                    isDataFetched: true
                }

            this.setState(newState, () => { this.filterPosts(); })
        }

        getUserPosts(this.props.match.params.userid, getUserPostsCallback)
    }

    handlePostChange = (e) => {
        this.setState({
            ...this.state,
            filterDetails: {
                ...this.state.filterDetails,
                post: e.target.value.toLowerCase()
            }
        }, () => { this.filterPosts(); })
    };

    filterPosts = () => {
        this.setState({
            ...this.state,
            filteredPosts: this.state.posts.filter(x => x.title.toLowerCase().includes(this.state.filterDetails.post)),
        })
    }

    render() {
        return this.state.errorDetails.isErrorOccured ? 
        <div><Error source={UserPostsDetails} message={ this.state.errorDetails.message } /></div> :

            !this.state.isDataFetched ? 
            
            <div className="center"><b>Loading Post Details...</b></div> :

            <div>
                <table className="table-border">
                    <tbody>
                        <tr>
                            <th>User Post</th>
                            <th>Post Details</th>
                        </tr>
                        <tr>
                            <td><input type="text" placeholder="Filter Post" onChange={(this.handlePostChange)} /></td>
                            <td></td>
                        </tr>
                        {this.state.filteredPosts.map((x) => (
                            <tr key={x.id}>
                                <td> {x.title} </td>
                                <td> <Link to={`/postDetails/${x.id}`} >Post Details</Link> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    }
}

export default UserPosts;