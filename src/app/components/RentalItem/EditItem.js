import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import validator from 'validator';
import {Form, Grid, Image, Label, Segment, Container, Button} from 'semantic-ui-react';
import NavBar from '../General/NavBar';
import PageHeaderSegment from '../General/PageHeaderSegment';
import {Loading} from '../General/Loading';
import {intlShape, injectIntl} from 'react-intl';
import {getRentalItem, removeMyItem} from '../../actions/rentalItem';
import {getUser} from '../../actions/auth';
import {getOptions} from '../../utils/Utils';
import {DraftEditor} from '../General/DraftEditor';
import {BASE_URL, categories, costPeriods} from '../../constants/constants';

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.getCategories = this.getCategories.bind(this);
    this.handleRequestToRemoveButton = this.handleRequestToRemoveButton.bind(this);
  }

  componentWillMount() {
    // Fetch the rental item using the item ID in the params
    const {itemId} = this.props.params;

    this.props.dispatch(getRentalItem(itemId)).then(() => {
      if (!this.props.user) {
        // Else if the user is authenticated
        const token = localStorage.getItem('token');
        this.props.dispatch(getUser(token));
      }
    });
  }

  handleRequestToRemoveButton() {
    console.log("Remove current item");
     // Fetch the rental item using the item ID in the params
    const {itemId} = this.props.params;
    const {userId} = this.props.user;
    this.props.dispatch(removeMyItem({itemId, userId}));
    console.log("Removed item completed.");
    this.props.router.push(`/profile/my-items`);
  }

  getCategories(categories) {
    const {formatMessage} = this.props.intl;

    return (
      <Label.Group size="large">
        {categories.map((category, i) => {
          return (
            <Label key={i} className="dark blue">
              {formatMessage({id: category})}
            </Label>
          );
        })}
      </Label.Group>
    );
  }

  render() {
    const {rentalItem, user, intl} = this.props;
    const {formatMessage} = intl;
    const {title, price, category, description, termsOfUse} = rentalItem;
    const {unescape} = validator;
    const breadcrumbs = [{
      text: formatMessage({id: 'breadcrumb.home'}),
      to: '/'
    }];

    return (
      <div>
        {rentalItem && user ?
          <div>
            <NavBar/>
            <PageHeaderSegment
              breadcrumbs={breadcrumbs}
              title={unescape(rentalItem.title)}
              subTitle={this.getCategories(rentalItem.category)}
              colour="blue"
              action={{
                handleButtonClick: this.handleRequestToRemoveButton,
                buttonText: formatMessage({id: 'editItem.removeItemButton'}),
                isButtonInverted: true
              }}
              />
            <Segment>
              <Container>
                <Form size="huge">
                  <Grid verticalAlign="middle">
                    <Grid.Row>
                      <Grid.Column width={6}>
                        <Image src={BASE_URL + rentalItem.photo[0]} shape="rounded" bordered/>
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Form.Field>
                          <Form.Input
                            label={formatMessage({id: 'addItem.title'})}
                            name="title"
                            placeholder=""
                            defaultValue={title || ''}
                            type="text"
                            required
                            />
                        </Form.Field>
                        <Form.Field>
                          <Form.Select
                            label={formatMessage({id: 'addItem.category'})}
                            placeholder=""
                            defaultValue={category[0]}
                            options={getOptions({values: categories, intl})}
                            required
                            />
                        </Form.Field>
                        <Form.Group widths="equal">
                          <Form.Field>
                            <Form.Input
                              icon="dollar"
                              iconPosition="left"
                              label={formatMessage({id: 'addItem.price'})}
                              name="price"
                              placeholder=""
                              defaultValue={price || ''}
                              type="number"
                              required
                              />
                          </Form.Field>
                          <Form.Field>
                            <Form.Select
                              name="costPeriod"
                              label={formatMessage({id: 'addItem.costPeriod'})}
                              placeholder=""
                              defaultValue={rentalItem.costPeriod}
                              options={getOptions({values: costPeriods, intl})}
                              required
                              />
                          </Form.Field>
                        </Form.Group>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <DraftEditor
                          label={formatMessage({id: 'addItem.description'})}
                          name="description"
                          placeholder={unescape(description)}
                          required
                          />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <DraftEditor
                          label={formatMessage({id: 'addItem.terms'})}
                          name="terms"
                          placeholder={unescape(termsOfUse)}
                          required
                          />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Button
                          content={formatMessage({id: 'editItem.saveChangesButton'})}
                          size="huge"
                          type="submit"
                          icon="save"
                          labelPosition="right"
                          primary
                          />
                        <Button
                          content={formatMessage({id: 'editItem.cancelButton'})}
                          size="huge"
                          onClick={this.handleRequestToRemoveButton}
                          icon="remove"
                          labelPosition="right"
                          primary
                          />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Form>
              </Container>
            </Segment>
          </div> :
          <Loading/>
        }
      </div>
    );
  }
}

EditItem.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  router: React.PropTypes.object,
  rentalItem: React.PropTypes.object,
  err: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
  params: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, rentalItem, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    rentalItem,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(EditItem)));
