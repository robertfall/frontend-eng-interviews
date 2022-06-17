import { equal } from 'assert';
import { formatDate } from './helpers';

describe('format date', () => {
    it.only('should correctly format a date', () => {
        const target  = new Date(2022, 5, 18);

        expect(formatDate(target)).toEqual('20220617');
    })
});