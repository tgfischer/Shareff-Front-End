import React, {Component} from 'react';
import {ADVANCED_SETTINGS_MAX_PRICE} from '../../constants/constants';
import $ from 'jquery';
import '../../../semantic-ui/components/range.js';
import '../../../semantic-ui/components/range.css';

export class Slider extends Component {
  state ={
    maxed: true
  }
  componentDidMount() {
    const {name, min, step, onChange} = this.props;
    let {max, start} = this.props;

    if (!max) {
      this.setState({maxed: true});
      max = ADVANCED_SETTINGS_MAX_PRICE;
    }

    if (!start) {
      start = max;
    }

    $('.ui.range').range({
      onChange: value => {
        // If the value is over the limit
        if (value >= ADVANCED_SETTINGS_MAX_PRICE) {
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
  className: React.PropTypes.string,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number,
  start: React.PropTypes.number,
  step: React.PropTypes.number
};
