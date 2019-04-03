export enum ToastType {
  success = 0,
  error = 1
}

export class Toast {
  message: string;
  type: ToastType;
}