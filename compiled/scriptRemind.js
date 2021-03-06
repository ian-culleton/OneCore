"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScriptRemind = function (_React$Component) {
  _inherits(ScriptRemind, _React$Component);

  function ScriptRemind(props) {
    _classCallCheck(this, ScriptRemind);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScriptRemind).call(this, props));

    _this.state = {
      "currentDrug": "None",
      "dosageAmt": 0,
      "dosageMeasure": 'none',
      "date": null,
      "scheduleNum": "none",
      "scheduleDayWeek": "none"
    };
    _this.updateDrugName = _this.updateDrugName.bind(_this);
    _this.submitForm = _this.submitForm.bind(_this);
    _this.handleDayClick = _this.handleDayClick.bind(_this);
    _this.handleDoseMeasurement = _this.handleDoseMeasurement.bind(_this);
    _this.handleScheduleDayWeek = _this.handleScheduleDayWeek.bind(_this);

    return _this;
  }

  _createClass(ScriptRemind, [{
    key: "updateDrugName",
    value: function updateDrugName(event) {
      console.log("value", event.target.value);
      console.log("hi");
      this.setState({
        currentDrug: event.target.value
      });
    }
  }, {
    key: "handleDayClick",
    value: function handleDayClick(date) {
      this.setState({
        "date": date
      });
    }
  }, {
    key: "handleScheduleDayWeek",
    value: function handleScheduleDayWeek(dayWeek) {
      this.setState({
        "scheduleDayWeek": dayWeek
      });
    }
  }, {
    key: "handleDoseMeasurement",
    value: function handleDoseMeasurement(measure) {
      console.log("measure", measure);
      this.setState({
        "dosageMeasure": measure
      });
    }
  }, {
    key: "submitForm",
    value: function submitForm() {
      var script = {
        "name": this.state.currentDrug,
        "dosage": this.state.dosageAmt + ' ' + this.state.dosageMeasure,
        "refill": this.state.date,
        "frequency": this.state.scheduleNum + ' per ' + this.state.scheduleDayWeek,
        "phoneNum": "8108414628"
      };
      console.log("submitForm called for: ", script);

      $.ajax({
        type: 'POST',
        url: '/api/script/add',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(script),
        success: function success(data) {
          console.log('A reminder was set for: ', data);
        },
        error: function error(err) {
          console.log('Reminder not set: ', err);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var date = new Date();
      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            " Current Drug: ",
            this.state.currentDrug,
            " "
          ),
          React.createElement("input", {
            onChange: this.updateDrugName,
            placeholder: "Name"
          })
        ),
        React.createElement(
          "div",
          null,
          React.createElement("input", {
            width: "200",
            onChange: function onChange(text) {
              return _this2.setState({ "dosageAmt": text });
            },
            placeholder: "Dosage (e.g. if \"Take 1 tablet\", type \"1\")"
          }),
          React.createElement(
            "select",
            { className: "dropdown-replacement", value: this.state.dosageMeasure, onChange: this.handleDoseMeasurement },
            React.createElement(
              "option",
              null,
              "mg"
            ),
            React.createElement(
              "option",
              null,
              "mL"
            ),
            React.createElement(
              "option",
              null,
              "tablet"
            )
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "h1",
            null,
            " Refill Date"
          ),
          React.createElement(Calendar, {
            dateFormat: "YYYY-MM-DD",
            date: date,
            onChange: this.handleDayClick
          }),
          React.createElement(
            "h3",
            null,
            " You selected ",
            this.state.date,
            " "
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement("input", {
            width: "100",
            onChange: function onChange(text) {
              return _this2.setState({ "scheduleNum": text });
            },
            placeholder: "How often? (1x, 2x, etc..)"
          }),
          React.createElement(
            "h3",
            null,
            " per "
          ),
          React.createElement(
            "select",
            { className: "dropdown-replacement", value: this.state.scheduleDayWeek, onChange: this.handleScheduleDayWeek },
            React.createElement(
              "option",
              null,
              "day"
            ),
            React.createElement(
              "option",
              null,
              "week"
            )
          )
        ),
        React.createElement(
          "div",
          null,
          React.createElement(
            "button",
            { onClick: this.submitForm() },
            " Remind Me "
          )
        )
      );
    }
  }]);

  return ScriptRemind;
}(React.Component);

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  topbar: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  backgroundColor: 'black',
  paddingHorizontal: 5,
  paddingVertical: 10
  },
  submit: {
    textAlign: 'center'
  },

});

*/