"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_hot_loader_1 = require("react-hot-loader");
const React = __importStar(require("react"));
const Universal_1 = __importDefault(require("../universal/Universal"));
const ClientApp = ({ universalState, }) => {
    // const { UniversalContext } = Universal.contexts;
    return (
    // <UniversalContext.Provider value={universalState}>
    React.createElement(Universal_1.default, null)
    // </UniversalContext.Provider>
    );
};
exports.default = react_hot_loader_1.hot(module)(ClientApp);
