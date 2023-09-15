export interface Form {
  multistep: boolean;
  title: string;
  backButtonText: string;
  nextButtonText: string;
  openButtonText: string;
  subtitle: string;
  submitButtonText: string;
  action: string;
  method: 'POST' | 'GET' | 'PUT' | 'UPDATE';
  form: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  description: string;
  type:
    | 'text'
    | 'tel'
    | 'email'
    | 'password'
    | 'textarea'
    | 'checkbox'
    | 'radio'
    | 'select';
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
