import React, {Component} from 'react';
import {intlShape, injectIntl} from 'react-intl';
import {ADVANCED_SETTINGS_MAX_PRICE} from '../../../constants/constants';
import {Slider} from './Slider';

class MaxPriceSlider extends Component {
  state ={
    sliderValue: `${ADVANCED_SETTINGS_MAX_PRICE}+`
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
    const {intl} = this.props;
    const {sliderValue} = this.state;
    const {formatMessage} = intl;

    return (
      <Slider
        name="maxPrice"
        onChange={this.handleSliderOnChange}
        label={formatMessage({id: 'masthead.priceRange'}, {price: sliderValue})}
        className="blue"
        min={0}
        />
    );
  }
}

MaxPriceSlider.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(MaxPriceSlider);
