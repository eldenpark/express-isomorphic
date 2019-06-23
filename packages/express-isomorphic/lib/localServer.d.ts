import { Extend, ServerCreation } from './createExpress';
declare const localServer: LocalServer;
export default localServer;
interface LocalServer {
    <State>(arg: {
        extend?: Extend<State>;
        makeHtmlPath: any;
    }): ServerCreation<State>;
}
