import { Password } from "./password";
import { UserName } from "./user-name"

export type Credentials = {
  username: UserName;
  password: Password;
}