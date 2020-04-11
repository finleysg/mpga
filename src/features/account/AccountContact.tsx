import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";

import { IApplicationState } from "../../store";
import UserActions from "../../store/UserActions";

const AccountContact: React.FC = () => {
    const dispatch = useDispatch();
    const session = useSelector((state: IApplicationState) => state.session);

    const updateContact = (event: any) => {
        console.log(event);
        dispatch(UserActions.UpdateContact(session.contact?.id!, { send_email: event.target.checked }));
    };

    return (
        <div>
            <Row>
                <Col xs={12}>
                    <Form.Check
                        name="sendEmail"
                        // value={session.contact?.sendEmail.toString()}
                        checked={session.contact?.sendEmail}
                        label="Send me newsletters and tournament updates."
                        onChange={(e: any) => updateContact(e)}
                    />
                    <p className="text-muted">
                        The MPGA will never share you email address with any other organization. The setting above is
                        strictly for communications from us that may be of interest to our players and member clubs.
                    </p>
                </Col>
            </Row>
        </div>
    );
};

export default AccountContact;
