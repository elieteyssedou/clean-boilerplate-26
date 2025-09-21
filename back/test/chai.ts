import * as chai from 'chai';

import chaiAsPromised from 'chai-as-promised';
import sinonChai from 'sinon-chai';
// import chaiDatetime from 'chai-datetime';

// Chai plugins
chai.use(chaiAsPromised as Chai.ChaiPlugin);
chai.use(sinonChai);
// chai.use(chaiDatetime);

const { expect } = chai;
export default expect;
