import React from 'react';
import Layout from '../../components/Layout';
import './index.css';

export default class Oracle extends React.Component {
	constructor() {
		super();

		this.state = {
			oracle: ''
		}
	}
	getContent = name => {
		// do something with this
		this.setState({oracle: name});
	}
	componentDidMount() {
		const { name } = this.props.match.params;
		this.getContent(name);
	}
	render() {
		return (
			<Layout oracles>
				<div className="oracle-page">
					<span>Data about {this.state.oracle}</span>
				</div>
			</Layout>
		);
	}
}
