import React from "react";
// import "./admin.css";

import Slider from "@material-ui/core/Slider";
import Select from "react-dropdown-select";
import { getCancerData } from "../../actions/serverRequests";
import { requestEmails } from "../../actions/adminServerRequests";
import { Container, Col, Row, Button, Form, Spinner } from "react-bootstrap";

/* Admin page component: get CSV file of all users satisfying filter criteria */
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.ageRangeMinAge = 0;
    this.ageRangeMaxAge = 120;
    this.state = {
      // Fields to send to the server
      ageRange: [30, this.ageRangeMaxAge], // [minAge, maxAge]
      genders: [],
      sexualOrientations: [],
      cancerTypes: [],
      treatments: [],
      medications: [],
      isMentor: false,
      isMentee: false,
      isDate: false,
      // Fields for possible options to select
      fieldPossibilities: {
        cancerTypes: [],
        sexualOrientationOptions: [],
        genderOptions: [],
        medications: [],
        treatmentTypes: [],
      },
    };
    this.checkBox = React.createRef(); // ref to the checkbox
  }

  componentDidMount = async () => {
    // Get filtering options from the server
    const cancerData = await getCancerData();
    const fieldPossibilities = {};
    for (let key in cancerData) {
      fieldPossibilities[key] = cancerData[key].map((entry) => {
        return {
          value: entry,
          label: entry,
        };
      });
    }
    this.setState({ fieldPossibilities: fieldPossibilities });
    this.checkBox.current.setCustomValidity(
      "At least one checkbox must be checked"
    );
  };

  validateCheckBoxes = () => {
    let errorMessage = "";
    // The unary operator '+' converts true to 1 and false to 0
    const totalChecked =
      +this.state.isMentor + +this.state.isMentee + +this.state.isDate;
    if (totalChecked === 0) {
      errorMessage = "At least one checkbox must be checked";
    }
    this.checkBox.current.setCustomValidity(errorMessage);
  };

  handleOnChangeAgeRange = (event, values) => {
    this.setState({ ageRange: values });
  };

  handleOnChangeGenders = (event) => {
    this.setState((state) => {
      const gendersCopy = event.map((entry) => entry.label);
      return {
        genders: gendersCopy,
      };
    });
  };

  handleOnChangeSexualOrientations = (event) => {
    this.setState((state) => {
      const sexualOrientationsCopy = event.map((entry) => entry.label);
      return {
        sexualOrientations: sexualOrientationsCopy,
      };
    });
  };

  handleOnChangeCancerTypes = (event) => {
    this.setState((state) => {
      const cancerTypesCopy = event.map((entry) => entry.label);
      return {
        cancerTypes: cancerTypesCopy,
      };
    });
  };

  handleOnChangeTreatments = (event) => {
    this.setState((state) => {
      const treatmentsCopy = event.map((entry) => entry.label);
      return {
        treatments: treatmentsCopy,
      };
    });
  };

  handleOnChangeMedications = (event) => {
    this.setState((state) => {
      const medicationsCopy = event.map((entry) => entry.label);
      return {
        medications: medicationsCopy,
      };
    });
  };

  handleOnChangeMentee = (checked) => {
    this.setState((state) => {
      return {
        isMentee: checked,
      };
    }, this.validateCheckBoxes);
  };

  handleOnChangeMentor = (checked) => {
    this.setState((state) => {
      return {
        isMentor: checked,
      };
    }, this.validateCheckBoxes);
  };

  handleOnChangeDate = (checked) => {
    this.setState((state) => {
      return {
        isDate: checked,
      };
    }, this.validateCheckBoxes);
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      console.log("Form not valid");
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    const payload = {
      ageRange: this.state.ageRange,
      isMentor: this.state.isMentor,
      isMentee: this.state.isMentee,
      isPartner: this.state.isDate,
    };
    // Only send filters for which the user made selections
    for (const field of [
      "genders",
      "sexualOrientations",
      "cancerTypes",
      "treatments",
      "medications",
    ]) {
      if (this.state[field].length > 0) {
        payload[field] = this.state[field];
      }
    }
    // console.log(payload);

    try {
      const { responseData, errorMessage } = await requestEmails(payload);
      console.log(responseData);

      if (!responseData) {
        alert(errorMessage);
        return;
      }
      // Otherwise success
    } catch (error) {
      alert(
        "An error occurred connecting to the server," +
          " please make sure you have a working internet connection."
      );
    }
  };

  render() {
    /* <CircularProgress
            className="d-block mx-auto text-center"
            style={{ maxWidth: "100%" }}
          /> */
    return (
      <Container>
        <Row>
          <Col
            xs={12}
            md={{ span: 8, offset: 2 }}
            className="text-center my-4 mx-auto"
          >
            <h3>CancerChat Admin Page</h3>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <h5>
              Select the types of users by using the filters below. Filters can
              be left blank to avoid filtering based on those attributes.
            </h5>
            <Form className="mx-auto" onSubmit={this.handleSubmit}>
              <Form.Group id="registration-form">
                <Form.Label className={"mt-5 h6 font-weight-normal"}>
                  Age Range
                </Form.Label>
                <Slider
                  id="ageFilter"
                  // defaultValue={[30, this.ageRangeMaxAge]}
                  value={this.state.ageRange}
                  min={this.ageRangeMinAge}
                  max={this.ageRangeMaxAge}
                  marks={[
                    { value: this.ageRangeMinAge, label: this.ageRangeMinAge },
                    { value: this.ageRangeMaxAge, label: this.ageRangeMaxAge },
                  ]}
                  step={1}
                  valueLabelDisplay="on"
                  getAriaLabel={(index) => {
                    return index === 0 ? "minimum age" : "maximum age";
                  }}
                  onChange={this.handleOnChangeAgeRange}
                  // getAriaValueText={(value, index) => {
                  //   return (index === 0 ? "min age " : "max age ") + value + "years old";
                  // }}
                />
                <Select
                  id="genderFilter"
                  multi
                  className="mt-2 mb-3"
                  placeholder="Select gender"
                  options={this.state.fieldPossibilities.genderOptions}
                  onChange={this.handleOnChangeGenders}
                  clearable
                  separator
                />
                <Select
                  id="sexualOrientationFilter"
                  multi
                  className="my-3"
                  placeholder="Select sexual orientation"
                  options={
                    this.state.fieldPossibilities.sexualOrientationOptions
                  }
                  onChange={this.handleOnChangeSexualOrientations}
                  clearable
                  separator
                />
                <Select
                  id="cancerTypeFilter"
                  multi
                  className="my-3"
                  placeholder="Select cancer types"
                  options={this.state.fieldPossibilities.cancerTypes}
                  onChange={this.handleOnChangeCancerTypes}
                  clearable
                  separator
                />
                <Select
                  id="treatmentFilter"
                  multi
                  className="my-3"
                  placeholder="Select treatments"
                  options={this.state.fieldPossibilities.treatmentTypes}
                  onChange={this.handleOnChangeTreatments}
                  clearable
                  separator
                />
                <Select
                  id="medicationFilter"
                  multi
                  className="my-3"
                  placeholder="Select medications"
                  options={this.state.fieldPossibilities.medications}
                  onChange={this.handleOnChangeMedications}
                  clearable
                  separator
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="my-3"
                >
                  <label htmlFor="mentee">Looking for a mentor</label>
                  <input
                    ref={this.checkBox}
                    id="mentee"
                    className="registration-mentee"
                    type="checkbox"
                    name="mentee"
                    onChange={(e) =>
                      this.handleOnChangeMentee(e.target.checked)
                    }
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
                    onChange={(e) =>
                      this.handleOnChangeMentor(e.target.checked)
                    }
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
              </Form.Group>
              <Button
                className="my-3 d-block mx-auto"
                variant="customOrange"
                type="submit"
              >
                Generate Email List
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Admin;
