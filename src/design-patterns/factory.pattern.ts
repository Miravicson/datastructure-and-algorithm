interface Button {
  render(): string;
}

type OsType = 'windows' | 'web' | 'mac';

export abstract class Dialog {
  abstract createButton(): Button;
}

export class WindowsButton implements Button {
  render(): string {
    const message = `The windows button is rendering`;
    console.log(message);
    return message;
  }
}

export class HtmlButton implements Button {
  render(): string {
    const message = `The html button is rendering`;
    console.log(message);
    return message;
  }
}

export class MacButton implements Button {
  render(): string {
    const message = `The mac button is rendering`;
    console.log(message);
    return message;
  }
}

export class WindowsDialog extends Dialog {
  createButton(): Button {
    return new WindowsButton();
  }
}

export class WebDialog extends Dialog {
  createButton(): Button {
    return new HtmlButton();
  }
}

export class MacDialog extends Dialog {
  createButton(): Button {
    return new MacButton();
  }
}

export class Client {
  dialog!: Dialog;
  constructor(private os: OsType) {
    this.start(this.os);
  }

  start(os: OsType) {
    switch (os) {
      case 'web':
        this.dialog = new WebDialog();
        break;
      case 'windows':
        this.dialog = new WindowsDialog();
        break;
      case 'mac':
        this.dialog = new MacDialog();
        break;
      default:
        throw new Error('unrecognized button');
    }
  }

  render() {
    const button: Button = this.dialog.createButton();
    return button.render();
  }
}

const windowsClient = new Client('windows');
const webClient = new Client('web');
const macClient = new Client('mac');

const clients: Client[] = [windowsClient, webClient, macClient];

clients.forEach((client) => client.render());
