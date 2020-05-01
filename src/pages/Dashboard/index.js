import React from 'react';
import './index.css';
import Layout from '../../components/Layout';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Line } from 'react-chartjs-2';

const client = new W3CWebSocket('wss://api.oracles.club:5678');

export default class Dashboard extends React.Component {
	constructor() {
		super();

		this.state = {
			ETHUSD: [],
			BTCUSD: [],
			BATUSD: [],
			loading: true,
			modalOpen: false,
			modalData: '',
		}
	}

	renderDashboard = message => {
		let data = JSON.parse(message.data);
		
		// Collect individual data
		let ETHUSDData = data.ETHUSD;
		let BTCUSDData = data.BTCUSD;
		let BATUSDData = data.BATUSD;

		// Cleaned JSON data
		let ETHUSD = [];
		let BTCUSD = [];
		let BATUSD = [];

		// Setup appropriate formatting for react-table
		for (var eth_price_feed of Object.keys(ETHUSDData)) {
			ETHUSD.push({"price_feed": eth_price_feed, ...ETHUSDData[eth_price_feed], "linked": [ETHUSDData[eth_price_feed].cur_price, {"price_feed": eth_price_feed.toLowerCase(), "currency": "ETH"}]});
		}

		for (var btc_price_feed of Object.keys(BTCUSDData)) {
			BTCUSD.push({"price_feed": btc_price_feed, ...BTCUSDData[btc_price_feed], "linked": [BTCUSDData[btc_price_feed].cur_price, {"price_feed": btc_price_feed.toLowerCase(), "currency": "BTC"}]});
		}

		for (var bat_price_feed of Object.keys(BATUSDData)) {
			BATUSD.push({"price_feed": bat_price_feed, ...BATUSDData[bat_price_feed], "linked": [BATUSDData[bat_price_feed].cur_price, {"price_feed": bat_price_feed.toLowerCase(), "currency": "BAT"}]});
		}

		this.setState({
			loading: false,
			ETHUSD: ETHUSD,
			BTCUSD: BTCUSD,
			BATUSD: BATUSD
		})
	};

	componentWillMount() {
		client.onmessage = message => {
			this.renderDashboard(message);
		};
	}

	openModal = historic_string => {
		this.setState({modalData: historic_string, modalOpen: true});
	}

	closeModal = () => {
		this.setState({modalOpen: false});
	}

	capitalize = string => {
		if (typeof string !== 'undefined') {
			return string.charAt().toUpperCase() + string.slice(1);
		}
	}

	render() {

		// Table columns
		const columns = [
			{Header: 'Price Feed', accessor: 'price_feed', Cell: props => <NavLink to={`/oracle/${props.value}`}>{props.value}</NavLink>}, 
			{Header: 'Current Value', accessor: 'linked', Cell: props => <button onClick={() => this.openModal(props.value[1])}>${props.value[0].toFixed(2)}</button>}, 
			{Header: 'Last Updated', accessor: 'last_updated', Cell: props => <span>{moment.unix(props.value).fromNow()}</span>},
			{Header: 'Previous Value', accessor: 'prev_price', Cell: props => <span>${props.value.toFixed(2)}</span>},
		];

		const data = {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
				label: 'Oracle price',
				fill: false,
				lineTension: 0.1,
				backgroundColor: 'rgba(75,192,192,0.4)',
				borderColor: 'rgba(75,192,192,1)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgba(75,192,192,1)',
				pointBackgroundColor: '#fff',
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgba(75,192,192,1)',
				pointHoverBorderColor: 'rgba(220,220,220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: [65, 59, 80, 81, 56, 55, 40]
				}
			]
		};

		return (
			<Layout dashboard>
				<Modal
					open={this.state.modalOpen}
					onClose={this.closeModal}
					classNames={["oracle-modal"]}
					center
				>	
					<div className="modal-header">
						<h3>Historical {this.state.modalData.currency}USD data for {this.capitalize(this.state.modalData.price_feed)}</h3>
						<p>Select a time period to filter query.</p>
					</div>
					<div className="modal-content">
						<Line data={data} />
					</div>
				</Modal>
				<div className="dashboard-content sizer">
					<div className="table">
						<div>
							<p>ETH/USD Price Feed</p>
						</div>
						<div>
							<ReactTable
								data={this.state.ETHUSD}
								columns={columns}
								loading={this.state.loading}
								defaultPageSize={6}
								className="price-table"
								showPagination={false}
							/>
						</div>
					</div>
					<div className="table">
						<div>
							<p>BTC/USD Price Feed</p>
						</div>
						<div>
							<ReactTable
								data={this.state.BTCUSD}
								columns={columns}
								loading={this.state.loading}
								defaultPageSize={6}
								className="price-table"
								showPagination={false}
							/>
						</div>
					</div>
					<div className="table">
						<div>
							<p>BAT/USD Price Feed</p>
						</div>
						<div>
							<ReactTable
								data={this.state.BATUSD}
								columns={columns}
								loading={this.state.loading}
								defaultPageSize={4}
								className="price-table"
								showPagination={false}
							/>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
