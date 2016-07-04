import React from "react";
import ReactDOM from "react-dom";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";
import RightSideContent from "./RightSideContent";




let catalog = require('json!../data/mobile.json');


class Layout extends React.Component {
	constructor(props){
		console.log(props);
		super(props);
		let firstItem = this.props.catalog.yml_catalog.shop.offers.offer[0]._id;
		this.state = {
			viewItem: firstItem,
			compareList: [],
			compareItems: []
		}
	}


	addToView(event) {
		this.setState({
			viewItem: event.target.value
		});
	}

	addToCompare(event){
		let item = event.target.value;
		let catalog = this.props.catalog.yml_catalog.shop.offers.offer;
		if(this.state.compareList.indexOf(item) == -1)
		{
			catalog.filter((cat) => {
				if(cat._id == item)
					this.state.compareItems.push(cat);
			});
			this.setState({compareItems: this.state.compareItems});

			this.state.compareList.push(item);
			this.setState({
				compareList: this.state.compareList
			});
		}
		$("#btn-compare-" + event.target.value).attr("disabled", true);
	}

	deleteFromCompare(event)
	{
		let item = event.target.value,
			deleteIndex;
		this.state.compareItems.reduce((prev, curr, index) => {
			if(curr._id == item)
				deleteIndex = index;
		});

		this.state.compareItems.splice(deleteIndex, 1);
		this.setState({
			compareItems: this.state.compareItems
		});

		this.state.compareList.splice(deleteIndex, 1);
		this.setState({
			compareList: this.state.compareList
		});

		$("#btn-compare-" + item).attr("disabled", false);

	}


	render(){
		return(
			<div class="row">
				<div class="logo_background">
					<h1>Mobile Store</h1>
				</div>
				<LeftSide viewItem={this.state.viewItem} catalog={this.props.catalog} />
				<RightSide addToView={this.addToView.bind(this)} deleteFromCompare={this.deleteFromCompare.bind(this)} compareItems={this.state.compareItems} addToCompare={this.addToCompare.bind(this)} compareList={this.state.compareList}  catalog={this.props.catalog} />
			</div>
		)
	}
}



if(typeof window !== 'undefined') {
    const app = document.getElementById('app');
	ReactDOM.render(<Layout catalog={catalog} />, app);
}