"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const Title = () => {
    return (React.createElement("div", null, "universal"));
};
const Header = () => {
    return (React.createElement("div", null,
        "[Header]",
        React.createElement(Title, null)));
};
exports.default = Header;
