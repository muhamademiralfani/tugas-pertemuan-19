/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const ChatInput = ({ onSubmit, loading, onChange, query }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="fixed-bottom p-3 bg-primary-subtle border-top shadow"
    >
      <div className="input-group container">
        <input
          type="text"
          placeholder="Message LumosiveAI"
          onChange={onChange}
          value={query}
          className="form-control border border-primary"
          disabled={loading}
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          <i className="bi bi-arrow-bar-up"></i>
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
