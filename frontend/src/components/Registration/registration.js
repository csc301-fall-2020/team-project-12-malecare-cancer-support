import React from "react";
import "./registration.css";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import Select from 'react-dropdown-select';
import CancerData from "./cancer_data.json";
//import Select from 'react-select';
import { options } from "./options";

/* Registration page component */
class Registration extends React.Component {
  constructor() {
    super()
    this.state = {
      email: null,
      first_name: null,
      last_name: null,
      birthday: null,
      phone: null,
      gender: null,
      sexual_orientation: null,
      treatments: [],
      cancer_types: [],
      medications: [],
      is_mentor: null,
      is_mentee: null,
      is_partner: null,
      interests: null,
      bio: null,
    }
    for (let key in CancerData) {
      this[key] = CancerData[key].map((entry) => {
        return {
          value: entry,
          label: entry
        }
      })
    }
  }

  get_location_data = async (city) => {
    const response = await fetch("https://api.teleport.org/api/cities/?search="+city)
    const data = await response.json()
    const search_results = data["_embedded"]["city:search_results"] 
    if (!search_results.length) {
      this.search_results = [{
          city_name: "No results"
      }]
    } else if (!search_results.length < 4) {
      this.search_results = search_results.map((search_result) => {
        return {full_city_name: search_result.matching_full_name,
          href: search_result._links["city:item"]["href"]
        }
      })
    } else {
      for(let i = 0; i < 4; i++) {
        let search_result = search_results[i]
        this.search_results.append({
          full_city_name: search_result.matching_full_name,
          href: search_result._links["city:item"]["href"]
        })
      }
    }
  }

  handleOnChangeGender = (e) => {
    this.setState((state) => {
      return {
        ...state,
        gender: e[0].label
      }
    })
  }

  handleOnChangeSexualOrientation = (e) => {
    this.setState((state) => {
      return {...state,
        sexual_orientation: e[0].label}
    })
  }


  handleOnChangeMedications = (e) => {
      this.setState((state) => {
        let medications_copy = state.medications
        medications_copy.push(e.label)
        return {
          ...state,
          medications: medications_copy
        }
      })
  }

  handleOnChangeTreatments = (e) => {
    console.log(e)
    this.setState((state) => {
      let treatments_copy = state.treatments
      treatments_copy.push(e.label)
      return {
        ...state,
        treatment_types: treatments_copy
      }
    })
  }

    handleOnChangeCancerTypes = (e) => {
      this.setState((state) => {
        let cancer_types_copy = state.cancer_types
        cancer_types_copy.push(e.label)
        return {
          ...state,
          cancer_types: cancer_types_copy
        }
      })
    }


  render() {
    return (
      <div>
        <div>Join the CancerChat community</div>
        <form className="registration-form" onSubmit={this.handleSubmit}>
          <input
            className="registrtion-input registration-email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="registration-input registration-password"
            type="password"
            name="password"
            placeholder="Password"
            minlength="6"
            required
          />
          <input
            className="registration-input registration-first-name"
            type="text"
            name="first_name"
            placeholder="Your first name"
            required
          />
          <input
            className="registration-input registration-last-name"
            type="text"
            name="last_name"
            placeholder="Your last name"
            required
          />
          <input
            className="registration-input registration-birthday"
            type="date"
            name="birthday"
            placeholder="Select your birthday"
            required
          />
          <PhoneInput
          placeholder="Enter phone number"
          value={this.state.phone}
          onChange={(new_value) => this.state.phone = new_value}/>
          <br/>
          <Select
          required
          placeholder="Select your gender" 
          options={this.genderOptions} 
          onChange={this.handleOnChangeGender}
          />
          <br/>
          <Select
          required
          placeholder="Select your sexual orientation" 
          options={this.sexualOrientationOptions} 
          onChange={this.handleOnChangeSexualOrientation}
          />
          <br/>
          <Select
          multi
          required
          placeholder="Select your cancer types" 
          options={this.cancerTypes} 
          onChange={this.handleOnChangeCancerTypes}
          />
          <br/>
          <Select
          multi
          required
          placeholder="Select your treatments" 
          options={this.treatmentTypes} 
          onChange={this.handleOnChangeTreatments}
          />
          <br/>
          <Select
          multi
          required
          placeholder="Select your medications" 
          options={this.medications} 
          onChange={this.handleOnChangeMedications}
          />
          <br/>
          <textarea 
          placeholder="Enter your bio"
          name="bio"
          required
          >
          </textarea>
          <br/>
          <input className="registration-submit" type="submit" value="Submit" onClick={() => console.log(this.state)} />
          <br/>
        </form>
      </div>
    );
  }
}

export default Registration;
