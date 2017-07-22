import * as React from "react";
import { connect } from "utils";
import { Store } from "store";
import * as style from "./login.scss";
import { Grid, Segment, Input, Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { routeSignup } from "routing";
import { observable, action, computed } from "mobx";
import { observer } from "mobx-react";
import bind from "bind-decorator";
import { validateEMail, validatePassword } from "utils";
import { translate, InjectedTranslateProps } from "react-i18next";

export interface PageLoginProps {
}

function mapStoreToProps(_: Store): PageLoginProps {
    return {};
}

@observer
@translate(["login", "common"])
export class StrippedPageLogin extends React.Component<PageLoginProps & InjectedTranslateProps, undefined> {
    @observable private email = "";
    @observable private password = "";

    @bind @action
    private handleEMail({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) {
        this.email = currentTarget.value;
    }

    @bind @action
    private handlePassword({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) {
        this.password = currentTarget.value;
    }

    @computed
    private get emailValid() { return validateEMail(this.email); }

    @computed
    private get passwordValid() { return validatePassword(this.password); }

    @computed
    private get allValid() { return this.emailValid && this.passwordValid; }

    public render() {
        const { t } = this.props;
        return (
            <Grid className={style.container} centered verticalAlign="middle" style={{ margin: 0 }}>
                <Grid.Column stretched className={style.column}>
                    <h1 className={style.title}>{t("common:appName")}</h1>
                    <Segment stacked>
                        <Form size="large">
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
                            <Button submit fluid color="olive" disabled={!this.allValid}>{t("login")}</Button>
                        </Form>
                    </Segment>
                    <Segment tertiary>
                        {t("noAccount")} <Link to={routeSignup()}>{t("signup")}</Link>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}


export const PageLogin = connect(StrippedPageLogin, mapStoreToProps);
