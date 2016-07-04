import React from "react";
import RightSideContentItem from "./RightSideContentItem";

export default class RightSideContent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			search : "",
			filterByVendor : [],
			filterByColor : [],
			filterByCountry : [],
			filterByLowerPrice : 0,
			filterByHigherPrice : 9999999
		}
	}

	updateSearch(event){
		this.setState({search: event.target.value})
	}

	updateFilterByVendor(event)
	{
		let indexOfItem = this.state.filterByVendor.indexOf(event.target.value);
		if(this.state.filterByVendor.indexOf(event.target.value)== -1)
			this.state.filterByVendor.push(event.target.value);
		else
			this.state.filterByVendor.splice(indexOfItem, 1);

		this.setState({filterByVendor: this.state.filterByVendor});
	}

	updateFilterByColor(event)
	{
		let indexOfItem = this.state.filterByColor.indexOf(event.target.value);
		if(this.state.filterByColor.indexOf(event.target.value)== -1)
			this.state.filterByColor.push(event.target.value);
		else
			this.state.filterByColor.splice(indexOfItem, 1);

		this.setState({filterByColor: this.state.filterByColor});
	}

	updateFilterByCountry(event)
	{
		let indexOfItem = this.state.filterByCountry.indexOf(event.target.value);
		if(this.state.filterByCountry.indexOf(event.target.value)== -1)
			this.state.filterByCountry.push(event.target.value);
		else
			this.state.filterByCountry.splice(indexOfItem, 1);

		this.setState({filterByCountry: this.state.filterByCountry});
	}

	lowerPriceFilter(event){
		if(event.target.value == 0)
			this.setState({filterByLowerPrice: 0});
		else
		{
			let lowerPrice = parseInt(event.target.value);
			this.setState({filterByLowerPrice: lowerPrice});
		}
	}

	higherPriceFilter(event){
		if(event.target.value == 0)
			this.setState({filterByHigherPrice: 999999});
		else
		{
			let higherPrice = parseInt(event.target.value);
			this.setState({filterByHigherPrice: higherPrice});
		}
	}

	render(){
		let catalog = this.props.catalog.yml_catalog.shop.offers.offer,
			category_id = this.props.category_id,
			category_name = this.props.category_name;


		
		//Filter catalog by category_id	
		let filteredCatalog = catalog.filter((cat) => {
			return cat.categoryId == category_id;
		});
	
		
		//Create color array
		let colors = [];
		filteredCatalog.map((cat) => {
			return cat.param.filter((item) => {
				return item._name == "Цвет" ? colors.push(item.__text) : null;
			});
		});	
		
		//Delete duplicates elements in colors array
		let unicColors = unique(colors);
		//Sort colors array by ABC
		unicColors = unicColors.sort();
		//Deelte null value in colors array
		nullDeleting(unicColors);

			
		//Create vendors array
		let vendors = filteredCatalog.map((cat) => {
			return cat.vendor;
		});	
		//Delete duplicates elements in vendor array
		let unicVendors = unique(vendors);
		//Sort vendors array by ABC
		unicVendors = unicVendors.sort(function(a,b){
			return a < b ? -1 : 1;
		});

		//Creat country array
		let country = [];
		filteredCatalog.map((cat) => {
			return cat.param.filter((item) => {
				return item._name == "Страна-изготовитель" ? country.push(item.__text) : null;
			});
		});	

		country = unique(country);
		country.sort();




		//Function of duplicates elements
		function unique(list) {
		    var result = [];
		    $.each(list, function(i, e) {
		        if ($.inArray(e, result) == -1) result.push(e);
		    });
		    return result;
		}

		//Function of deleting null's in array
		function nullDeleting(){
			unicColors.shift();
		}



		//Serch in catalog  
		let serchInCatalogbyName = filteredCatalog.filter((cat) => {
			 return cat.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
		});

		//Filter by vendor
		if(this.state.filterByVendor == 0)
		{}
		else
		{
			serchInCatalogbyName = serchInCatalogbyName.filter((cat) => {
				return this.state.filterByVendor.indexOf(cat.vendor) !== -1;
			});
		}

		//Filter by color
		if(this.state.filterByColor == 0)
		{}
		else
		{
			serchInCatalogbyName = serchInCatalogbyName.filter((cat) => {
				let itemColor;
				cat.param.filter((curr) => {
					if(curr._name == "Цвет")
						itemColor = curr.__text;
				});
				return this.state.filterByColor.indexOf(itemColor) !== -1;
			});
		}

		//Filter by country
		if(this.state.filterByCountry == 0)
		{}
		else
		{

			serchInCatalogbyName = serchInCatalogbyName.filter((cat) => {
				let itemCountry;
				cat.param.filter((curr) => {
					if(curr._name == "Страна-изготовитель")
						itemCountry = curr.__text;
				});
				return this.state.filterByCountry.indexOf(itemCountry) !== -1;
			});
		}

		//Filter by lower price
		serchInCatalogbyName = serchInCatalogbyName.filter((cat) => {
			 return cat.price > this.state.filterByLowerPrice;
		});

		//Filter by higher price
		serchInCatalogbyName = serchInCatalogbyName.filter((cat) => {
			 return cat.price < this.state.filterByHigherPrice;
		});

		return(
			<div>	
				<div class="form-group">
				  <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} class="form-control" placeholder="Search" />
				</div>
				<div class="row">
				<div class="col-lg-12">
					<h3 >Расширенный поиск</h3>
					<div class="col-lg-4">
						<h4>Марка</h4>
						<div class="vendors_list">
								{unicVendors.map((ven) => {
									return <p><input onClick={this.updateFilterByVendor.bind(this)} type="checkbox" value={ven} /> {ven == undefined ? ven = "Other" : ven} </p>
								})}
						</div>

					</div>
					<div class="col-lg-4">
						<h4>Цвет</h4>
						<div class="vendors_list">
								{unicColors.map((color) => {
									return <p><input onClick={this.updateFilterByColor.bind(this)} type="checkbox" value={color} /> {color} </p>
								})}
						</div>
					</div>
					<div class="col-lg-4">
						<h4>Страна-изготовитель</h4>
						<div class="vendors_list">
								{country.map((count) => {
									return <p><input onClick={this.updateFilterByCountry.bind(this)} type="checkbox" value={count} /> {count} </p>
								})}
						</div>
					</div>
					<div class="col-lg-4">
						<h4>Цена</h4>
						<div class="vendors_list price_filter">
							<p>
								<label>от: </label>
								<input onChange={this.lowerPriceFilter.bind(this)} type="number" min="0" placeholder="руб." />
							</p>
							<p>
								<label>до: </label>
								<input onChange={this.higherPriceFilter.bind(this)} type="number" min="0" placeholder="руб." />
							</p>
						</div>
					</div>
					
				</div>
				</div>
				<table class="table table-hover main_table">
					<thead>
						<tr>
							<th>Фото</th>
							<th>Модель</th>
							<th>Цена</th>
							<th></th>
							<th>Сравнение</th>
						</tr>
					</thead>
					<tbody>
						{serchInCatalogbyName.map((item) =>{
							return	<RightSideContentItem addToView={this.props.addToView.bind(this)} addToCompare={this.props.addToCompare.bind(this)} item={item} compareList={this.props.compareList} />
						})}
					</tbody>
				</table>
			</div>
		)
	}
}