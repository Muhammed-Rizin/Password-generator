import { Component } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  length : number = 8
  close : boolean = true
  message : string = "Enter length between 8 to 100"
  error : boolean = false
  password !: string

  upperCase : boolean = false
  lowerCase : boolean = false
  number : boolean = false
  specialCharecter : boolean = false
  CharacterData : string = ""
  
  tooltipText : string = 'Copy to clipboard'


  generate(){
    this.CharacterData = ""
    if(this.length <= 100 && this.length >= 8) {
      const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
      const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numericChars = '0123456789';
      const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
      
      let password = ""

      if(
        !this.upperCase && !this.lowerCase && 
        !this.number  && !this.specialCharecter
      ){
        password = this.addValue(password, uppercaseChars)
        password = this.addValue(password, lowercaseChars)
        password = this.addValue(password, numericChars)
        password = this.addValue(password, specialChars)

        const remainingLength = this.length - password.length;
        for (let i = 0; i < remainingLength; i++) {
          const randomIndex = Math.floor(Math.random() * this.CharacterData.length);
          password += this.CharacterData[randomIndex];
        }
      }else {
        if(this.upperCase) {
          password += this.addValue(password, uppercaseChars)
        }
        if(this.lowerCase){
          password += this.addValue(password, lowercaseChars)
        }
        if(this.number){
          password += this.addValue(password, numericChars)
        }
        if(this.specialCharecter){
          password += this.addValue(password, specialChars)
        }

        const remainingLength = this.length - password.length;
        for (let i = 0; i < remainingLength; i++) {
          const randomIndex = Math.floor(Math.random() * this.CharacterData.length);
          password += this.CharacterData[randomIndex];
        }
      }
      this.password  = this.shuffleString(password);

      this.close = false
      this.error = false
    }else {
      this.error = true
    }
  }

  addValue(password: string, Case : string) : string {
    this.CharacterData += Case
    const randomIndex = Math.floor(Math.random() * Case.length);
    password += Case[randomIndex];

    return password
  }

  shuffleString(string  :string) {
    const array = string.split('');
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
  }

  closeText(){
    this.close = true
  }

  upperCaseSelect() {
    this.upperCase = !this.upperCase
  }
  lowerCaseSelect() {
    this.lowerCase = !this.lowerCase
  }
  numberSelect() {
    this.number = !this.number
  }
  specialCharecterSelect() {
    this.specialCharecter = !this.specialCharecter
  }

  onCopy(){
    this.tooltipText = 'Copied'
  }
  outFunc() {
    this.tooltipText = 'Copy to clipboard';
  }
}
