import { plan_trip, handleSubmit } from '../client/js/handleSubmit';
import 'babel-polyfill';

describe('Given plan_trip, expect it to be defined' , () => {
    test('It should be defined', async () => {
        expect(plan_trip).toBeDefined();
    });
});

describe('Given handleSubmit(), expect it to be a function' , () => {
    test('It should be a function', async () => {
        expect(typeof handleSubmit).toBe("function");
    });
});
