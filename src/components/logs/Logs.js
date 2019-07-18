import React, { useEffect, useState } from 'react';
import Preloader from '../layout/Preloader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';
import LogItem from './LogItem';

const Logs = ({ log: { logs, loading }, getLogs }) => {


  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);



  //preloader
  if (loading || logs === null) {
    return <Preloader />;
  }
  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No logs to show...</p>
      ) : (
        logs.map(log => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};
Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired
};
//get the whole state,then destructure it at the arguments up top
const mapStateToProps = state => ({
  log: state.log
});

//second argument is for the action to be fire from here 
export default connect(
  mapStateToProps,
  { getLogs }
)(Logs);
