import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {Button, Container, Form, Grid, Header, Segment} from 'semantic-ui-react';
import NavBar from './NavBar';
import PageHeaderSegment from './PageHeaderSegment';
import {getUser} from '../../actions/myComponent';

class MyComponent extends Component {
  state = {
    user: null
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    const {dispatch} = this.props;
    dispatch(getUser("3")).then(({user}) => this.setState({user}));
  }
  render() {
    const {intl, isFetching} = this.props;
    const {user} = this.state;
    const {formatMessage} = intl;

    const breadcrumbs = [{
      to: '/',
      text: formatMessage({id: 'breadcrumb.home'})
    }, {
      text: formatMessage({id: 'breadcrumb.myComponent'})
    }];

    const styles = {
      container: {
        marginTop: '1.5em'
      }
    };

    return (
      <div>
        <NavBar/>
        <PageHeaderSegment
          breadcrumbs={breadcrumbs}
          title={formatMessage({id: 'myComponent.title'})}
          colour="red"
          />

        <Container style={styles.container}>
          <Segment loading={isFetching}>
            <Grid stackable>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Form onSubmit={this.handleSubmit} size="huge">
                    <Header size="huge">
                      <FormattedMessage id="myComponent.header"/>
                      <Header.Subheader>
                        <FormattedMessage id="myComponent.subHeader"/>
                      </Header.Subheader>
                    </Header>

                    {user &&
                      <p>{user.firstName}</p>
                    }

                    <Button size="huge" color="blue" type="submit">
                      <FormattedMessage id="myComponent.getUserButton"/>
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
  }
}

MyComponent.propTypes = {
  intl: intlShape.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  isFetching: React.PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(MyComponent)));
