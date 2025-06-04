interface Button {
  render(): string;
  onClick(): void;
}

abstract class AbstractButton implements Button {
  abstract render(): string;

  onClick(): void {
    console.log(`Clicked ${this.constructor.name} button`);
  }
}

type OsType = 'windows' | 'web' | 'mac';

export class WindowsButton extends AbstractButton {
  render(): string {
    const message = `The windows button is rendering`;
    console.log(message);
    return message;
  }

  onClick(): void {
    console.log(`Clicked ${this.constructor.name} button`);
  }
}

export class HtmlButton extends AbstractButton {
  render(): string {
    const message = `The html button is rendering`;
    console.log(message);
    return message;
  }
}

export class MacButton extends AbstractButton {
  render(): string {
    const message = `The mac button is rendering`;
    console.log(message);
    return message;
  }
}

export abstract class Dialog {
  button: Button | undefined;

  render() {
    this.button = this.createButton();
    this.button.render();
  }

  click() {
    if (!this.button) {
      this.render();
    }

    this.button?.onClick();
  }

  abstract createButton(): Button;
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
    return this.dialog.render();
  }

  click() {
    return this.dialog.click();
  }
}

const windowsClient = new Client('windows');
const webClient = new Client('web');
const macClient = new Client('mac');

const clients: Client[] = [windowsClient, webClient, macClient];

clients.forEach((client) => client.render());
clients.forEach((client) => client.click());
