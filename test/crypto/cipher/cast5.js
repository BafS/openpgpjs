const openpgp = typeof window !== 'undefined' && window.openpgp ? window.openpgp : require('../../../dist/openpgp');

const chai = require('chai');

const { util } = openpgp;
const { expect } = chai;

it('CAST-128 cipher test with test vectors from RFC2144', function (done) {
  function test_cast(input, key, output) {
    const cast5 = new openpgp.crypto.cipher.cast5(key);
    const result = util.bin2str(cast5.encrypt(input));

    return util.hexstrdump(result) === util.hexstrdump(util.bin2str(output));
  }

  const testvectors = [[[0x01,0x23,0x45,0x67,0x12,0x34,0x56,0x78,0x23,0x45,0x67,0x89,0x34,0x56,0x78,0x9A],[0x01,0x23,0x45,0x67,0x89,0xAB,0xCD,0xEF],[0x23,0x8B,0x4F,0xE5,0x84,0x7E,0x44,0xB2]]];

  for (let i = 0; i < testvectors.length; i++) {
    const res = test_cast(testvectors[i][1],testvectors[i][0],testvectors[i][2]);
    expect(res, 'vector with block ' + util.hexidump(testvectors[i][0]) +
                ' and key ' + util.hexidump(testvectors[i][1]) +
                ' should be ' + util.hexidump(testvectors[i][2])).to.be.true;
  }
  done();
});
