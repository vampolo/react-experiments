import Component from '../components/component.react';
import DocumentTitle from 'react-document-title';
import React from 'react';
import {FormattedHTMLMessage} from 'react-intl';
import {Link} from 'react-router';
import Griddle from 'griddle-react';

const columns = ['evt.num', 'evt.cpu', 'evt.dir', 'evt.type'];

export default class Index extends Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired
  };

  componentDidMount() {
      const {actions} = this.props;
      actions.sysdig.loadData();
  }

  render() {
    const {
        sysdig: {data: {events : events}},
        msg: {sysdig: msg}
    } = this.props;

      return (
      <DocumentTitle title={msg.title}>
        <div className="home-page">
            <Griddle
        columns={columns}
        results={events}
        showFilter={true}
        showSettings={true}
        enableInfiniteScroll={true}
        useFixedHeader={true}
        bodyHeight={400}/>
       </div>
      </DocumentTitle>
    );
  }

}
