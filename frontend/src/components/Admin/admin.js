import React from "react";
// import "./admin.css";

import { CSVLink, CSVDownload } from "react-csv";
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
    this.userModeOptions = [
      // Note: values here correspond to properties isMentee, isMentor, is Date in the state
      { value: "isMentee", label: "Looking for a mentor" },
      { value: "isMentor", label: "Looking to be a mentor" },
      { value: "isDate", label: "Looking for a date" },
    ];
    this.state = {
      // Fields to send to the server
      ageRange: [30, this.ageRangeMaxAge], // [minAge, maxAge]
      genders: [],
      sexualOrientations: [],
      cancerTypes: [],
      treatments: [],
      medications: [],
      isMentee: false,
      isMentor: false,
      isDate: false,
      // Possible options to select for certain filters
      fieldPossibilities: {
        cancerTypes: [],
        sexualOrientationOptions: [],
        genderOptions: [],
        medications: [],
        treatmentTypes: [],
      },
      // other state
      showNumEntriesText: false,
      numEntries: 0,
      showCsvDownload: false,
      csvData: null,
    };
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

  handleOnChangeUserMode = (event) => {
    this.setState((state) => {
      // Set all selected entries to true, the rest to false
      // This key names in booleans match those in this.state
      const booleans = { isMentee: false, isMentor: false, isDate: false };
      for (const entry of event) {
        booleans[entry.value] = true;
      }
      return booleans;
    });
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
    const payload = { ageRange: this.state.ageRange };
    // Only send the filters for which the user made selections
    for (const field of ["isMentee", "isMentor", "isDate"]) {
      if (this.state[field]) {
        // only include checkbox filters if they were selected
        payload[field] = this.state[field];
      }
    }
    for (const field of [
      "genders",
      "sexualOrientations",
      "cancerTypes",
      "treatments",
      "medications",
    ]) {
      if (this.state[field].length > 0) {
        // only include dropdown filters if they had any selected elements
        payload[field] = this.state[field];
      }
    }
    // console.log(payload);

    try {
      const { responseData, errorMessage } = await requestEmails(payload);
      // console.log(responseData);

      if (!responseData) {
        alert(errorMessage);
        return;
      }
      this.setState({
        showNumEntriesText: true,
        numEntries: responseData.length,
      });
      // Only generate download if there any users selected by the filters
      if (responseData.length > 0) {
        this.setState((state) => {
          return {
            showCsvDownload: true,
            csvData: responseData.map((email) => {
              return { email: email };
            }),
          };
        });
      }
    } catch (error) {
      alert(
        "An error occurred connecting to the server," +
          " please make sure you have a working internet connection."
      );
    }
  };

  render() {
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
            <p className="h5">
              For the dropdown filters below, users matching at least one
              category in each <i>nonempty</i> filter will be included in the
              generated list (filters left blank will not affect the generated
              list).
            </p>
            <Form className="mx-auto mb-5" onSubmit={this.handleSubmit}>
              <Form.Group id="registration-form">
                <Form.Label className={"mt-5 h6 font-weight-normal"}>
                  Age Range
                </Form.Label>
                <Slider
                  id="ageFilter"
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
                <Select
                  id="userModeFilter"
                  multi
                  className="my-3"
                  placeholder="Select user modes (dating, mentor, and/or mentee)"
                  options={this.userModeOptions}
                  onChange={this.handleOnChangeUserMode}
                  clearable
                  separator
                />
              </Form.Group>
              <div className="d-flex justify-content-center mt-4 mx-auto">
                <Button
                  className="d-block mx-1"
                  variant="customOrange"
                  type="submit"
                >
                  Generate Email List
                </Button>
                {this.state.showCsvDownload && (
                  <Button
                    className="mx-2 d-block"
                    onClick={() => {
                      this.setState({ showCsvDownload: false });
                    }}
                  >
                    <CSVLink
                      className="text-light text-decoration-none"
                      data={this.state.csvData}
                      filename={"filtered_emails.csv"}
                      target="_blank"
                    >
                      Download Email List File
                    </CSVLink>
                  </Button>
                )}
              </div>
              {this.state.showNumEntriesText && (
                <p className="mx-auto mt-3 text-center">
                  {this.state.numEntries} users matched the given filters
                </p>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Admin;
