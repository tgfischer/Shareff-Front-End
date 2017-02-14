import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import validator from 'validator';
import {Container, Grid, Header, Icon, Image, Segment} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import NavBar from '../General/NavBar';
import {Loading} from '../General/Loading';
import PageHeaderSegment from '../General/PageHeaderSegment';
import {DataTableSemantic} from '../General/DataTableSemantic';
import {getTargetUser} from '../../actions/user';
import {BASE_URL} from '../../constants/constants';

const styles = {
  wrapper: {
    height: '100%'
  },
  container: {
    paddingTop: '2em'
  }
};

class User extends Component {
  state = {
    err: null
  }
  constructor(props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
  }
  componentWillMount() {
    const {dispatch, params} = this.props;
    const {userId} = params;

    dispatch(getTargetUser(userId)).then(({err}) => {
      if (err) {
        this.setState({err});
      }
    });
  }
  handleCloseModal = () => this.setState({err: null})
  handleRowClick(e, row) {
    e.preventDefault();

    this.props.router.push(`/listings/${row.itemId}`);
  }
  render() {
    const {targetUser, targetItems, intl} = this.props;
    const {formatMessage} = intl;
    const {unescape} = validator;
    const columns = [
      {data: 'itemId', visible: false, searchable: false},
      {data: 'costPeriod', visible: false, searchable: false},
      {data: 'title', title: formatMessage({id: 'user.columns.title'})},
      {data: 'category', title: formatMessage({id: 'user.columns.category'})},
      {
        data: 'price',
        title: formatMessage({id: 'user.columns.price'}),
        render: (data, type, {costPeriod}) => {
          return `$${data} per ${costPeriod}`;
        }
      }
    ];

    return (
      <div style={styles.wrapper}>
        {targetUser ?
          <div>
            <NavBar/>
            <PageHeaderSegment
              breadcrumbs={[{
                text: formatMessage({id: 'breadcrumb.home'}),
                to: '/'
              }, {
                text: formatMessage({id: 'user.title'}, {
                  firstName: unescape(targetUser.firstName),
                  lastName: unescape(targetUser.lastName)
                })
              }]}
              title={formatMessage({id: 'user.title'}, {
                firstName: unescape(targetUser.firstName),
                lastName: unescape(targetUser.lastName)
              })}
              colour="blue"
              />
            <Container style={styles.container}>
              <Grid stackable>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Image src={BASE_URL + targetUser.photoUrl} shape="rounded" bordered fluid/>
                    <Header as="h3">
                      <Icon name="thumbs up"/>
                      <Header.Content>
                        <FormattedMessage id="user.ratingTitle"/>
                        <Header.Subheader>
                          {!targetUser.avgRating &&
                            <i>
                              <FormattedMessage id="user.noAvgRating" values={{firstName: targetUser.firstName}}/>
                            </i>
                          }
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                    <Header as="h3">
                      <Icon name="home"/>
                      <Header.Content>
                        <FormattedMessage id="user.locationTitle"/>
                        <Header.Subheader>
                          {targetUser.line1} {targetUser.line2}, {targetUser.city} {targetUser.province}, {targetUser.postalCode}
                        </Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Grid.Column>
                  <Grid.Column width={12} stretched>
                    <Segment>
                      <Grid stackable>
                        <Grid.Row>
                          <Grid.Column>
                            <Header as="h1" dividing>
                              <FormattedMessage id="user.description"/>
                            </Header>
                            {targetUser.description &&
                              <p>{unescape(targetUser.description)}</p>
                            }
                            {!targetUser.description &&
                              <p>
                                <i>
                                  <FormattedMessage id="user.noDescriptionProvided"/>
                                </i>
                              </p>
                            }
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column>
                            <Header as="h1" dividing>
                              <FormattedMessage id="user.itemsTitle"/>
                              {targetItems && targetItems.length > 0 &&
                                <Header.Subheader>
                                  <FormattedMessage id="user.itemsSubTitle"/>
                                </Header.Subheader>
                              }
                            </Header>
                            {targetItems && targetItems.length > 0 &&
                              <DataTableSemantic
                                rows={targetItems}
                                columns={columns}
                                onRowClick={this.handleRowClick}
                                {...this.props}
                                />
                            }
                            {(!targetItems || targetItems.length === 0) &&
                              <p>
                                <i>
                                  <FormattedMessage id="user.noRentalItems"/>
                                </i>
                              </p>
                            }
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div> :
          <Loading/>
        }
      </div>
    );
  }
}

User.propTypes = {
  intl: intlShape.isRequired,
  params: React.PropTypes.object.isRequired,
  err: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired,
  user: React.PropTypes.object,
  targetUser: React.PropTypes.object,
  targetItems: React.PropTypes.array,
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, targetUser, targetItems, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    targetUser,
    targetItems,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(User)));
