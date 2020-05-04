import { Formik } from "formik";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

import { Editor } from "@toast-ui/react-editor";

import CancelButton from "../../../components/CancelButton";
import Confirm from "../../../components/Confirm";
import DeleteButton from "../../../components/DeleteButton";
import SubmitButton from "../../../components/SubmitButton";
import { EventPolicy } from "../../../models/Events";
import { Policy } from "../../../models/Policies";

export interface IEventPolicyEditProps {
    policy: EventPolicy;
    Cancel: () => void;
    Save: (policy: EventPolicy) => void;
    Remove: (policy: EventPolicy) => void;
}

const schema = yup.object({
    name: yup.string().max(30).required(),
    title: yup.string().max(120).required(),
    description: yup.string().required(),
});

const EventPolicyEdit: React.FC<IEventPolicyEditProps> = (props) => {
    const editorRef = React.createRef<Editor>();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const policy = {
        id: props.policy.id || 0,
        policyId: props.policy.policy?.id || 0,
        name: props.policy.policy?.name || "",
        title: props.policy.policy?.title || "",
        description: props.policy.policy?.description || "",
    };

    const handleConfirmRemoveCancel = () => {
        setShowConfirmation(false);
    };

    const handleConfirmRemoveContinue = () => {
        setShowConfirmation(false);
        props.Remove(props.policy);
    };

    const saveEventPolicy = (values: any) => {
        const updatedPolicy = new Policy(values);
        updatedPolicy.policyType = "TN"; // Tournament policy
        updatedPolicy.description = editorRef.current?.getInstance().getMarkdown() || policy.description;
        const newModel = new EventPolicy({
            id: props.policy.id,
            event: props.policy.event,
            order: props.policy.order,
            policy: updatedPolicy,
        });
        props.Save(newModel);
    };

    return (
        <div>
            {policy.id > 0 && (
                <p className="text-muted">
                    Policies are typically shared between tournaments, so changes to this policy will be reflected in
                    elsewhere. If you need a policy unique to this event, consider adding a new policy and removing this
                    one.
                </p>
            )}
            <Formik validationSchema={schema} onSubmit={saveEventPolicy} initialValues={policy}>
                {({ handleSubmit, handleChange, handleBlur, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group controlId="policy.Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                placeholder="Unique policy name"
                                value={values.name}
                                isValid={touched.name && !errors.name}
                                isInvalid={!!errors.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                            <Form.Text className="text-muted">This name is not displayed on the website</Form.Text>
                        </Form.Group>
                        <Form.Group controlId="policy.Title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                name="title"
                                placeholder="Title"
                                value={values.title}
                                isValid={touched.title && !errors.title}
                                isInvalid={!!errors.title}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="policy.Description">
                            <Form.Label>Policy text</Form.Label>
                            <Editor
                                initialValue={values.description}
                                previewStyle="tab"
                                height="240px"
                                initialEditType="wysiwyg"
                                useCommandShortcut={true}
                                useDefaultHTMLSanitizer={true}
                                hideModeSwitch={true}
                                ref={editorRef}
                            />
                        </Form.Group>
                        <SubmitButton />
                        <DeleteButton canDelete={policy.id !== 0} OnDelete={() => setShowConfirmation(true)} />
                        <CancelButton canCancel={policy.id === 0} OnCancel={() => props.Cancel()} />
                    </Form>
                )}
            </Formik>
            <Confirm
                show={showConfirmation}
                titleText="Remove Policy?"
                messageText="Please confirm that we should remove this policy from the tournament."
                confirmText="Remove Policy"
                DoCancel={handleConfirmRemoveCancel}
                DoConfirm={handleConfirmRemoveContinue}
            />
        </div>
    );
};

export default EventPolicyEdit;
