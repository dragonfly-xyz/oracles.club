import React from 'react';
import './index.css';
import { oracles } from '../../content/constants';
import OwlCarousel from 'react-owl-carousel';
import { NavLink } from 'react-router-dom';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default class OracleHeader extends React.Component {
	constructor() {
		super();

		this.state = {
			items: 6,
		}
	}
	updateDimensions = e => {
		if (window.innerWidth > 900) {
			this.setState({items: 6});
		} else if (window.innerWidth > 600 & window.innerWidth < 900) {
			this.setState({items: 3});
		} else if (window.innerWidth > 400 && window.innerWidth < 600) {
			this.setState({items: 2});
		} else {
			this.setState({items: 1});
		}
	}
	componentDidMount() {
		this.updateDimensions();
		window.addEventListener('resize', this.updateDimensions.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions.bind(this));
	}
	render() {

		const oracleItems = oracles.map((oracle) =>
			<NavLink to={`/oracle/${oracle}`} className="oracle-item" key={oracle} activeClassName="selected">
				<h3>{oracle}</h3>
			</NavLink>
		);

		return (
			<div className="oracleselect">
				<h4>Select an oracle:</h4>
				<OwlCarousel
					className="carousel"
					margin={15}
					items={this.state.items}
					loop
				>
					{oracleItems}
				</OwlCarousel>
			</div>
		);
	}
}
