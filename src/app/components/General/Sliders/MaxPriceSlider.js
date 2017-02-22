import React, {Component} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import {ADVANCED_SETTINGS_MAX_PRICE} from '../../../constants/constants';
import {Slider} from './Slider';

class MaxPriceSlider extends Component {
  constructor(props) {
    super(props);
    this.handleSliderOnChange = this.handleSliderOnChange.bind(this);

    this.state = {
      sliderValue: `${ADVANCED_SETTINGS_MAX_PRICE}+`
    };
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
        name="maxPrice"
        onChange={this.handleSliderOnChange}
        label={formatMessage({id: 'masthead.maxPriceLabel'}, {price: sliderValue})}
        className={`maxPrice ${colour}`}
        min={0}
        max={ADVANCED_SETTINGS_MAX_PRICE}
        start={defaultValue}
        />
    );
  }
}

MaxPriceSlider.propTypes = {
  intl: intlShape.isRequired,
  colour: React.PropTypes.string.isRequired,
  defaultValue: React.PropTypes.string
};

export default injectIntl(MaxPriceSlider);
