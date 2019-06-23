"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const UniversalContext_1 = __importDefault(require("../contexts/UniversalContext"));
const TransferredState = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("p", null, "[Transferred State]"),
        react_1.default.createElement(UniversalContext_1.default.Consumer, null, (value) => {
            console.log('[universal] predefinedState: %o', value); // eslint-disable-line
            return (react_1.default.createElement("div", null,
                react_1.default.createElement("span", null, "predefinedState value"),
                react_1.default.createElement("span", null, value.foo)));
        })));
};
exports.default = TransferredState;
