import React from 'react';
import axios from 'axios';

class App extends React.Component {
   constructor(props) {
      super(props);
    
      this.state = {
         "suggestions":[],
         "googleSuggestions" :[]
      }
   }

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
    
    var suggestions = data.filter(function(data){
      if(data.name.indexOf(query)>-1){
        return data.name;
      }
    });
    this.setState({"suggestions" : suggestions});
    return suggestions;
  }


  fetchGoogleSuggestion(query) {
    var apiKey = "AIzaSyCP0c5UpyklXAc81D9uIQTlKE5ot-ZyCaY";
    var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query="+query+"&key="+apiKey;
   /*
      axios({ method: 'GET', 
        url:url,
        crossDomain: true})
       .then(res => {
          console.log(res);
          this.setState({"googleSuggestions" : res.results})
        })*/

       axios({ method: 'GET', url:url,
        crossDomain: true,}) 
        .then(() => {  })
        .catch((error) => { console.log(error);});
  }


   searchHadler(query){
      this.fetchSuggestions(query);
      this.fetchGoogleSuggestion(query);
   }
  
   render() {
    var _this= this;
      return (
         <div>
            <SearchViewComponent searchHadler = {this.searchHadler.bind(_this)}/>
            <SuggestionViewComponnet suggestions = {this.state.suggestions}/>
            <GoogleSuggestionComponent googleSuggestions = {this.state.googleSuggestions}/>
         </div>
      );
   }
}

class SearchViewComponent extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
            inputValue : ''
      }
       this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt){
      var query = evt.target.value;
       this.setState({
        inputValue: query
      });
      this.props.searchHadler(query);
       
    }

    render() {
      return (
        <div className="container">
          <input type="text" value={this.state.inputValue} onChange={this.handleChange}/>
        </div>
      );
    }
}

class SuggestionViewComponnet extends React.Component{
  
    render(){
      var suggestions = this.props.suggestions;
      var list = suggestions.map(function(suggestion, index){
                  return <li>{suggestion.name}</li>;
                })
      return(
        <div className="suggestionContainer">
           <ul>{list}</ul>
        </div>
      )
    }
}

class GoogleSuggestionComponent extends React.Component{
     render(){
      var suggestions = this.props.googleSuggestions;
      var list = suggestions.map(function(suggestion, index){
                  return <li>{suggestion.name}</li>;
                })
      return(
        <div className="googleSuggestionContainer">
           <ul>{list}</ul>
        </div>
      )
    }   
}

export default App;