import React from "react";
import './geosearchbar.css'
import "react-phone-number-input/style.css";
import SearchIcon from "@material-ui/icons/Search";


class GeoSearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInput: "",
            suggestedLocations: [],
            selected_location: null
        }
    }

    componentDidMount = () => {
        const search_box = document.querySelector("#geosearch");
        search_box.setCustomValidity("You must select a location");
    }

    getPossibleLocationsData = async (city) => {
        city = city.trim()
        if(city === "") {
            return [
                {
                  full_city_name: "No results",
                  href: ""
                },
              ];
        }
        try {
            const response = await fetch(
                "https://api.teleport.org/api/cities/?search=" + city
              );
              const data = await response.json();
              console.log(data)
              const search_results = data["_embedded"]["city:search-results"];
              if (!search_results.length) {
                  const filtered_results = [
                  {
                    full_city_name: "No results",
                    href: ""
                  },
                ];
                return filtered_results
              } else if (!search_results.length < 4) {
                const filtered_results = search_results.map((search_result) => {
                  return {
                    full_city_name: search_result.matching_full_name,
                    href: search_result._links["city:item"]["href"],
                  };
                });
                return filtered_results;
              } else {
                  let filtered_results;
                for (let i = 0; i < 4; i++) {
                  let search_result = search_results[i];
                  filtered_results.append({
                    full_city_name: search_result.matching_full_name,
                    href: search_result._links["city:item"]["href"],
                  });
                }
                return filtered_results;
              }
        } catch(error) {
            console.log(error)
        }
      };
    

    handleOnSearch = async () => {
        const city = this.state.userInput;
        console.log("city" + city)
        const data = await this.getPossibleLocationsData(city);
        console.log(data)
        this.setState((state) => {
            return {
                ...state,
                suggestedLocations: data
            }
        })
        console.log('asasca')
    }

    handleOnChangeInput = (e) => {
        const value = e.target.value
        const {selected_location} = this.state;
        if(selected_location != null) {
            const location_name = selected_location.city + "," + selected_location.region + "," + selected_location.country;
            if(location_name !== value) {
                const search_box = document.querySelector("#geosearch");
                search_box.setCustomValidity("You must select a location");
            }
        }
        this.setState((state) => {
            return {
                ...state,
                userInput: value
            }
        })
    }

    handleOnPress = (e) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            this.handleOnSearch()
        }
    }

    getLocationData = async (url) => {
        try{
            const response = await fetch(url);
            const data = await response.json();
            const locationData = {
                city: data['name'],
                region: data['_links']['city:admin1_division']['name'],
                country: data['_links']['city:country']['name'],
                latitude: data['location']['latlon']['latitude'],
                longitude: data['location']['latlon']['longitude']
            }

            return locationData

        } catch(error) {
            console.log(error)
        }
    }

    suggestionSelected = async (url) => {
        const locationData = await this.getLocationData(url) 
        const locationName = locationData['city'] + ',' + locationData['region'] + ',' + locationData['country'] 
        this.props.handleOnChangeLocation(locationData)
        this.setState((state) => {
            return {
                ...state,
                userInput: locationName,
                selected_location: locationData
            }
        })

        this.handleCustomValidity();
    }

    handleCustomValidity = () => {
        const search_box = document.querySelector("#geosearch");
        search_box.setCustomValidity("");
    }

    render() {

        const {suggestedLocations} = this.state;
        let results;
        if (suggestedLocations.length == 0) {
            results = <ul><li>No results</li></ul>
        } else {
            results = (
                <ul>
                    {suggestedLocations.map((location) => <li key={location.full_city_name} onClick={() => this.suggestionSelected(location.href)}>{location.full_city_name}</li>)}
                </ul>
            )
        }

        return (
            <div className="search-component-container">
                <input
                id="geosearch"
                type="text"
                placeholder="Search your city"
                value={this.state.userInput}
                onChange={this.handleOnChangeInput}
                onKeyPress={this.handleOnPress}
                required
                />
                {/* <SearchIcon
                onClick={(e) => this.handleOnSearch()}
                /> */}
                {results}
            </div>
        )
    }
}

export default GeoSearchBar;