import * as React from "react";
import { Grid, Segment, Input, Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as routes from "routing";
import { observable, action, computed } from "mobx";
import { observer, inject } from "mobx-react";
import bind from "bind-decorator";
import { validateEMail, validatePassword } from "utils";
import { translate, InjectedTranslateProps } from "react-i18next";
import { RequestStatus } from "request-status";
import { StatusMessage } from "ui";
import { ApiStore, SignupStore } from "store";
import * as style from "./signup.scss";

type Props = { api?: ApiStore, signUp?: SignupStore} & InjectedTranslateProps;

@translate(["signup", "common"])
@inject("api", "signUp")
@observer
export class PageSignup extends React.PureComponent<Props> {
    @observable private email = "";
    @observable private password = "";
    @observable private repeat = "";

    @bind @action private handleEMail({ target }: React.SyntheticInputEvent) { this.email = target.value; }
    @bind @action private handlePassword({ target }: React.SyntheticInputEvent) { this.password = target.value; }
    @bind @action private handleRepeat({ target }: React.SyntheticInputEvent) { this.repeat = target.value; }
    @bind private handleSubmit() { this.props.signUp.doSignup(this.email, this.password); }

    @computed private get emailValid() { return validateEMail(this.email); }
    @computed private get passwordValid() { return validatePassword(this.password) && this.password === this.repeat; }
    @computed private get allValid() { return this.emailValid && this.passwordValid; }

    public render() {
        const { t, api } = this.props;
        return (
            <Grid className={style.container} centered verticalAlign="middle" style={{ margin: 0 }}>
                <Grid.Column stretched className={style.column}>
                    <h1 className={style.title}>{t("common:appName")}</h1>
                    <StatusMessage
                        status={api.getRequestStatus("doSignup")}
                        successHeadline={t("signupSuccess.headline")}
                        successContent={t("signupSuccess.content")}
                        failHeadline={t("signupFailed.headline")}
                        failContent={t("signupFailed.content")}
                        inProgressHeadline={t("signupInProgress.headline")}
                        inProgressContent={t("signupInProgress.content")}
                    />
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
                        {t("haveAccount")} <Link to={routes.login()}>{t("login")}.</Link>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}
