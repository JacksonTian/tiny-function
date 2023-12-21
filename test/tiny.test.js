import assert from 'assert';
import { createFunction, read } from '../lib/tiny.js';

const fun = createFunction(async (req, res) => {
    res.writeHead(200);
    const body = await read(req, 'utf8');
    res.end(body);
});

describe('tiny', () => {

    before(async () => {
        await fun.start();
    });

    after(async () => {
        await fun.stop();
    });

    it('should ok', async function () {
        const { body } = await fun.call({
            message: 'Hello world!'
        });
        assert.deepStrictEqual(body, JSON.stringify({
            message: 'Hello world!'
        }));
    });

});
