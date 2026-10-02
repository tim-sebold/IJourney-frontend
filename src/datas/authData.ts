export const loginData = {
    formFields: [
        {
            id: "email",
            label: "E - Mail Address*",
            placeholder: "",
            type: "email",
        },
        {
            id: "password",
            label: "Password *",
            placeholder: "",
            type: "password",
        }
    ]
}

export const registerData = {
    formFields: [
        {
            id: "name",
            // Printed on the certificate, so it asks for a name, not a handle.
            label: "Your Name*",
            placeholder: "As it should appear on your certificate",
            type: "text",
        },
        {
            id: "email",
            label: "E - Mail Address*",
            placeholder: "",
            type: "email",
        },
        {
            id: "password",
            label: "Password *",
            placeholder: "",
            type: "password",
        },
        {
            id: "confirmPassword",
            label: "Confirm Password *",
            placeholder: "",
            type: "password",
        },
        {
            id: "schoolCode",
            label: "School Code (optional)",
            placeholder: "From your teacher — leave blank if you don't have one",
            type: "text",
        }
    ]
}