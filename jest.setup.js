
import 'whatwg-fetch';
import 'setimmediate';
import { getEnvironmets } from './src/helpers/getEnvironmets'

require('dotenv').config({
    path: '.env.test'
})

jest.mock('./src/helpers/getEnvironmets', () => ({
    getEnvironmets: () => ({ ...process.env })
}))

