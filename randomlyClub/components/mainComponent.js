import React, { Component } from 'react';
import Feed from './feedComponent';
import { posts } from './postsApi';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: '',
      page : 1,
      sortBy : 'event_date',
      ascending : 1
    };
  }

  async componentDidMount() {
    try {
      let FEEDS = await posts.getFeed(this.state.page);
      if(!FEEDS) return alert("Network error");
      if(FEEDS.posts.length === 0) return alert("No post found");
      FEEDS.posts = FEEDS.posts.sort((a, b) => (a[this.state.sortBy] > b[this.state.sortBy]) ? this.state.ascending :  this.state.ascending * -1 );
      this.setState({ feed: FEEDS });
    }
    catch (error) {
      console.error(error);
    }
  }

  async pagination(pagenum){
    if(pagenum == this.state.page || pagenum < 1 || pagenum > 3) return false;
    await this.setState({page:pagenum});
    await this.componentDidMount();
  }

  async sorting(sortBy){
    if(sortBy == this.state.sortBy || sortBy == 'Sort') return false;
    let posts = this.state.feed.posts.sort((a, b) => (a[sortBy] > b[sortBy]) ? this.state.ascending :  this.state.ascending * -1);
    let list ={posts : posts , page : this.state.feed.page};
    await this.setState({ feed : ''});
    await this.setState({sortBy:sortBy, feed : list});
  }

  async handleAscend(){
    let posts = this.state.feed.posts.sort((a, b) => (a[this.state.sortBy] > b[this.state.sortBy]) ? this.state.ascending * -1 :  this.state.ascending );
    let list ={posts : posts , page : this.state.feed.page};
    await this.setState({ feed : ''});
    await this.setState({ascending:this.state.ascending * -1, feed : list});
  }

  render() {

    return (
      <Feed data={this.state.feed} ascending={this.state.ascending} sortBy={this.state.sortBy} handleAscend={() => this.handleAscend()} onPageChange={(page) => this.pagination(page)}  handleSorting={(sortBy) => this.sorting(sortBy)}/>
    );
  }
}

export default Main;