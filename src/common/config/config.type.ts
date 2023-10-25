export type AuthConfig = {
  secret?: string;
  expires?: string;
};

export type MailConfig = {
  port: number;
  host?: string;
  user?: string;
  password?: string;
  defaultEmail?: string;
  defaultName?: string;
  secure?: boolean;
};
