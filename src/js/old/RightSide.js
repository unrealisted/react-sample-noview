import React from "react";
import RightSideContent from "./RightSideContent";
import RightSideCompare from "./RightSideCompare";

export default class RightSide extends React.Component {
	constructor(props){
		super(props);
	}

	render(){

		let item = this.props.catalog.yml_catalog.shop.offers.offer;
		let categories = this.props.catalog.yml_catalog.shop.categories.category;
		return(
			<div class="col-lg-8 rightSide">
				<div class="row">
				    <div class="col-lg-12">       
				      <ul class="nav nav-tabs" role="tablist">
				        {categories.map((cat) => {
				        	let href = cat.__text.replace(/\s/g, ''); //Delete spaces in href
							return  <li role="presentation" class="" ><a href={'#'+ href} aria-controls={href} role="tab" data-toggle="tab" >{cat.__text}</a></li>
						})}
						<li role="presentation" class="" ><a href="#compare" aria-controls="compare" role="tab" data-toggle="tab" id="compareUrl">Сравнения ({this.props.compareList.length})</a></li>
				      </ul>

				      <div class="tab-content">
				        {categories.map((cat) => {
				        	let href = cat.__text.replace(/\s/g, '');
							return  <div role="tabpanel" class="tab-pane" id={href}>
										<RightSideContent addToView={this.props.addToView.bind(this)} addToCompare={this.props.addToCompare.bind(this)} catalog={this.props.catalog} category_name={cat.__text} category_id={cat._id} key={cat._id} compareList={this.props.compareList} />
									</div>
						})}
						<div role="tabpanel" class="tab-pane" id="compare">
							{this.props.compareList == 0 ? <p>Нам нечего сравнивать ;(</p> : <RightSideCompare catalog={this.props.catalog} compareItems={this.props.compareItems} deleteFromCompare={this.props.deleteFromCompare.bind(this)} />}
						</div>
				      </div>
				    </div>
			   	</div>
			</div>	
		)
	}
}
