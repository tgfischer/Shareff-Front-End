import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Grid, Header, Image, Item} from 'semantic-ui-react';
import {intlShape, injectIntl, FormattedMessage} from 'react-intl';
import {DataTableSemantic} from '../General/DataTable';

class MyItem extends Component {
  render() {
    const columns = ["Name", "Position", "Office", "Age", "Start Date", "Salary"];
    const itemlist = [
      {"Name": "Tiger Nixon", "Position": "System Architect", "Office": "Edinburgh", "Age": 61, "Start Date": "2011/04/25", "Salary": "$320,800"},
      {"Name": "Shaohao", "Position": "Software Engineer", "Office": "London", "Age": 23, "Start Date": "2017/04/25", "Salary": "$100,000"},
      {"Name": "Tiger Nixon", "Position": "System Architect", "Office": "Edinburgh", "Age": 61, "Start Date": "2011/04/25", "Salary": "$320,800"},
      {"Name": "Tiger Nixon", "Position": "System Architect", "Office": "Edinburgh", "Age": 61, "Start Date": "2011/04/25", "Salary": "$320,800"},
      {"Name": "Tiger Nixon", "Position": "System Architect", "Office": "Edinburgh", "Age": 61, "Start Date": "2011/04/25", "Salary": "$320,800"},
      {"Name": "Tiger Nixon", "Position": "System Architect", "Office": "Edinburgh", "Age": 61, "Start Date": "2011/04/25", "Salary": "$320,800"},
      {"Name": "Tiger Nixon", "Position": "System Architect", "Office": "Edinburgh", "Age": 61, "Start Date": "2011/04/25", "Salary": "$320,800"},
      {"Name": "Shaohao", "Position": "Software Engineer", "Office": "London", "Age": 23, "Start Date": "2017/04/25", "Salary": "$100,000"},
      {"Name": "Tiger Nixon", "Position": "System Architect", "Office": "Edinburgh", "Age": 61, "Start Date": "2011/04/25", "Salary": "$320,800"},
      {"Name": "Shaohao", "Position": "Software Engineer", "Office": "London", "Age": 23, "Start Date": "2017/04/25", "Salary": "$100,000"},
      {"Name": "Tiger Nixon", "Position": "System Architect", "Office": "Edinburgh", "Age": 61, "Start Date": "2011/04/25", "Salary": "$320,800"},
      {"Name": "Shaohao", "Position": "Software Engineer", "Office": "London", "Age": 23, "Start Date": "2017/04/25", "Salary": "$100,000"},
      {"Name": "Shaohao", "Position": "Software Engineer", "Office": "London", "Age": 23, "Start Date": "2017/04/25", "Salary": "$100,000"},
      {"Name": "Shaohao", "Position": "Software Engineer", "Office": "London", "Age": 23, "Start Date": "2017/04/25", "Salary": "$100,000"},
      {"Name": "Shaohao", "Position": "Software Engineer", "Office": "London", "Age": 23, "Start Date": "2017/04/25", "Salary": "$100,000"},
      {"Name": "Shaohao", "Position": "Software Engineer", "Office": "London", "Age": 23, "Start Date": "2017/04/25", "Salary": "$100,000"}
    ];
    const items = [{header: "Shaohao"}, {header: "David"}];

    return (
      <div>
        <DataTableSemantic items={itemlist} columns={columns}/>
        <Grid>
          <Grid.Column>
            <Header as="h1" dividing>
              <FormattedMessage id="myItem.title"/>
            </Header>
            <Item.Group divided>
              {items.map(item =>
                <Item key={item.header}>
                  <Item.Image size="tiny" src="http://semantic-ui.com/images/wireframe/image.png"/>
                  <Item.Content>
                    <Item.Header as="a">{item.header}</Item.Header>
                    <Item.Meta>Description</Item.Meta>
                    <Item.Description>
                      <Image src="http://semantic-ui.com/images/wireframe/short-paragraph.png"/>
                    </Item.Description>
                    <Item.Extra>Additional Details</Item.Extra>
                  </Item.Content>
                </Item>
              )}
            </Item.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

MyItem.propTypes = {
  intl: intlShape.isRequired,
  isAuthenticated: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  err: React.PropTypes.object,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const {reducers} = state;
  const {isAuthenticated, isFetching, user, err} = reducers;

  return {
    isAuthenticated,
    isFetching,
    user,
    err
  };
};

export default connect(mapStateToProps)(withRouter(injectIntl(MyItem)));
