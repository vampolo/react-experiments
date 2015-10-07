import Component from 'react-pure-render/component';
import DocumentTitle from 'react-document-title';
import React, {PropTypes} from 'react';
import Griddle from 'griddle-react';
import {Button} from 'react-bootstrap';

const columns = ['evt.num', 'evt.cpu', 'evt.dir', 'evt.type'];

export default class Sysdig extends Component {

  static propTypes = {
    actions: PropTypes.object,
    msg: PropTypes.object
  }

  componentDidMount() {
    const {actions} = this.props;
    actions.loadSysdigEvents();
  }

  render() {
    const {
        sysdig: {events: events}
    } = this.props;

      return (
        <DocumentTitle title={'something'}>
        <div className="sysdig-page">
              <Griddle
          columns={columns}
          results={events}
          showFilter={true}
          showSettings={true}
          enableInfiniteScroll={true}
          useFixedHeader={true}
          bodyHeight={400}
              />

          <Button>button shit</Button>
       </div>
      </DocumentTitle>
    );
  }

}
