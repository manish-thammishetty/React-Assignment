import React from 'react'
import { getUsers } from '../ServiceLayer/UserService';
import { Link } from 'react-router-dom';
import '../App.css'
import Error from './Common/Error'
import '../Shared/Constants'
import { PostsPage } from '../Shared/Constants';

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            isDataFetched: false,
            errorDetails: {
                isErrorOccured: false,
                message: ''
            },
            filterDetails: {
                name: '',
                company: ''
            }
        }
    }

    componentDidMount() {
        if (!this.state.users.isDataFetched) {
            let getUsersCallback = (response, errorFlag) => {

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
                        users: response.data,
                        filteredUsers: response.data,
                        isDataFetched: true,
                    }

                this.setState(newState, () => { this.filterUsers(); })
            }

            getUsers(getUsersCallback);
        }
        else {
            this.filterUsers();
        }

    }

    handleNameChange = (e) => {
        this.setState({
            ...this.state,
            filterDetails: {
                ...this.state.filterDetails,
                name: e.target.value
            }
        }, () => { this.filterUsers(); })
    };

    handleCompanyChange = (e) => {
        this.setState({
            ...this.state,
            filterDetails: {
                ...this.state.filterDetails,
                company: e.target.value
            }
        }, () => { this.filterUsers(); })
    };

    filterUsers = () => {
        this.setState({
            ...this.state,
            filteredUsers: this.state.users.filter(x => x.name.toLowerCase().includes(this.state.filterDetails.name) && x.company.name.toLowerCase().includes(this.state.filterDetails.company)),
        })
    }

    render() {
        return this.state.errorDetails.isErrorOccured ?

            <>
                <Error source={PostsPage} message={this.state.errorDetails.message} />
            </> :

            !this.state.isDataFetched ? <div className="center"><b>Loading Post Details...</b></div> :

            <table className="table-border">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Blog Posts</th>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder="Enter Name" onChange={(this.handleNameChange)} /></td>
                        <td><input type="text" placeholder="Enter Company" onChange={this.handleCompanyChange} /></td>
                        <td></td>
                    </tr>
                    {this.state.filteredUsers.map((x) => (
                        <tr key={x.id}>
                            <td> {x.name} </td>
                            <td> {x.company.name} </td>
                            <td> <Link to={`/posts/${x.id}`} >Posts</Link> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    }
}

export default HomePage;