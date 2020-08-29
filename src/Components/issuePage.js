import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getGithubData} from '../Redux/Action/index'
import {Container, Grid, Segment} from 'semantic-ui-react'
import InfiniteScroll from 'react-infinite-scroll-component';
import './style.css'

class IssuePage extends Component {
    constructor(props){
        super(props)
        this.state = {
            getData: [].slice(0,10),
            hasMore: true,
            count: 10,
            watch: 0,
            star: 0,
            fork: 0
        }
    }

    componentDidMount = () => {
        this.props.getGithubData()
        .then((result) => {
            this.setState({
                getData: result.data
            })    
        }).catch((err) => {
            console.log(err)
        });
    }

    onWatchClick = () => {
        this.setState({
            watch : this.state.watch + 1
        })
    }

    onStarClick = () => {
        this.setState({
            star: this.state.star + 1
        })
    }

    onForkClick = () => {
        this.setState({
            fork: this.state.fork + 1
        })
    }

    fetchMoreData = () => {
        setTimeout(() => {
            this.setState({
                getData: this.state.getData.concat(this.state.getData.slice(this.state.count, this.state.count + 10)),
                count: this.state.count + 10
            })
        }, 200)
    }

    render(){
        return(
            <div>
                <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
                    <span class="navbar-brand">Github issue page</span>
                </nav>
                <div className='mainDiv'>
                    <div className='Heading'><h1>facebook/create-react-app</h1></div>
                    <div className='buttonSegment'>
                        <span class="x-split-button">
                            <button className="x-button x-button-main" onClick={this.onWatchClick}><i className="fa fa-eye" style={{padding: '4px'}}></i>Watch</button>
                            <button className="x-button x-button-drop">{this.state.watch}</button>
                        </span>
                        <span class="x-split-button">
                            <button className="x-button x-button-main" onClick={this.onStarClick}><i className="fa fa-star-o" style={{padding: '4px'}}></i>Star</button>
                            <button className="x-button x-button-drop">{this.state.star}</button>
                        </span>
                        <span class="x-split-button">
                            <button className="x-button x-button-main" onClick={this.onForkClick}><i className="fa fa-code-fork" style={{padding: '4px'}}></i>Fork</button>
                            <button className="x-button x-button-drop">{this.state.fork}</button>
                        </span>
                    </div>
                </div>
                <div className='container'>
                    <div className="card">
                        <div className='card-header'>
                            Status
                        </div>
                    </div>
                    <React.Fragment>
                        <InfiniteScroll
                        dataLength={this.state.getData.length}
                        hasMore={this.state.hasMore}
                        next={this.fetchMoreData}
                        loader={<h4>Loading...</h4>}>
                            {
                                this.state.getData.map((data, index) => {
                                    return <Row 
                                    data={data}
                                    key={index}
                                    />
                                })
                            }
                        </InfiniteScroll>
                    </React.Fragment>
                </div>
            </div>
        )
    }
}

const Row = (props) => {
    let {
        title,
        labels,
        number,
        user,
        comments
    } = props.data
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">
                <i className="fa fa-exclamation-circle circle"></i>
                    {title}
                {
                    labels.map((data, index) => {
                        if(data.name === 'needs triage'){
                            return (
                                <span className="badge badge-pill badge-danger">{data.name}</span>
                            )
                        }
                        return (
                                <span className="badge badge-pill badge-warning">{data.name}</span>
                        )
                    })
                }
                {
                    comments === 0 ? null : <span className='comment'>
                        <i className="fa fa-comment-o" style={{padding: '5px'}}></i>{comments}
                    </span>
                }
                </h5>
                <p class="card-text">#{number} opened by {user.login}</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        githubData: state.get_data
    }
}

export default connect(mapStateToProps, {
    getGithubData
})(IssuePage);