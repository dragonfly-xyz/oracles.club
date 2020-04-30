import React from 'react';
import TimeAgo from 'react-timeago';
import './index.css';

export default class DashboardHeader extends React.Component {
	render() {
		return (
			<div className="dashboard-head">
				<div className="sizer">
					<h1>Oracle Pricefeeds</h1>
					<span>Up-to-date data about oracles on Ethereum.<br/>Last updated <TimeAgo date={new Date()} />.</span>
				</div>
			</div>
		);
	}
}
