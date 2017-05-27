import React from 'react';
import axios from 'axios';
import { Throttle } from 'react-throttle';

class App extends React.Component {
   constructor(props) {
      super(props);
    
      this.state = {
         "suggestions":[],
         "googleSuggestions" :[]
      }
   }

   fetchSuggestions(query){
     var url = "http://localhost:4000/hotels/query/"+query;
      var suggestions= [];
      axios({ method: 'GET', 
        url:url,
        crossDomain: true})
       .then(res => {
          suggestions  = res.data.data;
        this.setState({"suggestions" : suggestions});
      });
    return suggestions;
  }


  fetchGoogleSuggestion(query) {
    var apiKey = "AIzaSyCP0c5UpyklXAc81D9uIQTlKE5ot-ZyCaY";
    var url = "http://crossorigin.me/https://maps.googleapis.com/maps/api/place/textsearch/json?query="+query+"&key="+apiKey;
   
      axios({ method: 'GET', 
        url:url,
        crossDomain: true})
       .then(res => {
          this.setState({"googleSuggestions" : res.data.results})
        })
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
          <Throttle time="300" handler="onChange">
              <input type="text" className="searchInput"onChange={this.handleChange}/>
          </Throttle>
        </div>
      );
    }
}

class SuggestionViewComponnet extends React.Component{
  
    render(){
      var suggestions = this.props.suggestions;
      var list = suggestions.map(function(suggestion, index){
                  return <li><span className="locIcon"></span>
                  <span className="sugText">{suggestion.name}</span></li>;
                })
      if(suggestions.length>0){          
        return(
          <div className="hotelSuggestion">
              <div className="suggestionHead">Hotels</div>
             <ul>{list}</ul>
          </div>
        )
      }else{
        return (
          <span></span>
        )
      }
    }
}

class GoogleSuggestionComponent extends React.Component{
     render(){
      var suggestions = this.props.googleSuggestions;
      var list = suggestions.map(function(suggestion, index){
                  return <li>
                    <span className="locIcon"></span>
                    <span className="sugText">{suggestion.name}</span>
                  </li>;
                })
      if(suggestions.length>0){        
        return(
          <div className="googleSuggestion">
              <div className="suggestionHead">Locations</div>
             <ul>{list}</ul>
          </div>
        )
       }else{
        return(
          <span></span>
        )
       } 
    }   
}

export default App;