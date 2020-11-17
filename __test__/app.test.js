import {handleSubmit, plan_trip, trip_details_section} from '../src/client/js/handleSubmit';

import 'babel-polyfill';

describe('Given plan_trip, expect it to be defined', () => {
  test('It should be defined', async () => {
    expect(plan_trip).toBeDefined();
  });
});

describe('Given handleSubmit(), expect it to be a function', () => {
  test('It should be a function', async () => {
    expect(typeof handleSubmit).toBe("function");
  });
});

describe('Given trip_details_section, expect it to be defined', () => {
  test('It should be a defined', async () => {
    expect(trip_details_section).toBeDefined();
  });
});
