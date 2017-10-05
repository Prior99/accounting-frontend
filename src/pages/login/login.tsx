import * as React from "react";
import { ApiStore } from "store";
import * as style from "./login.scss";
import { Grid, Segment, Input, Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as routes from "routing";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import { inject, external } from "tsdi";
import bind from "bind-decorator";
import { validateEMail, validatePassword } from "utils";
import { translate, InjectedTranslateProps } from "react-i18next";
import { RequestStatus } from "request-status";
import { StatusMessage } from "ui";

@translate(["login", "common"])
@external @observer
export class PageLogin extends React.PureComponent<InjectedTranslateProps> {
    @inject private api: ApiStore;

    @observable private email = "";
    @observable private password = "";

    @bind @action private handleEMail({ target }: React.SyntheticInputEvent) { this.email = target.value; }
    @bind @action private handlePassword({ target }: React.SyntheticInputEvent) { this.password = target.value; }
    @bind private handleSubmit() { this.api.doLogin(this.email, this.password); }

    @computed private get emailValid() { return validateEMail(this.email); }
    @computed private get passwordValid() { return validatePassword(this.password); }
    @computed private get allValid() { return this.emailValid && this.passwordValid; }

    public render() {
        const { t } = this.props;
        return (
            <Grid className={style.container} centered verticalAlign="middle" style={{ margin: 0 }}>
                <Grid.Column stretched className={style.column}>
                    <h1 className={style.title}>{t("common:appName")}</h1>
                    <StatusMessage
                        status={this.api.getRequestStatus("doLogin")}
                        failHeadline={t("loginFailed.headline")}
                        failContent={t("loginFailed.content")}
                        inProgressHeadline={t("loginInProgress.headline")}
                        inProgressContent={t("loginInProgress.content")}
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
                            <Button type="submit" fluid color="olive" disabled={!this.allValid}>
                                {t("login")}
                            </Button>
                        </Form>
                    </Segment>
                    <Segment tertiary>
                        {t("noAccount")} <Link to={routes.signup()}>{t("signup")}</Link>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}
