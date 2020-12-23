import React from "react";
// import "./admin.css";
import Select from "react-dropdown-select";
import { getCancerData } from "../../actions/serverRequests";
import { requestEmails } from "../../actions/adminServerRequests";
import { Container, Col, Row, Button, Form, Spinner } from "react-bootstrap";

/* Admin page component: get CSV file of all users satisfying filter criteria */
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Fields to send to the server
      //fieldSelections: {
      ageRange: [], // [minAge, maxAge]
      genders: [],
      sexualOrientations: [],
      cancerTypes: [],
      treatments: [],
      medications: [],
      isMentor: false,
      isMentee: false,
      isDate: false,
      //},
      // Fields for possible options to select
      fieldPossibilities: {
        cancerTypes: [],
        sexualOrientationOptions: [],
        genderOptions: [],
        medications: [],
        treatmentTypes: [],
      },
    };
    this.checkBox = React.createRef();  // ref to the checkbox
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
    this.checkBox.current.setCustomValidity("At least one checkbox must be checked");
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

  // handleOnChangeBirthday = (newDate) => {
  //   this.setState((state) => {
  //     return {
  //       birthday: newDate,
  //     };
  //   });
  // };

  handleOnChangeGenders = (e) => {
    this.setState((state) => {
      const gendersCopy = e.map((entry) => entry.label);
      return {
        genders: gendersCopy,
      };
    });
  };

  handleOnChangeSexualOrientations = (e) => {
    this.setState((state) => {
      const sexualOrientationsCopy = e.map((entry) => entry.label);
      return {
        sexualOrientations: sexualOrientationsCopy,
      };
    });
  };

  handleOnChangeCancerTypes = (e) => {
    this.setState((state) => {
      const cancerTypesCopy = e.map((entry) => entry.label);
      return {
        cancerTypes: cancerTypesCopy,
      };
    });
  };

  handleOnChangeTreatments = (e) => {
    this.setState((state) => {
      const treatmentsCopy = e.map((entry) => entry.label);
      return {
        treatments: treatmentsCopy,
      };
    });
  };

  handleOnChangeMedications = (e) => {
    this.setState((state) => {
      const medicationsCopy = e.map((entry) => entry.label);
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
      genders: this.state.genders,
      sexualOrientations: this.state.sexualOrientations,
      cancerTypes: this.state.cancerTypes,
      treatments: this.state.treatments,
      medications: this.state.medications,
      isMentor: this.state.isMentor,
      isMentee: this.state.isMentee,
      isPartner: this.state.isDate,
    };
    console.log(payload);

    try {
      const { responseData, errorMessage } = await requestEmails(payload);
      console.log(responseData);

      if (!responseData) {
        alert(errorMessage);
      } else {
        // Success
      }
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
            className="text-center my-3 display-4 mx-auto"
          >
            CancerChat Admin Page
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Form className="mx-auto" onSubmit={this.handleSubmit}>
              <Form.Group id="registration-form">
                {/* <Form.Control
                className="my-3"
                type="date"
                name="birthday"
                placeholder="Select birthday"
                onChange={(e) => this.handleOnChangeBirthday(e.target.value)}
                required
              /> */}
                <Select
                  multi
                  className="my-3"
                  required={true}
                  placeholder="Select gender"
                  options={this.state.fieldPossibilities.genderOptions}
                  onChange={this.handleOnChangeGenders}
                  clearable
                  separator
                />
                <Select
                  multi
                  className="my-3"
                  required={true}
                  placeholder="Select sexual orientation"
                  options={
                    this.state.fieldPossibilities.sexualOrientationOptions
                  }
                  onChange={this.handleOnChangeSexualOrientations}
                  clearable
                  separator
                />
                <Select
                  multi
                  className="my-3"
                  required={true}
                  placeholder="Select cancer types"
                  options={this.state.fieldPossibilities.cancerTypes}
                  onChange={this.handleOnChangeCancerTypes}
                  clearable
                  separator
                />
                <Select
                  multi
                  className="my-3"
                  required={true}
                  placeholder="Select treatments"
                  options={this.state.fieldPossibilities.treatmentTypes}
                  onChange={this.handleOnChangeTreatments}
                  clearable
                  separator
                />
                <Select
                  multi
                  className="my-3"
                  required={true}
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
