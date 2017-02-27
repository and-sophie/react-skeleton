import React from 'react';

import { mount, shallow } from 'enzyme';
import TestUtils from 'react-addons-test-utils'

import Root from '../../src/containers/Root';

describe('<Root />', () => {



  const render = sinon.spy(Root.prototype, "render")
  const root = shallow(<Root />);

  console.log(root.debug())

  it('should call render', () => {
    expect(render.calledOnce).to.be.true;
  })

  it('shows the welcome text', () => {
    expect(root.contains("Welcome to React!")).to.be.true
  });

});
