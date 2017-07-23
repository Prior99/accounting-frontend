import * as React from "react";
import { connect } from "utils";
import { Store } from "store";
import * as style from "./signup.scss";
import { Grid, Segment, Input, Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { routeLogin } from "routing";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import bind from "bind-decorator";
import { validateEMail, validatePassword } from "utils";
import { translate, InjectedTranslateProps } from "react-i18next";
import { RequestStatus } from "request-status";
import { StatusMessage } from "./status-message";

export interface PageSignupProps {
    status: RequestStatus;
    onSignup: (email: string, password: string) => {};
}

export function mapStoreToProps(store: Store): PageSignupProps {
    const { status, onSignup } = store.signup;
    return { status, onSignup };
}

@translate(["signup", "common"])
@observer
export class StrippedPageSignup extends React.Component<PageSignupProps & InjectedTranslateProps, undefined> {
    @observable private email = "";
    @observable private password = "";
    @observable private repeat = "";

    @bind @action
    private handleEMail({ target }: React.SyntheticEvent<HTMLInputElement>) {
        this.email = (target as HTMLInputElement).value;
    }

    @bind @action
    private handlePassword({ target }: React.SyntheticEvent<HTMLInputElement>) {
        this.password = (target as HTMLInputElement).value;
    }

    @bind @action
    private handleRepeat({ target }: React.SyntheticEvent<HTMLInputElement>) {
        this.repeat = (target as HTMLInputElement).value;
    }

    @bind
    private handleSubmit() { this.props.onSignup(this.email, this.password); }

    @computed
    private get emailValid() { return validateEMail(this.email); }

    @computed
    private get passwordValid() { return validatePassword(this.password) && this.password === this.repeat; }

    @computed
    private get allValid() { return this.emailValid && this.passwordValid; }

    public render() {
        const { t, status } = this.props;
        return (
            <Grid className={style.container} centered verticalAlign="middle" style={{ margin: 0 }}>
                <Grid.Column stretched className={style.column}>
                    <h1 className={style.title}>{t("common:appName")}</h1>
                    <StatusMessage status={status} />
                    <Segment stacked>
                        <Form size="large" onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <Input
                                    size="large"
                                    icon="user"
                                    iconPosition="left"
                                    focus
                                    placeholder={t("email")}
                                    value={this.email}
                                    error={!this.emailValid}
                                    onChange={this.handleEMail}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    size="large"
                                    icon="lock"
                                    type="password"
                                    iconPosition="left"
                                    focus
                                    placeholder={t("password")}
                                    value={this.password}
                                    error={!this.passwordValid}
                                    onChange={this.handlePassword}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    size="large"
                                    icon="repeat"
                                    type="password"
                                    iconPosition="left"
                                    focus
                                    placeholder={t("repeat")}
                                    value={this.repeat}
                                    error={!this.passwordValid}
                                    onChange={this.handleRepeat}
                                />
                            </Form.Field>
                            <Button type="submit" fluid color="olive" disabled={!this.allValid}>{t("signup")}</Button>
                        </Form>
                    </Segment>
                    <Segment tertiary>
                        {t("haveAccount")} <Link to={routeLogin()}>{t("login")}.</Link>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export const PageSignup = connect(StrippedPageSignup, mapStoreToProps);
