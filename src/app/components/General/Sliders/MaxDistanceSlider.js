import React, {Component} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import {ADVANCED_SETTINGS_MAX_DISTANCE} from '../../../constants/constants';
import {Slider} from './Slider';

class MaxDistanceSlider extends Component {
  state = {
    sliderValue: `${ADVANCED_SETTINGS_MAX_DISTANCE}+`
  }
  constructor(props) {
    super(props);
    this.handleSliderOnChange = this.handleSliderOnChange.bind(this);
  }
  handleSliderOnChange(value, maxed) {
    if (maxed) {
      this.setState({sliderValue: `${value}+`});
    } else {
      this.setState({sliderValue: `${value}`});
    }
  }
  render() {
    const {intl, defaultValue, colour} = this.props;
    const {sliderValue} = this.state;
    const {formatMessage} = intl;

    return (
      <Slider
        name="maxDistance"
        onChange={this.handleSliderOnChange}
        label={formatMessage({id: 'masthead.maxDistanceLabel'}, {distance: sliderValue})}
        className={`maxDistance ${colour}`}
        min={0}
        max={ADVANCED_SETTINGS_MAX_DISTANCE}
        start={defaultValue}
        />
    );
  }
}

MaxDistanceSlider.propTypes = {
  intl: intlShape.isRequired,
  colour: React.PropTypes.string.isRequired,
  defaultValue: React.PropTypes.string
};

export default injectIntl(MaxDistanceSlider);
