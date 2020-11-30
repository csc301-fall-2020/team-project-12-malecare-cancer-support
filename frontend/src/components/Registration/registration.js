import React from "react";
import "./registration.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Select from "react-dropdown-select";
import CancerData from "./cancer_data.json";
import InterestsData from "./interests.json";
import GeoSearchBar from "../GeoSearchBar";

/* Registration page component */
class Registration extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      first_name: null,
      last_name: null,
      birthday: null,
      phone_number: null,
      gender: null,
      password: null,
      confirm_password: null,
      sexual_orientation: null,
      treatments: [],
      cancer_types: [],
      medications: [],
      mentor: false,
      mentee: false,
      date: false,
      interests: [],
      bio: null,
      location: null,
    };

    for (let key in CancerData) {
      this[key] = CancerData[key].map((entry) => {
        return {
          value: entry,
          label: entry,
        };
      });
    }

    this.interests = InterestsData.interests.map((entry) => {
      return {
        value: entry,
        label: entry,
      };
    });

    this.curr_location = null;
    this.search_results = [];
    this.data_source = ["sacasc", "sacsacas"];
  }

  componentDidMount = () => {
    const checkbox = document.querySelector("#mentee");
    checkbox.setCustomValidity("At least one checkbox must be checked");
  };

  validateCheckBoxes = (checked, field) => {
    const checkbox = document.querySelector("#mentee");
    let error_message;
    if (checked) {
      error_message = "";
    } else {
      if (field === "mentee") {
        if (!this.state.mentor && !this.state.date) {
          error_message = "At least one checkbox must be checked";
        } else {
          error_message = "";
        }
      } else if (field === "mentor") {
        if (!this.state.mentee && !this.state.date) {
          error_message = "At least one checkbox must be checked";
        } else {
          error_message = "";
        }
      } else {
        if (!this.state.mentor && !this.state.mentee) {
          error_message = "At least one checkbox must be checked";
        } else {
          error_message = "";
        }
      }
    }
    checkbox.setCustomValidity(error_message);
  };

  handleOnChangeEmail = (new_email) => {
    this.setState((state) => {
      return {
        ...state,
        email: new_email,
      };
    });
  };

  handleOnChangeFirstName = (new_name) => {
    this.setState((state) => {
      return {
        ...state,
        first_name: new_name,
      };
    });
  };

  handleOnChangeLastName = (new_name) => {
    this.setState((state) => {
      return {
        ...state,
        last_name: new_name,
      };
    });
  };

  handleOnChangePassword = (new_password) => {
    this.setState((state) => {
      return {
        ...state,
        password: new_password,
      };
    });
  };

  handleOnChangeConfirmPassword = (new_password) => {
    this.setState((state) => {
      return {
        ...state,
        confirm_password: new_password,
      };
    });
  };

  handleOnChangePhoneNumber = (new_phone_number) => {
    this.setState((state) => {
      return {
        ...state,
        phone_number: new_phone_number,
      };
    });
  };

  handleOnChangeBirthday = (new_date) => {
    this.setState((state) => {
      return {
        ...state,
        birthday: new_date,
      };
    });
  };

  handleOnChangeGender = (e) => {
    this.setState((state) => {
      return {
        ...state,
        gender: e[0].label,
      };
    });
  };

  handleOnChangeLocation = (new_location) => {
    this.setState((state) => {
      return {
        ...state,
        location: new_location,
      };
    });
  };

  handleOnChangeSexualOrientation = (e) => {
    this.setState((state) => {
      return { ...state, sexual_orientation: e[0].label };
    });
  };

  handleOnChangeMedications = (e) => {
    this.setState((state) => {
      let medications_copy = e.map((entry) => entry.label);
      return {
        ...state,
        medications: medications_copy,
      };
    });
  };

  handleOnChangeTreatments = (e) => {
    this.setState((state) => {
      let treatments_copy = e.map((entry) => entry.label);
      return {
        ...state,
        treatments: treatments_copy,
      };
    });
  };

  handleOnChangeCancerTypes = (e) => {
    this.setState((state) => {
      let cancer_types_copy = e.map((entry) => entry.label);
      return {
        ...state,
        cancer_types: cancer_types_copy,
      };
    });
  };

  handleOnChangeMentee = (checked) => {
    this.setState((state) => {
      return {
        ...state,
        mentee: checked,
      };
    });

    this.validateCheckBoxes(checked, "mentee");
  };

  handleOnChangeMentor = (checked) => {
    this.setState((state) => {
      return {
        ...state,
        mentor: checked,
      };
    });

    this.validateCheckBoxes(checked, "mentor");
  };

  handleOnChangeDate = (checked) => {
    this.setState((state) => {
      return {
        ...state,
        date: checked,
      };
    });

    this.validateCheckBoxes(checked, "date");
  };

  handleOnChangeInterests = (e) => {
    this.setState((state) => {
      let interests_copy = e.map((entry) => entry.label)
      return {
        ...state,
        interests: interests_copy,
      };
    });
  };

  handOnInputBio = (e) => {
    const textarea = e.target;
    // Count rows by counting '\n' characters, but have at least 5 rows
    const num_rows = Math.max(
      5,
      1 + (textarea.value.match(/\n/g) || []).length
    );
    textarea.rows = num_rows;
  };

  handleOnChangeBio = (new_bio) => {
    this.setState((state) => {
      return {
        ...state,
        bio: new_bio,
      };
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const state_copy = this.state;
    if (state_copy.phone_number && state_copy.date) {
      console.log(state_copy);
    } else if (!state_copy.phone_number && !state_copy.date) {
      const { phone_number, interests, ...data_to_submit } = state_copy;
      console.log(data_to_submit);
    } else if (!state_copy.phone_number) {
      const { phone_number, ...data_to_submit } = state_copy;
      console.log(data_to_submit);
    } else {
      const { interests, ...data_to_submit } = state_copy;
      console.log(data_to_submit);
    }
  };

  render() {
    const isDateInterested = this.state.date;
    let interests_selection;
    if (isDateInterested) {
      interests_selection = (
        <Select
          multi
          required={true}
          placeholder="Select your interests"
          options={this.interests}
          onChange={this.handleOnChangeInterests}
        />
      );
    } else {
      interests_selection = <span></span>;
    }

    return (
      <div>
        <div>Join the CancerChat community</div>
        <form
          id="registration-form"
          className="registration-form"
          onSubmit={this.handleOnSubmit}
        >
          <input
            className="registrtion-input registration-email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => this.handleOnChangeEmail(e.target.value)}
            required
          />
          <br />
          <input
            className="registration-input registration-password"
            type="password"
            name="password"
            placeholder="Password"
            minLength="6"
            onChange={(e) => this.handleOnChangePassword(e.target.value)}
            required
          />
          <br />
          <input
            className="registration-input registration-confirm-password"
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
            minLength="6"
            onChange={(e) => this.handleOnChangeConfirmPassword(e.target.value)}
            required
          />
          <br />
          <input
            className="registration-input registration-first-name"
            type="text"
            name="first_name"
            placeholder="Your first name"
            onChange={(e) => this.handleOnChangeFirstName(e.target.value)}
            required
          />
          <br />
          <input
            className="registration-input registration-last-name"
            type="text"
            name="last_name"
            placeholder="Your last name"
            onChange={(e) => this.handleOnChangeLastName(e.target.value)}
            required
          />
          <br />
          <input
            className="registration-input registration-birthday"
            type="date"
            name="birthday"
            placeholder="Select your birthday"
            onChange={(e) => this.handleOnChangeBirthday(e.target.value)}
            required
          />
          <br />
          <PhoneInput
            placeholder="Enter your phone number (optional)"
            value={this.state.phone_number}
            onChange={(phone_number) =>
              this.handleOnChangePhoneNumber(phone_number)
            }
          />
          <br />
          <GeoSearchBar handleOnChangeLocation={this.handleOnChangeLocation} />
          <br />
          <Select
            required={true}
            placeholder="Select your gender"
            options={this.genderOptions}
            onChange={this.handleOnChangeGender}
          />
          <br />
          <Select
            required={true}
            placeholder="Select your sexual orientation"
            options={this.sexualOrientationOptions}
            onChange={this.handleOnChangeSexualOrientation}
          />
          <br />
          <Select
            multi
            required={true}
            placeholder="Select your cancer types"
            options={this.cancerTypes}
            onChange={this.handleOnChangeCancerTypes}
          />
          <br />
          <Select
            multi
            required={true}
            placeholder="Select your treatments"
            options={this.treatmentTypes}
            onChange={this.handleOnChangeTreatments}
          />
          <br />
          <Select
            multi
            required={true}
            placeholder="Select your medications"
            options={this.medications}
            onChange={this.handleOnChangeMedications}
          />
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="mentee">Looking for a mentor</label>
            <input
              id="mentee"
              className="registration-mentee"
              type="checkbox"
              name="mentee"
              onChange={(e) => this.handleOnChangeMentee(e.target.checked)}
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="mentor">Looking to be a mentor</label>
            <input
              id="mentor"
              className="registration-mentor"
              type="checkbox"
              name="mentor"
              onChange={(e) => this.handleOnChangeMentor(e.target.checked)}
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <label htmlFor="date">Looking for a date</label>
            <input
              id="date"
              className="registration-date"
              type="checkbox"
              name="date"
              onChange={(e) => this.handleOnChangeDate(e.target.checked)}
            />
          </div>
          <br />
          {interests_selection}
          <br />
          <textarea
            className="registration-input registration-bio"
            placeholder="Enter your bio"
            name="bio"
            rows="5"
            onInput={this.handOnInputBio}
            onChange={(e) => this.handleOnChangeBio(e.target.value)}
            required
          ></textarea>
          <br />
          <input
            className="registration-submit"
            type="submit"
            value="Register"
          />
          <br />
        </form>
      </div>
    );
  }
}

export default Registration;
