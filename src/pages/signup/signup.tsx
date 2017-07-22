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

export interface PageSignupProps {
}

function mapStoreToProps(_: Store): PageSignupProps {
    return {};
}

@observer
export class StrippedPageSignup extends React.Component<PageSignupProps, undefined> {
    @observable private email = "";
    @observable private password = "";
    @observable private repeat = "";

    @bind @action
    private handleEMail({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) {
        this.email = currentTarget.value;
    }

    @bind @action
    private handlePassword({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) {
        this.password = currentTarget.value;
    }

    @bind @action
    private handleRepeat({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) {
        this.repeat = currentTarget.value;
    }

    @computed
    private get emailValid() { return validateEMail(this.email); }

    @computed
    private get passwordValid() { return validatePassword(this.password) && this.password === this.repeat; }

    @computed
    private get allValid() { return this.emailValid && this.passwordValid; }

    public render() {
        return (
            <Grid className={style.container} centered verticalAlign="middle" style={{ margin: 0 }}>
                <Grid.Column stretched className={style.column}>
                    <h1 className={style.title}>No Books</h1>
                    <Segment stacked>
                        <Form size="large">
                            <Form.Field>
                                <Input
                                    size="large"
                                    icon="user"
                                    iconPosition="left"
                                    focus
                                    placeholder="EMail"
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
                                    placeholder="Password"
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
                                    placeholder="Repeat"
                                    value={this.repeat}
                                    error={!this.passwordValid}
                                    onChange={this.handleRepeat}
                                />
                            </Form.Field>
                            <Button submit fluid color="olive" disabled={!this.allValid}>Signup</Button>
                        </Form>
                    </Segment>
                    <Segment tertiary>
                        Already have an account? <Link to={routeLogin()}>Login.</Link>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}


export const PageSignup = connect(StrippedPageSignup, mapStoreToProps);
