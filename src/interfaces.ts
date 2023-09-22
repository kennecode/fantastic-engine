export interface FieldAttributes {
  required?: boolean | undefined | null;
  pattern?: string | null;
  [key: string]: any; // For additional properties
}

export interface FormField {
  name: string;
  type: string;
  label: string;
  description?: string;
  containerAttributes?: FieldAttributes;
  labelAttributes?: FieldAttributes;
  attributes?: FieldAttributes;
  options?: { value: string; label: string }[];
}

export interface FormButtonProps {
  text?: string;
  attributes?: FieldAttributes;
}

export interface Form {
  action?: string;
  method?: 'POST' | 'GET' | 'PUT' | 'UPDATE';
  backButton?: FormButtonProps;
  nextButton?: FormButtonProps;
  submitButton?: FormButtonProps;
  fields: FormField[];
}

export interface SplashButtonProps {
  text?: string;
  attributes?: FieldAttributes;
}

export interface SplashProps {
  // assuming splash properties here, as they aren't clearly defined in the provided code
  title?: string;
  message?: string;
  attributes?: FieldAttributes;
  button?: SplashButtonProps;
  [key: string]: any;
}

export interface OpenProps {
  text?: string;
  attributes?: FieldAttributes;
}

export interface AppProps {
  open: OpenProps;
  splash?: SplashProps;
  attributes?: FieldAttributes;
  form: Form;
}
