import React from "react";
import "./registration.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Select from "react-dropdown-select";
import { withRouter } from "react-router-dom";
import GeoSearchBar from "../GeoSearchBar";
import { CurUserContext } from "../../curUserContext";
import {
  signup,
  getCancerData,
  getInterestsData,
} from "../../actions/serverRequests";
import { Container, Col, Row, Button, Form, Image } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";

/* Registration page component */
class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      first_name: null,
      last_name: null,
      birthday: null,
      phone_number: null,
      profileImage: null,
      locations: null,
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
    this.loading = false;
    this.cancerTypes = [];
    this.sexualOrientationOptions = [];
    this.genderOptions = [];
    this.medications = [];
    this.treatmentTypes = [];
    this.interests = [];
    this.curr_location = null;
    this.search_results = [];
  }

  componentDidMount = async () => {
    if (this.context.isLoggedIn()) {
      this.props.history.replace("/landing");
    }
    const cancerData = await getCancerData();
    const interestsData = await getInterestsData();
    for (let key in cancerData) {
      this[key] = cancerData[key].map((entry) => {
        return {
          value: entry,
          label: entry,
        };
      });
    }
    this.interests = interestsData.interests.map((entry) => {
      return {
        value: entry,
        label: entry,
      };
    });
    await this.setState((prev) => {
      return {
        ...prev,
        email: "ascasc",
      };
    });
    await this.setState((prev) => {
      return {
        ...prev,
        email: null,
      };
    });
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
      let interests_copy = e.map((entry) => entry.label);
      return {
        ...state,
        interests: interests_copy,
      };
    });
  };

  handleOnChangeImage = async (imgFile) => {
    this.loading = true;
    let reader = new FileReader();
    await reader.readAsDataURL(imgFile);
    reader.onload = () => {
      this.setState((prev) => {
        return {
          ...prev,
          profileImage: reader.result,
        };
      });
      this.loading = false;
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  handOnInputBio = (e) => {
    const textarea = e.target;
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

  handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log("cas");
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const payload = {
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.first_name,
      lastname: this.state.last_name,
      birthday: this.state.birthday,
      phone: this.state.phone_number,
      gender: this.state.gender,
      sexual_orientation: this.state.sexual_orientation,
      treatments: this.state.treatments,
      cancer_types: this.state.cancer_types,
      location: this.state.location,
      medications: this.state.medications,
      is_mentor: this.state.mentor,
      is_mentee: this.state.mentee,
      is_partner: this.state.date,
      interests: this.state.interests,
      profileImage: this.state.profileImage,
      bio: this.state.bio,
    };
    if (payload["phone"] === undefined) {
      delete payload["phone"];
    }
    if (payload["interests"].length === 0) {
      delete payload["interests"];
    }

    try {
      const { responseData, errorMessage } = await signup(payload);
      console.log(responseData);

      if (!responseData) {
        alert(errorMessage);
      } else {
        // successfully logged in
        this.context.setCurrentUser({
          accessToken: responseData.accessToken,
          userId: responseData.userId,
        });
        // TODO: could instead go to a custom introduction page?
        this.props.history.push("/landing");
      }
    } catch (error) {
      alert(
        "An error occurred connecting to the server," +
          " please make sure you have a working internet connect"
      );
    }
  };

  render() {
    const isDateInterested = this.state.date;
    const profileImg = this.state.profileImage;
    const loading = this.loading;
    let interests_selection;
    let img_preview;
    if (isDateInterested) {
      interests_selection = (
        <Select
          multi
          required={true}
          className="my-2"
          placeholder="Select your interests"
          options={this.interests}
          onChange={this.handleOnChangeInterests}
        />
      );
    } else {
      interests_selection = null;
    }

    if (profileImg) {
      img_preview = (
        <Col>
          <Image
            src={profileImg}
            className="d-block mx-auto text-center"
            style={{ maxWidth: "100%" }}
          />
        </Col>
      );
    } else if (loading) {
      img_preview = (
        <Col>
          <CircularProgress
            className="d-block mx-auto text-center"
            style={{ maxWidth: "100%" }}
          />
        </Col>
      );
    } else {
      img_preview = null;
    }

    return (
      <Container>
        <Row>
          <Col
            xs={12}
            md={{ span: 8, offset: 2 }}
            className="text-center my-3 display-4 mx-auto"
          >
            Join the CancerChat community
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form.Group
              id="registration-form"
              className="mx-auto"
              onSubmit={this.handleSubmit}
            >
              <Form.Control
                className="my-3 mx-auto"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => this.handleOnChangeEmail(e.target.value)}
                required
              />
              <Form.Control
                className="my-3"
                type="password"
                name="password"
                placeholder="Password"
                minLength="6"
                onChange={(e) => this.handleOnChangePassword(e.target.value)}
                required
              />
              <Form.Control
                className="my-3"
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
                minLength="6"
                onChange={(e) =>
                  this.handleOnChangeConfirmPassword(e.target.value)
                }
                required
              />
              <Form.Control
                className="my-3"
                type="text"
                name="first_name"
                placeholder="Your first name"
                onChange={(e) => this.handleOnChangeFirstName(e.target.value)}
                required
              />
              <Form.Control
                className="my-3"
                type="text"
                name="last_name"
                placeholder="Your last name"
                onChange={(e) => this.handleOnChangeLastName(e.target.value)}
                required
              />
              <Form.Control
                className="my-3"
                type="date"
                name="birthday"
                placeholder="Select your birthday"
                onChange={(e) => this.handleOnChangeBirthday(e.target.value)}
                required
              />
              <PhoneInput
                className="my-4 mx-auto"
                placeholder="Enter your phone number (optional)"
                value={this.state.phone_number}
                onChange={(phone_number) =>
                  this.handleOnChangePhoneNumber(phone_number)
                }
              />
              <GeoSearchBar
                className="my-3"
                handleOnChangeLocation={this.handleOnChangeLocation}
              />
              <Select
                className="my-3"
                required={true}
                placeholder="Select your gender"
                options={this.genderOptions}
                onChange={this.handleOnChangeGender}
              />
              <Select
                className="my-3"
                required={true}
                placeholder="Select your sexual orientation"
                options={this.sexualOrientationOptions}
                onChange={this.handleOnChangeSexualOrientation}
              />
              <Select
                multi
                className="my-3"
                required={true}
                placeholder="Select your cancer types"
                options={this.cancerTypes}
                onChange={this.handleOnChangeCancerTypes}
              />
              <Select
                multi
                className="my-3"
                required={true}
                placeholder="Select your treatments"
                options={this.treatmentTypes}
                onChange={this.handleOnChangeTreatments}
              />
              <Select
                multi
                className="my-3"
                required={true}
                placeholder="Select your medications"
                options={this.medications}
                onChange={this.handleOnChangeMedications}
              />
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="my-3"
              >
                <label htmlFor="mentee">Looking for a mentor</label>
                <input
                  id="mentee"
                  className="registration-mentee"
                  type="checkbox"
                  name="mentee"
                  onChange={(e) => this.handleOnChangeMentee(e.target.checked)}
                />
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="my-3"
              >
                <label htmlFor="mentor">Looking to be a mentor</label>
                <input
                  id="mentor"
                  className="registration-mentor"
                  type="checkbox"
                  name="mentor"
                  onChange={(e) => this.handleOnChangeMentor(e.target.checked)}
                />
              </div>
              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="my-3"
              >
                <label htmlFor="date">Looking for a date</label>
                <input
                  id="date"
                  className="registration-date"
                  type="checkbox"
                  name="date"
                  onChange={(e) => this.handleOnChangeDate(e.target.checked)}
                />
              </div>
              {interests_selection}
              <Form.Control
                className="my-3 border border-dark"
                type="file"
                name="birthday"
                placeholder="Select your profile image"
                accept="image/png, image/jpeg"
                onChange={(e) => this.handleOnChangeImage(e.target.files[0])}
                required
              />
              {img_preview}
              <div className="form-group">
                <textarea
                  className="my-1 registration-bio form-control"
                  placeholder="Enter your bio"
                  name="bio"
                  rows="5"
                  onInput={this.handOnInputBio}
                  onChange={(e) => this.handleOnChangeBio(e.target.value)}
                  required
                ></textarea>
              </div>
              <Button
                className="my-3 d-block mx-auto"
                variant="customOrange"
                type="submit"
                value="Register"
                onClick={(e) => this.handleSubmit(e)}
              >
                Register
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    );
  }
}
Registration.contextType = CurUserContext;

export default withRouter(Registration);
