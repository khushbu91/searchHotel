class SearchModel{

	fetchSuggestions(query){
		var data = 
			[
				{"name":"fabHotel New",
				"place":"New Delhi"
				},
				{"name":"TajHotel Ggn",
				"place":"Gurgaon"
				},
				{"name":"hotelFab New ggn",
				"place":"New Delhi"
				},
				{"name":"fabHotel old ggn",
				"place":"New Delhi"
				},
				{"name":"fabHotel old delhi",
				"place":"New Delhi"
				},
				{"name":"fabHotelOld NewDelhi",
				"place":"New Delhi"
				},
			];	
		
		var suugestions = data.filter(function(data){
			if(data.name.indexOf(query)>-1){
				return data.name;
			}
		});
		return suugestions;
	}
}
export default SearchModel;