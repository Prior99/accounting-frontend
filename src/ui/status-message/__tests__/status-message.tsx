import "mocks/react-i18next";

import * as React from "react";
import { StatusMessage } from "../status-message";
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import { RequestStatus } from "request-status";

[RequestStatus.NONE, RequestStatus.FAIL, RequestStatus.SUCCESS, RequestStatus.IN_PROGRESS].forEach(status => {
    test(`\`StatusMessage\` is rendered correctly with the status being \`${status}\``, () => {
        const mounted = mount(
            <StatusMessage
                status={status}
                failHeadline={"failed.headline"}
                failContent={"failed.content"}
                successHeadline={"success.headline"}
                successContent={"success.content"}
                inProgressHeadline={"inProgress.headline"}
                inProgressContent={"inProgress.content"}
            />,
        );
        expect(toJson(mounted)).toMatchSnapshot();
    });
});
