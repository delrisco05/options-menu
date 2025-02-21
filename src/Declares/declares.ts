export interface CounterState {
    value: number
}
export interface StepperProps {
    active: number
}
export interface InputProps {
    label: string;
    id: string;
    type: string;
}

export interface ButtonProps {
    name: string;
    onClick: () => void;
    type?: 'button' | 'submit' | 'reset';
    size?: 'small' | 'medium' | 'large';
    variant?: 'primary' | 'secondary' | 'outline';
    disabled?: boolean;
    className?: string;
}

interface Option {
    label: string;
    value: string | number | boolean;
}

export interface SelectProps {
    options: Option[] | { options: Option[] };
    onChange: (value: string | number | boolean) => void;
    value: string | number | boolean;
    error?: string;
    className?: string;
    placeholder?: string;
    width?: string;
}

export interface HeaderProps {
    title: string;
    user: string;
    onClick: () => void;
}

export interface InfoLabelsProps {
    info: { label: string; value: string }[];
    title?: string;
}

export interface TableProps {
    data: { perfil: string; alcance: string }[];
}

export interface DataTableProps {
    title: string;
    data: Array<{ [key: string]: any }>;
    columns: Array<{ header: string; accessor: string }>;
  }

export interface ModalProps {
    children?: React.ReactNode;
    disabled?: boolean,
    handleClose: () => void;
    showAcceptButton?: boolean;
    handleAccept?: () => void;
    closeButtonText?: string;
    acceptButtonText?: string;
}

export interface ModalWindowProps {
    title: string;
    message: string; // El mensaje puede contener HTML
    variant?: 'success' | 'error' | 'warning';
    textSuccess?: string;
    textCancel?: string;
    handleCancel?: () => void;
    onClick: () => void;
}

interface Column {
    name: string;
    width: number;
    render?: (row: any) => JSX.Element;
}

interface Action {
    label: string;
    type: string;
    url?: string;
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    rowsPerPage: number;
    onRowsPerPageChange: (rows: number) => void;
}

export interface NewTableProps {
    columns: Column[];
    data: any[];
    headerActions?: Action[];
    onAction?: (action: Action) => void;
    rowsPerPageOptions?: number[];
    renderPagination?: (props: PaginationProps) => JSX.Element;
}

export interface ToggleProps {
    checked: boolean;
    onChange: () => void;
    className?: string;
  }

export interface ModalAlertProps {
    title: string;
    message: string;
    variant?: 'success' | 'error' | 'warning' | 'delete';
    textSuccess?: string;
    textCancel?: string;
    handleCancel?: () => void;
    onClick: () => void;
}

export interface ToastProps {
    text: string;
    duration?: number;
    onClose: () => void;
}

export interface ContentWrapperProps {
    children: React.ReactNode;
    title: string;
    actionBack?: () => void;
    width?: string;
    textSize?: string;
    className?: string;
}

export interface TooltipProps {
    message: string;
    children: React.ReactNode;
}