import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import { Timeline } from 'react-twitter-widgets';
import Tweet from 'react-tweet';

class App extends Component {

  constructor() {
    super();

    this.state = { isAuthenticated: false, user: null, token: '' };
  }

  onSuccess = (response) => {
    console.log(response)

    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      console.log(user)
      if (token) {
        this.setState({ isAuthenticated: true, user: user, token: token });
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null })
  };

  makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  render() {

    if (!!this.state.isAuthenticated) {
      const tweetData = {
        id_str: this.makeid(),
        id: this.makeid(),
        user: {
          name: this.state.user.displayName,
          screen_name: this.state.user.username,
          profile_image_url: this.state.user.photos[0].value
        },
        text: 'Simply Testing Challenge App',
      }
      return (
        <div className="App">
          <div>
            Authenticated - {this.state.user.displayName} - <button onClick={this.logout} className="button" >
              Log out
            </button>
          </div>
          <hr />
          Tweet Sample
          <hr />
          <Tweet data={tweetData} linkProps={{ target: '_blank', rel: 'noreferrer' }} />
          <hr />
          Timeline
          <hr />
          <Timeline dataSource={{ sourceType: 'profile', screenName: this.state.user.username }} options={{
            username: this.state.user.username
          }} />

        </div>
      );
    }

    return (
      <div className="App">
        <TwitterLogin loginUrl="http://localhost:4000/api/v1/auth/twitter"
          onFailure={this.onFailed} onSuccess={this.onSuccess}
          requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" />
      </div>
    );
  }
}

export default App;
