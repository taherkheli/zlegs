import { expect, Locator, Page } from "@playwright/test";
import { Credentials } from "../shared/types/credentials";
import { UserName } from "../shared/types/user-name";
import { Password } from "../shared/types/password";

export default class Login {
  private _page: Page;
  private _credentials: Credentials;

  constructor(page: Page, credentials: Credentials) {
    this._page = page;
    this._credentials = credentials;
    this.getUserName();
    this.getPassword();    
  }

  async attempt(): Promise<void> {
    await this._page.goto(this._url);
    await this._page.fill(this._userNameField, this._userName);
    await this._page.fill(this._passwordField, this._password);
    await this._page.click(this._loginBtn);

    switch (this._credentials.username) {
      case UserName.Blank:
        await this.verifyText(this._errorMsg, 'Username is required');
        break;
      
      case UserName.Invalid:
        if (this._credentials.password == Password.Blank) {
          await this.verifyText(this._errorMsg, 'Password is required');
        }
        if (this._credentials.password == Password.Wrong) {
          await this.verifyText(this._errorMsg, 'Username and password do not match any user in this service');
        }
        break;

      case UserName.Standard:
      case UserName.LockedOut:
      case UserName.WithProblem:
      case UserName.WithPerformanceGlitch:
        if (this._credentials.password == Password.Blank) {
          await this.verifyText(this._errorMsg, 'Password is required');
        }
        else if (this._credentials.password == Password.Wrong) {
          await this.verifyText(this._errorMsg, 'Username and password do not match any user in this service');
        }
        else if ((this._credentials.username == UserName.LockedOut) && (this._credentials.password == Password.Correct)) {
          await this.verifyText(this._errorMsg, 'Sorry, this user has been locked out.');
        }
        else if (this._credentials.password == Password.Correct) {    

          const loc = this._page.locator(this._productsHeader);
          await loc.waitFor();
          const text = await loc.textContent();
          await expect(loc).toHaveText('Products');
                            
          if (this._credentials.username == UserName.WithProblem) {   
            expect(await this._page.locator(this._item0Image).getAttribute('src')).toContain('WithGarbageOnItToBreakTheUrl');
          }
        }
        break;
    }

    if ( !(this._credentials.password == Password.Correct && this._credentials.username != UserName.LockedOut)) {
      await this._page.click(this._errorBtn);  
    }  
  }

  private async verifyText(selector: string, text: string, timeOut_s = 8) {
    const el = await this._page.waitForSelector(selector + ' >> text=' + text, { timeout: timeOut_s * 1000 });
    expect(await el.innerText()).toContain(text);
  }

  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
  }

  private getPassword() {
    switch (this._credentials.password) {
      case Password.Blank:
        this._password = '';
        break;  
      
      case Password.Wrong:
        this._password = this.generateRandomString(12);;
        break;  

      case Password.Correct:
        this._password = 'secret_sauce';
        break;  
    }
  }

  private getUserName(): void {  
    switch (this._credentials.username) {
      case UserName.Blank:
        this._userName = '';
        break;  

      case UserName.Invalid:
        this._userName = this.generateRandomString(12);
        break;  

      case UserName.Standard:
        this._userName = 'standard_user';
        break;  

      case UserName.LockedOut:
        this._userName = 'locked_out_user';
        break;  

      case UserName.WithProblem:
        this._userName = 'problem_user';
        break;  

      case UserName.WithPerformanceGlitch:
        this._userName = 'performance_glitch_user';
        break;
      } 
  }

  private readonly _url  = 'https://www.saucedemo.com/v1/index.html';
  private _userName = '';
  private _password = '';

  //#region Selectors
  private readonly _errorBtn            = '.error-button';
  private readonly _errorMsg            = 'h3';
  private readonly _item0Image          = '#item_0_img_link>img';  
  private readonly _loginBtn            = '#login-button';
  private readonly _passwordField       = '#password';
  private readonly _productsHeader      = '.product_label';
  private readonly _userNameField       = '#user-name';
  //#endregion
}