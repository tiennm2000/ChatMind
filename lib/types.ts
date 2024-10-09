export interface Topic {
  name: string;
  slug: string;
  desc: string;
  category: string;
  icon: string;
  aiPrompt: string;
  form: Form[];
}

export interface Form {
  label: string;
  name: string;
  field: string;
  required: boolean;
}
