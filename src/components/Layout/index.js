import React from 'react';
import MainHeader from '../MainHeader';
import OracleHeader from '../OracleHeader';
import DashboardHeader from '../DashboardHeader';
import './index.css';

export default class Layout extends React.Component {
	render() {
		return (
			<div className="layout">
				<div className="topheader">
					<div className="sizer">
						<span>Oracle pricefeeds. A <a href="https://github.com/Dragonfly-Capital/oracles.club" rel="noopener noreferrer" target="_blank">Dragonfly Capital</a> initiative.</span>
					</div>
				</div>
				<div className="bottomheader">
					<div className="sizer">
						<MainHeader />
					</div>
				</div>
				{this.props.dashboard ? (
					<div className="dashboardheader">
						<div className="sizer">
							<DashboardHeader />
						</div>
					</div>
				) : null}
				{this.props.oracles ? (
					<div className="oracleheader">
						<div className="sizer">
							<OracleHeader />
						</div>
					</div>
				) : null}
				<div className={this.props.oracles ? "height-reduced" : "height-full"}>
					{this.props.children}
				</div>
				<div className="footer">
					<div className="sizer">
						<span>&copy; 2020 Oracles.club | All rights reserved.</span>
					</div>
				</div>
			</div>
		);
	}
}
