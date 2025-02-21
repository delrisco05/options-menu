declare module 'remoteUtilities/components-mf-utilities' {

  import { ButtonProps, HeaderProps, InfoLabelsProps, InputProps, ImputFormProps, SelectProps, StepperProps, TableProps, DataTableProps, ModalProps, ModalWindowProps, NewTableProps, ToggleProps, ModalAlertProps, ToastProps, ContentWrapperProps, TooltipProps } from './interfaces/Declares';

  export const InputTest: React.ComponentType<InputProps>;
  export const InputForm: React.ComponentType<InputFormProps>;
  export const Button: React.ComponentType<ButtonProps>;
  export const Select: React.ComponentType<SelectProps>;
  export const TableSelect: React.ComponentType<SelectProps>;
  export const Stepper: React.ComponentType<StepperProps>;
  export const Spinner: React.ComponentType<>;
  export const Header: React.ComponentType<HeaderProps>;
  export const InfoLabels: React.ComponentType<InfoLabelsProps>;
  export const SearchSelect: React.ComponentType<SelectProps>;
  export const Table: React.ComponentType<TableProps>;
  export const DataTable: React.ComponentType<DataTableProps>;
  export const Modal: React.ComponentType<ModalProps>;
  export const ModalWindow: React.ComponentType<ModalWindowProps>;
  export const NewTable2: React.ComponentType<NewTableProps>;
  export const Toggle: React.ComponentType<ToggleProps>;
  export const ModalAlert: React.ComponentType<ModalAlertProps>;
  export const Toast: React.ComponentType<ToastProps>;
  export const ContentWrapper: React.ComponentType<ContentWrapperProps>;
  export const Tooltip: React.ComponentType<TooltipProps>;
  
}

declare module 'remoteShell/mf-axiosConfig' {
  import { AxiosInstance } from 'axios';
 
  export const http: AxiosInstance;
  export const httpUserManagment: AxiosInstance;
  export const httpMenu: AxiosInstance;
}
