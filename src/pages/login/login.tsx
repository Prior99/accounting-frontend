import * as React from "react";
import { connect } from "../../utils";
import { Store } from "../../store";
import * as style from "./login.scss";
import { Grid, Segment, Input, Button, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { routeSignup } from "../../routing";

export interface PageLoginProps {
    readonly loggedIn: boolean;
}

function mapStoreToProps(store: Store): PageLoginProps {
    const { loggedIn } = store.login;
    return { loggedIn };
}

export function StrippedPageLogin(props: PageLoginProps) {
    return (
        <Grid className={style.container} centered verticalAlign="middle" style={{ margin: 0 }}>
            <Grid.Column stretched className={style.column}>
                <h1 className={style.title}>No Books</h1>
                <Segment stacked>
                    <Form size="large">
                        <Form.Field>
                            <Input size="large" icon="user" iconPosition="left" focus placeholder="Username" />
                        </Form.Field>
                        <Form.Field>
                            <Input
                                size="large"
                                icon="lock"
                                type="password"
                                iconPosition="left"
                                focus
                                placeholder="Password"
                            />
                        </Form.Field>
                        <Button submit fluid color="olive">Login</Button>
                    </Form>
                </Segment>
                <Segment tertiary>
                    No account yet? <Link to={routeSignup()}>Sign up.</Link>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export const PageLogin = connect(StrippedPageLogin, mapStoreToProps);
