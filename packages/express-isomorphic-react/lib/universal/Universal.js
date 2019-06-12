"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Header_1 = __importDefault(require("./components/Header"));
const TransferredState_1 = __importDefault(require("./components/TransferredState"));
const UniversalContext_1 = __importDefault(require("./contexts/UniversalContext"));
Promise.resolve().then(() => __importStar(require('./components/Later'))).then((Later) => {
    console.log('[express-isomorphic-react] Later is loaded');
})
    .catch((err) => console.error('error loading <Later />', err));
const Universal = ({ addPath, children, }) => {
    // const [ count, setCount ] = React.useState(0);
    // const handleClickButton = useMemo(
    //   () => {
    //     return () => {
    //       setCount(count + 1);
    //     };
    //   },
    //   [count],
    // );
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Header_1.default, null),
        react_1.default.createElement("div", null,
            "1",
            react_1.default.createElement("p", null, "[count]")),
        react_1.default.createElement(TransferredState_1.default, null),
        children));
};
exports.default = Universal;
Universal.contexts = {
    UniversalContext: UniversalContext_1.default,
};
