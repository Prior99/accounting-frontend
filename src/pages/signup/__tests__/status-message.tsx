import "mocks/react-i18next";

import * as React from "react";
import { StatusMessage } from "../status-message";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { RequestStatus } from "request-status";

[RequestStatus.PENDING, RequestStatus.FAIL, RequestStatus.SUCCESS, RequestStatus.IN_PROGRESS].forEach(status => {
    test("`StatusMessage` is rendered correctly with the status being `PENDING`", () => {
        const mounted = mount(<StatusMessage status={status} />);
        expect(toJson(mounted)).toMatchSnapshot();
    });
});
