import React from 'react';
import Layout from '../../components/Layout';
import './index.css';

// Images setup
const images = require.context('../../static', true);

// Import oracles
let Maker = require('../../content/oracles/maker.json');
let Chainlink = require('../../content/oracles/chainlink.json');
let Compound = require('../../content/oracles/compound.json');
let Uniswap = require('../../content/oracles/uniswap.json');
let Dfusion = require('../../content/oracles/dfusion.json');
let Coinbase = require('../../content/oracles/coinbase.json');

export default class Oracle extends React.Component {
	constructor() {
		super();

		this.state = {
			oracle: ''
		}
	}
	getContent = name => {
		let data;

		switch (name) {
			case 'Maker':
				data = Maker;
				break;
			case 'Chainlink':
				data = Chainlink;
				break;
			case 'Compound':
				data = Compound;
				break;
			case 'Uniswap':
				data = Uniswap;
				break;
			case 'Dfusion':
				data = Dfusion;
				break;
			case 'Coinbase':
				data = Coinbase;
				break;
			default:
				data = Maker;
				break;
		}

		console.log(data);

		this.setState({oracle: name, data: data});
	}

	componentDidMount() {
		const { name } = this.props.match.params;
		this.getContent(name);
	}

	render() {
		return (
			<Layout oracles>
				<div className="oracle-page">
					<div className="sizer">
						<div className="table">
							<div>
								<p>About {this.state.oracle}</p>
							</div>
							<div>
								{this.state.data && this.state.data.About ? (
									this.state.data.About.split('\n').map((content, i) => {
										return <p key={i}>{content}</p>
									})
								) : null}
							</div>
						</div>
						<div className="table">
							<div>
								<p>Used By</p>
							</div>
							<div>
								{this.state.data && this.state.data["Used By"] ? (
									Object.keys(this.state.data["Used By"]).map((image, i) => {
										return <a href={this.state.data["Used By"][image]} key={i} target="_blank" rel="noopener noreferrer"><img src={images('./' + image)} key={i} alt="Used by" /></a>
									})
								) : null}
							</div>
						</div>
						<div className="table">
							<div>
								<p>Useful Links</p>
							</div>
							<div>
								{this.state.data && this.state.data["Contract Addresses"] ? (
									<>
										<h3>Contract Addresses</h3>
										<ul>
											{Object.keys(this.state.data["Contract Addresses"]).map((contract, i) => {
												return <li key={i}><a href={this.state.data["Contract Addresses"][contract]} target="_blank" rel="noopener noreferrer">{contract}</a></li>
											})}
										</ul>
									</>
								) : null}
								{this.state.data && this.state.data["Useful Links"] ? (
									Object.keys(this.state.data["Useful Links"]).map((link, i) => {
										return <h3 key={i}><a href={this.state.data["Useful Links"][link]} target="_blank" rel="noopener noreferrer">{link}</a></h3>
									})
								) : null}
							</div>
						</div>
						<div className="table">
							<div>
								<p>{this.state.oracle} Pros/Cons</p>
							</div>
							<div>
								{this.state.data && this.state.data["Pros"] ? (
									<>
										<h3>Pros</h3>
										<ul>
											{this.state.data["Pros"].map((pro, i) => {
												return <li key={i}>{pro}</li>
											})}
										</ul>
									</>
								) : null}
								{this.state.data && this.state.data["Cons"] ? (
									<>
										<h3>Cons</h3>
										<ul>
											{this.state.data["Cons"].map((con, i) => {
												return <li key={i}>{con}</li>
											})}
										</ul>
									</>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
