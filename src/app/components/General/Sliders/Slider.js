import React, {Component} from 'react';
import $ from 'jquery';
import '../../../../assets/semantic-ui/components/range.js';
import '../../../../assets/semantic-ui/components/range.css';

export class Slider extends Component {
  state ={
    maxed: true
  }
  componentWillMount() {
    const {start, max} = this.props;

    if (start && start < max) {
      this.setState({maxed: false});
    }
  }
  componentDidMount() {
    const {name, min, max, step, onChange} = this.props;
    let {className, start} = this.props;

    if (!start) {
      start = max;
    }

    className = `${className.split(' ').join('.')}`;

    $(`.ui.${className}.range`).range({
      onChange: value => {
        // If the value is over the limit
        if (value >= max) {
          // Set the state to maxed
          this.setState({maxed: true});

          // Reset the input
          $(`.slider.field input[name=${name}]`).val('');
        } else if (this.state.maxed) {
          // Otherwise if the state is maxed, set it so that it isn't
          this.setState({maxed: false});
        }

        // If the value does not exist, or less than 0, reset it to 0
        if (!value || value < 0) {
          value = 0;
        }

        if (onChange) {
          onChange(value, this.state.maxed);
        }
      },
      input: `.slider.field input[name=${name}]`,
      min,
      max,
      start,
      step
    });
  }
  render() {
    const {className, label, name} = this.props;

    return (
      <div className="slider field">
        {label &&
          <label>{label}</label>
        }
        <div className={className ? `ui range ${className}` : 'ui range'}></div>
        <input name={name} type="text" className="hidden"/>
      </div>
    );
  }
}

Slider.propTypes = {
  onChange: React.PropTypes.func,
  name: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  className: React.PropTypes.string.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  start: React.PropTypes.string,
  step: React.PropTypes.number
};
