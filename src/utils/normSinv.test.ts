import { normSinv } from './normSinv';

/**
 * Expected values are from Excel's NORM.S.INV function.
 */
test('gets the inverse of standard normal cumulative distribution', () => {
  const randomValuesTestArray = [
    0.296694870605894,
    0.279680326751622,
    0.853271701727797,
    0.69306737230965,
    0.161196456935518,
    0.985188407160825,
    0.581885716265265,
    8.33282215968913e-2,
    0.511172862727826,
    0.457656632902557,
    0.612517212448199,
    0.729196831437739,
    0.210962776440891,
    0.99075579998327,
    0.246091026024186,
    // Edge cases
    0.999999999,
    0.000000001
  ];
  const expectedResultArray = [
    -0.533930323858675,
    -0.58379141702191,
    1.05056897492446,
    0.504563779217039,
    -0.989552465165099,
    2.17509249607872,
    0.206719961014697,
    -1.38302746974291,
    0.028009875730481,
    -0.106339155870965,
    0.285885819467423,
    0.610385702261433,
    -0.803085093552304,
    2.35568878233865,
    -0.686842392910744,
    // Edge cases
    5.99780701960164,
    -5.99780701500769
  ];

  for (let i = 0; i < randomValuesTestArray.length; i++) {
    expect(normSinv(randomValuesTestArray[i])).toBeCloseTo(
      expectedResultArray[i],
      8
    );
  }
});
