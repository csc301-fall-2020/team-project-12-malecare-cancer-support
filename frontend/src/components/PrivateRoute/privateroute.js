import React from "react";
import { CurUserContext } from "../../curUserContext";
import {Route, Redirect} from "react-router-dom";

class PrivateRoute extends React.Component {
    static contextType = CurUserContext;
    constructor(props) {
        super(props)
    }
    
    render() {
        const {component, ...rest} = this.props
        const Component = this.props.component
        const isLoggedIn = this.context.isLoggedIn()
        return (
            <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                <Component {...props} />
                ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
            />
        )
    }
}

PrivateRoute.contextType = CurUserContext;

export default PrivateRoute