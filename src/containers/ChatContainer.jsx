/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import Navbar from '../components/Navbar';
import { queryAI, logout } from '../utils/api';
import SpinnerLoading from '../components/SpinnerLoading';

export class ChatContainer extends Component {
  state = {
    messages: [],
    loading: false,
    error: null,
    query: '',
  };

  handleQuery = (e) => {
    e.preventDefault();
    const { query } = this.state;
    this.setState({ loading: true, error: null });

    queryAI({ query }, this.props.token)
      .then((res) => {
        this.handleTypingEffect(query, res.data); // Mulai efek mengetik
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleTypingEffect = (query, fullMessage) => {
    let displayedMessage = '';
    let index = 0;
    const speed = 20; // kecepatan mengetik dalam ms

    const type = () => {
      if (index < fullMessage.length) {
        displayedMessage += fullMessage[index];
        index++;
        this.setState((prevState) => ({
          messages: [
            ...prevState.messages.slice(0, -1),
            { query, data: displayedMessage },
          ],
        }));
        setTimeout(type, speed);
      }
    };
    type();
  };

  handleChange = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleLogout = (e) => {
    e.preventDefault();
    logout(this.props.token)
      .then(() => {
        localStorage.removeItem('token');
        this.props.setToken(null);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    return (
      <div>
        <Navbar setToken={this.props.setToken} onClick={this.handleLogout} />
        {this.state.loading ? (
          <SpinnerLoading />
        ) : (
          this.state.messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.data}
              query={message.query}
              loading={this.state.loading}
            />
          ))
        )}

        <ChatInput
          onSubmit={this.handleQuery}
          onChange={this.handleChange}
          loading={this.state.loading}
          error={this.state.error}
          query={this.state.query}
        />
      </div>
    );
  }
}

export default ChatContainer;
