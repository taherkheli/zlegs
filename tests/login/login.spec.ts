import { test } from '@playwright/test';
import Login from '../../models/login/login';
import { Credentials } from '../../models/shared/types/credentials';
import { UserName } from '../../models/shared/types/user-name';
import { Password } from '../../models/shared/types/password';

test.describe('Login ', () => {

  test('attempt with a blank username and a blank password is OK', async ({ page }) => {    
    let creds: Credentials = {
      username: UserName.Blank,
      password: Password.Blank,
    };
    let login = new Login(page, creds);
    await login.attempt();
  });

  test('with an invalid username and a blank password is OK', async ({ page }) => {    
    let creds: Credentials = {
      username: UserName.Invalid,
      password: Password.Blank,
    };
    let login = new Login(page, creds);
    await login.attempt();
  });

  test('with a valid username and a blank password is OK', async ({ page }) => {    
    let creds: Credentials = {
      username: UserName.Standard,
      password: Password.Blank,
    };
    let login = new Login(page, creds);
    await login.attempt();
  });

  test('with a valid username and a wrong password is OK', async ({ page }) => {    
    let creds: Credentials = {
      username: UserName.LockedOut,
      password: Password.Wrong,
    };
    let login = new Login(page, creds);
    await login.attempt();
  });

  test('with an invalid username and a wrong password is OK', async ({ page }) => {    
    let creds: Credentials = {
      username: UserName.Invalid,
      password: Password.Wrong,
    };
    let login = new Login(page, creds);
    await login.attempt();
  });

  test('as standard-user with correct password is OK', async ({ page }) => {    
    let creds: Credentials = {
      username: UserName.Standard,
      password: Password.Correct,
    };
    let login = new Login(page, creds);
    await login.attempt();
  });

  test('as locked_out_user with correct password is OK', async ({ page }) => {    
    let creds: Credentials = {
      username: UserName.LockedOut,
      password: Password.Correct,
    };
    let login = new Login(page, creds);
    await login.attempt();
  });

  test('as problem-user with correct password is OK', async ({ page }) => {    
    let creds: Credentials = {
      username: UserName.WithProblem,
      password: Password.Correct,
    };
    let login = new Login(page, creds);
    await login.attempt();
  });

  test('as performance_glitch_user with correct password is OK', async ({ page }) => {    
    let creds: Credentials = {
      username: UserName.WithPerformanceGlitch,
      password: Password.Correct,
    };
    let login = new Login(page, creds);
    await login.attempt();
  });

});