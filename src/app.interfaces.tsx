export interface Form {
    title: string;
    subtitle: string;
    action: string;
    method: "POST" | "GET" | "PUT" | "UPDATE"
    form: FormField[];
}

export interface FormField {
    name: string;
    label: string;
    type: "text" | "tel" | "email" | "password" | "textarea" | "checkbox" | "radio" | "select";
    attributes: FieldAttributes;
    values?: FieldValue[];
}

export interface FieldAttributes {
    [key: string]: string | number | boolean | null;
}

export interface FieldValue {
    value: string;
    display: string;
}